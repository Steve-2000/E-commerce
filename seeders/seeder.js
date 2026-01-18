const dotenv = require('dotenv');
const product = require('../model/prodcutmodel');
const User = require('../model/usermodel');
const products = require('../Data/data.json');
const database = require('../config/database');


dotenv.config({ path: './config/config.env' });


database();

const seeder = async () => {
    try {
        await product.deleteMany();
        console.log("Data deleted successfully");

        const user = await User.findOne();
        if (!user) {
            console.log("Please create a user first to seed products.");
            process.exit();
        }

        const productsWithUser = products.map(p => ({ ...p, user: user._id }));

        await product.insertMany(productsWithUser)
        console.log("Data inserted successfully");

    } catch (err) {
        console.log(err.message);
    }
    process.exit();

}
seeder();
