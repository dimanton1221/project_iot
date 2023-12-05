const { DataTypes } = require('sequelize');
const db = require('../Config/db');

const User = db.define('User', {
    userid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 20],
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, Infinity],
        },
    },
    gender: {
        type: DataTypes.ENUM('male', 'female'),
    },
    birthdate: {
        type: DataTypes.DATE,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    needs: {
        type: DataTypes.DECIMAL(10, 2),
    },
}
);

// export modules
module.exports = User;