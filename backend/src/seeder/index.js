import UserTableSeeder from './UserTableSeeder.js';
import CategoryTableSeeder  from "./CategoryTableSeeder.js";

class Seeder {

    run() {
        new UserTableSeeder();
        new CategoryTableSeeder();
    }
}

export default Seeder;