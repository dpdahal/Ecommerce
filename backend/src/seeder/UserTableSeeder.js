import User from "../models/User.js";

class UserTableSeeder {

    constructor() {
        let usersData = [
            {
                "name": 'admin',
                "username": 'admin',
                "email": 'admin@gamil.com',
                "gender": 'male',
                "password": 'admin002',
                "role": 'admin',
                "status": 'active',
                "language": ['nepali', 'hindi'],
                "country": 'nepal'
            },
            {
                "name": 'sophia',
                "username": 'sophia',
                "email": 'sophia@gamil.com',
                "gender": 'female',
                "password": 'sophia',
                "role": 'user',
                "status": 'active',
                "language": ['nepali', 'hindi', 'chinese'],
                "country": 'china'
            }
        ];

        usersData.map((data) => {
            User.find({role: data.role}).then((docs) => {
                if (docs.length === 0) {
                    let hObj = new User(data);
                    hObj.save().then((res) => {
                        console.log("UserTableSeeder: " + data.role + " created");
                    });
                }
            }).catch((err) => {
                console.log(err);
            });

        });
    }


}

export default UserTableSeeder;