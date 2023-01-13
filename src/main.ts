import { REST, Routes } from "discord.js";
import { handle } from "./handlers/slash";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { Client, GatewayIntentBits } from "discord.js";

dotenv.config();
const token = process.env.DISCORD_TOKEN as string;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!"
  },
  {
    name: "test",
    description: "test command",
    options: [
      {
        "name": "test",
        "description": "what to test",
        "type": 3,
        "required": true
      }
    ]
  },
  {
    name: "count",
    description: "count to a number",
    options: [
      {
        "name": "amount",
        "description": "How much to count to",
        "type": 4,
        "required": true
      }
    ]
  },
  {
    name: "bank",
    description: "bank command",
    options: [
      {
        "name": "action",
        "description": "action? help for a list",
        "type": 3,
        "required": false
      },
      {
        "name": "user",
        "description": "who",
        "type": 3,
        "required": false
      },
      {
        "name": "amount",
        "description": "how money",
        "type": 4,
        "required": false
      },
      {
        "name": "to",
        "description": "who send to??",
        "type": 3,
        "required": false
      }
    ]
  }
];

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands("1062964956410155069"), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

client.on("ready", () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  handle(interaction, client);
});

client.login(token);
