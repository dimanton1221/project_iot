const { DataTypes } = require('sequelize');
const db = require('../Config/db');

const VolumeAir = db.define('VolumeAir', {
    User: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: "1",
    },
    volume: {
        type: DataTypes.DECIMAL(10, 2),
    },
    date: {
        type: DataTypes.DATE,
    },
}
);