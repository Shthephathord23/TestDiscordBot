require("dotenv").config();

const { Client, Collection, IntentsBitField, GatewayIntentBits } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const client = new Client( {intents: GatewayIntentBits.Guilds} );

client.commands = new Collection();
client.commandsArray = [];

client.login(process.env.BOT_TOKEN);

client.once("ready", () => {
    console.log("Ready! Logged in");
})

const functionsFolderPath = "./src/functions";
const functionsFolder = fs.readdirSync(functionsFolderPath);
for (const folder of functionsFolder)
{
    const functionsPath = path.join(functionsFolderPath, folder);
    const functionsFiles = fs.readdirSync(functionsPath).filter(file => file.endsWith(".js"));
    for (const file of functionsFiles)
    {
        const filePath = path.join(functionsPath, file);
        //const command = require(filePath);
        require(filePath)(client);
    }
}
