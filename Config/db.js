const Sequelize = require('sequelize');
require('dotenv').config();
const DB_URL = process.env.DB_URL;
const db = new Sequelize(DB_URL, {
    dialect: 'mysql',
    timezone: '+07:00',
    logging: false,
    // remove timestamps
    define: {
        timestamps: false,
    },
});

try {
    db.authenticate()
        .then(() => {
            // console.log('Database connection has been established successfully. 🚀');
        })
        .catch((error) => {
            console.error('Unable to connect to the database:', error);
        });
} catch (error) {
    console.error('Error occurred while authenticating with the database:', error);
}

db.sync()
    .then(() => {
        console.log("Database synced successfully 🤓");
    })
    .catch((error) => {
        console.error("Error syncing database:", error);
    });

module.exports = db;
