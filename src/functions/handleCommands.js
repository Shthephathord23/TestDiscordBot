module.exports = (client) =>
{
    client.handleCommands = async () =>
    {
        const commandsFolderPath = path.join("./src/commands");
        const commandFolders = fs.readdirSync(foldersPath);

        for (const folder of commandFolders) 
        {
	        const commandsPath = path.join(foldersPath, folder);
	        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	        for (const file of commandFiles) 
            {
		        const filePath = path.join(commandsPath, file);
		        const command = require(filePath);
		        if ('data' in command && 'execute' in command) 
                {
			        client.commands.set(command.data.name, command);
                    client.commandsArray.push(command.data.toJSON());
                    console.log("Command: " + command.data.name + " has been passed through the handler");
		        } 
                else 
                {
			        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		        }
	        }
        }

    };
}