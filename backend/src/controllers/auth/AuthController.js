import User from "../../models/User.js";
import Auth from "../../middleware/Auth.js";

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
                res.status(200).json({
                    success: true
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

}

export default AuthController