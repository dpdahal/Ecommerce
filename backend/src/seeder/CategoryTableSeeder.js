import Category from '../models/Category.js';

class CategoryTableSeeder {

    constructor() {
        let categoryData = [
            {
                "name": 'laptop',
                "slug": 'laptop'
            },
            {
                "name": 'mobile',
                "slug": 'mobile'
            }
        ];

        categoryData.map((data) => {
            Category.find({name: data.name}).then((docs) => {
                if (docs.length === 0) {
                    let hObj = new Category(data);
                    hObj.save().then((res) => {
                        console.log("category: " + data.name + " created");
                    });
                }
            }).catch((err) => {
                console.log(err);
            });

        });
    }


}

export default CategoryTableSeeder;