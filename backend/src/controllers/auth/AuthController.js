import User from "../../models/User.js";
import Auth from "../../middleware/Auth.js";
import Mail from "../../config/mail.js";
import dotenv from "dotenv";
import ForgotPassword from "../../models/ForgotPassword.js";
import bcrypt from "bcrypt";

dotenv.config();

class AuthController {

    async getLoginUser(req, res) {
        const token = req.headers.authorization;
        if (token) {
            let response = Auth.verifyToken(token);
            if (response) {
                let user = await User.findOne({_id: response.id});
                res.status(200).json({
                    success: true,
                    user: user
                });

            } else {
                res.status(200).json({
                    error: "Token is not valid"
                });
            }
        }
    }


    async getAuthUser(req, res) {
        const token = req.headers.authorization;
        if (token) {
            let response = Auth.verifyToken(token);
            if (response) {
                let user = await User.findOne({_id: response.id});
                res.status(200).json({
                    success: true,
                    user: user
                });

            } else {
                res.status(200).json({
                    error: "Token is not valid"
                });
            }


        } else {
            res.status(200).json({
                error: "No token found"
            });
        }


    }

    async login(req, res) {
        let {username, password} = req.body;
        let user = await User.findOne({username: username});
        if (user) {
            let isMatch = await user.matchPassword(password);
            if (isMatch) {
                let token = await user.getSignedJwtToken();
                res.status(200).json({
                    success: true,
                    token: token,
                });
            } else {
                res.status(200).json({
                    error: "Password is not correct"
                });
            }

        } else {
            return res.status(200).json({error: "User not found"});
        }
    }

    async resetPassword(req, res) {
        let errorType = {
            email: '',
        }
        let {email} = req.body;
        let findData = await User.find({email: email}).countDocuments();
        if (findData > 0) {
            let isToken = await ForgotPassword.find({email: email}).countDocuments();
            console.log(isToken)
            if (isToken > 0) {
                errorType.email = "Email already sent";
                return res.status(200).json({error: errorType});
            }
            let mail = new Mail();
            let serverEmail = process.env.SMTP_EMAIL;
            let token = Math.floor(100000 + Math.random() * 900000);
            let message = `
            <h1>Reset Password</h1>
            <p>Click on the link to reset your password</p>
            <a href="http://localhost:3000/reset-confirm/${token}">Reset Password</a>
            `;
            mail.send(email, serverEmail, "Reset Password", message);
            await ForgotPassword.create({email: email, token: token});
            res.status(200).json({
                success: "Email sent successfully please check your email",
                error: ''
            });

        } else {
            errorType.email = "Email not found";
            res.status(200).json({error: errorType});
        }

    }

    async resetPasswordConfirm(req, res) {
        let {token, password} = req.body;
        let totalToken = await ForgotPassword.find({token: token}).countDocuments();
        let findEmailAndToken = await ForgotPassword.find({token: token});
        if (totalToken > 0) {
            let findUser = await User.findOne({email: findEmailAndToken[0].email});
            if (findUser) {
                findUser.password = password;
                await findUser.save();
                await ForgotPassword.deleteOne({token: token});
                res.status(200).json({success: "Password reset successfully"});
            } else {
                res.status(200).json({error: "User not found"});
            }

        } else {
            res.status(200).json({error: "Token not found"});
        }


    }
}

export default AuthController