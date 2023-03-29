import User from '../models/User.js';

class UserController {

    async index(req, res) {
        const users = await User.find();
        return res.json(users);
    }

    async store(req, res) {
        const user = await User.create(req.body);
        return res.json(user);
    }

}

export default UserController;