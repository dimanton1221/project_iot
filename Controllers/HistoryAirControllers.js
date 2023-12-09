const { Op, Sequelize } = require("sequelize");
const HistoryAir = require("../Models/HistoryAirModels");
const { createAir } = require("../Controllers/VolumeAir");
// mqtt
const mqttClient = require("../Config/mqtt");

// buat history air
const createHistoryAir = async (volume) => {
    try {
        const data = await HistoryAir.create({
            volume: volume,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

// tekan btn record air volume
const recordAir = async (volume) => {
    try {
        const lastRecord = await HistoryAir.findOne({
            order: [['id', 'DESC']],
            limit: 1
        });
        const volumeLast = lastRecord?.volume || 0;

        if (volumeLast < volume) {
            await createHistoryAir(volume);
            console.log("Berjalan");
            return;
        }

        await createAir(volumeLast - volume);
        await createHistoryAir(volume);
    } catch (error) {
        console.log(error);
    }
}

// buat test recordAir
const testRecordAir = async (req, res) => {
    try {
        const volume = Math.random() * 100; // Generate a random number between 0 and 100
        const hasil = await recordAir(volume);
        res.status(200).json(volume);
        console.log(volume);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


mqttClient.on("message", async (topic, message) => {
    const volume = parseFloat(message.toString());
    await recordAir(volume);
    console.log("Data Masuk cuy " + volume.toString());
});

module.exports = {
    testRecordAir
}