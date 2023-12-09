const { DataTypes } = require('sequelize');
const db = require('../Config/db');

const VolumeAir = db.define('VolumeAir', {
    volume: {
        type: DataTypes.DECIMAL(10, 2),
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}
);

module.exports = VolumeAir;