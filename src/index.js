require("dotenv").config();

const { Client, Collection, IntentsBitField, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client( {intents: GatewayIntentBits.Guilds} );

client.login(process.env.BOT_TOKEN);

client.once("ready", () => {
    console.log("Ready! Logged in");
})