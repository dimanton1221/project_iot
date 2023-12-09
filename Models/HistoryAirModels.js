const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const HistoryAir = sequelize.define('HistoryAir', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    volume: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = HistoryAir;
