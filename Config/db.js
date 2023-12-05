const Sequelize = require('sequelize');
require('dotenv').config();
const DB_URL = process.env.DB_URL;
const db = new Sequelize(DB_URL, {
    dialect: 'mysql',
    // logging: false,
    // remove timestamps
    define: {
        timestamps: false,
    },
});

db.sync()
    .then(() => {
        console.log("Database synced successfully");
    })
    .catch((error) => {
        console.error("Error syncing database:", error);
    });

module.exports = db;
