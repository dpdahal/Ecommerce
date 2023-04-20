import User from '../models/User.js';
import Auth from "../middleware/Auth.js";

class UserController {

    async index(req, res) {

        const token = req.headers.authorization;
        if (token) {
            let response = Auth.verifyToken(token);
            if (response) {
                const users = await User.find();
                return res.json(users);
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

    async store(req, res) {
        try {
            let imageName = '';
            if (req.file) {
                imageName = req.file.filename;
            }
            let username = req.body.username;
            let email = req.body.email;
            let errorType = {
                username: '',
                email: '',
            }
            let totalUserName = await User.find({username: username}).countDocuments();
            if (totalUserName > 0) {
                errorType.username = 'Username already exists';
            }
            let totalUserEmail = await User.find({email: email}).countDocuments();
            if (totalUserEmail > 0) {
                errorType.email = 'Email already exists';
            }
            if (errorType.username || errorType.email) {
                return res.status(200).json({error: errorType});
            }
            const user = await User.create({...req.body, image: imageName});
            return res.status(200).json({success: 'User created successfully'});
        } catch (e) {
            return res.status(400).json({error: e.message});
        }
    }

}

export default UserController;
