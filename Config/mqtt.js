const mqtt = require("mqtt");
require("dotenv").config();
const client = mqtt.connect(process.env.MQTT_URL);

client.on("connect", () => {
    client.subscribe("banyu/elektronik");
    console.log("MQTT connected 🚀");
});

module.exports = client;