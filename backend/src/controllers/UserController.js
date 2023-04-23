import User from '../models/User.js';
import Auth from "../middleware/Auth.js";
import fs from "fs";

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

    async show(req, res) {
        let id = req.params.id;
        let data = await User.findById(id);
        return res.status(200).json(data);
    }

    async update(req, res) {
        let id = req.params.id;
        let findData = await User.findById(id);

        let imageName = '';
        if (req.file) {
            let filePath = process.cwd() + "\\public\\uploads\\users\\" + findData.image;
            if (fs.existsSync(filePath) && findData.image) {
                fs.unlinkSync(filePath);
            }
            imageName = req.file.filename;
        }
        let name = req.body.name;
        let username = req.body.username;
        let email = req.body.email;
        let gender = req.body.gender;
        let language = req.body.language.split(',');
        let country = req.body.country;
        if (findData) {
            findData.name = name;
            findData.username = username;
            findData.email = email;
            findData.gender = gender;
            findData.language = language;
            findData.country = country;
            if (imageName) {
                findData.image = imageName;
            }
            await findData.save();
            return res.status(200).json({success: 'User updated successfully'});
        } else {
            return res.status(200).json({error: 'User not found'});
        }
    }

}

export default UserController;
