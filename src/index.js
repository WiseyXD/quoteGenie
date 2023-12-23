const express = require("express");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const axios = require("axios");
const app = express();
const PORT = 4000;
const userRoutes = require("./routes/user");

// bcrypt , star the quotes(Purchase Logic lagao)
const apiUrl = "http://localhost:4000/user/mail";

app.use(bodyParser.json());

app.use("/user", userRoutes);

cron.schedule("*/10 * * * * *", async () => {
    try {
        console.log("Cron job started...");
        const response = await axios.get(apiUrl);
        console.log("Response from /mail endpoint:", response.data);
    } catch (error) {
        console.error("Error in cron job:", error.message);
    }
});

console.log("Cron job scheduler started...");

app.listen(PORT, () => {
    console.log("Server is Listening at " + PORT);
});
