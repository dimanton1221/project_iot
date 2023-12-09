const { Op, Sequelize } = require("sequelize");
const Air = require("../Models/VolumeAir");


const test = async (req, res) => {
    try {
        const data = await Air.findAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}

// create test data
const testCreate = async (req, res) => {
    try {
        const volume = Math.random() * 100; // Generate a random number between 0 and 100
        const data = await Air.create({
            volume: volume,
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}


const createAir = async (volume) => {
    try {
        // const volume = Math.random() * 100; // Generate a random number between 0 and 100
        const data = await Air.create({
            volume: volume,
        });
        // res.status(200).json(data);
    } catch (error) {
        throw error;
        // res.status(500).json(error);
    }
}

// buat function ambil semua data yang jaraknya 1 hari
const getAirToday = async (req, res) => {
    try {
        const data = await Air.findAll({
            where: {
                date: {
                    [Op.gte]: new Date(new Date() - 24 * 60 * 60 * 1000)
                }
            }
        });
        // change date format to GMT+7
        data.forEach(entry => {
            entry.date = new Date(entry.date.getTime() + 7 * 60 * 60 * 1000);
        });
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// ambil sum dari volume air hari ini
const getSumAirToday = async (req, res) => {
    try {
        const data = await Air.sum('volume', {
            where: {
                date: {
                    [Op.gte]: new Date(new Date() - 24 * 60 * 60 * 1000)
                }
            }
        });
        // jika null maka return 0
        if (!data) {
            return res.status(200).json(0);
        }
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// berikan aku sum dari tiap hari dalam 1 minggu
const getSumAirWeek = async (req, res) => {
    try {
        const today = new Date();
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        const data = await Air.findAll({
            attributes: [
                [Sequelize.literal('DATE(date)'), 'date'],
                [Sequelize.literal('SUM(volume)'), 'sum']
            ],
            where: {
                date: {
                    [Op.gte]: lastWeek,
                    [Op.lt]: today
                }
            },
            group: [Sequelize.literal('DATE(date)')]
        });

        const sums = data.map(entry => entry.dataValues.sum || 0);
        const dates = data.map(entry => entry.dataValues.date);

        res.status(200).json({ dates, sums });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// create function 


module.exports = {
    test,
    testCreate,
    getAirToday,
    getSumAirToday,
    getSumAirWeek,
    createAir
}