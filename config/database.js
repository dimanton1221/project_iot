// ambil sequelize
const sequelize = require("sequelize");

// ambil url dotenv
require("dotenv").config();

// buat koneksi ke database
const db = new sequelize(process.env.DB);

// sync database
db.sync()
    .then(() => {
        console.log("Database synced successfully");
    })
    .catch((error) => {
        console.error("Error syncing database:", error);
    });



// export db
module.exports = db;
