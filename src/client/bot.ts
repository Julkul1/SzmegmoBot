import { Client, GatewayIntentBits, Collection, REST, Routes } from 'discord.js';
import { Command } from '../types';
import { logger } from '../utils/logger';
import { config } from '../config/config';
import fs from 'fs';
import path from 'path';

export class Bot {
  public client: Client;
  public commands: Collection<string, Command>;

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.client.commands = new Collection();
    this.commands = this.client.commands;
  }

  public async loadCommands(): Promise<void> {
    const commandsPath = path.join(__dirname, '../commands');
    const isProduction = __dirname.includes('dist');
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter(file => (isProduction ? file.endsWith('.js') : file.endsWith('.ts')));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = isProduction ? require(filePath) : await import(filePath);

      if ('data' in command.default && 'execute' in command.default) {
        this.client.commands.set(command.default.data.name, command.default);
        logger.debug(`Loaded command: ${command.default.data.name}`);
      } else {
        logger.warn(`Command at ${filePath} is missing required "data" or "execute" property`);
      }
    }
  }

  public async loadEvents(): Promise<void> {
    const eventsPath = path.join(__dirname, '../events');
    const isProduction = __dirname.includes('dist');
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter(file => (isProduction ? file.endsWith('.js') : file.endsWith('.ts')));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = isProduction ? require(filePath) : await import(filePath);

      if (event.default.once) {
        this.client.once(event.default.name, (...args) => event.default.execute(...args));
      } else {
        this.client.on(event.default.name, (...args) => event.default.execute(...args));
      }

      logger.debug(`Loaded event: ${event.default.name}`);
    }
  }

  public async registerCommands(): Promise<void> {
    const commands = [];

    for (const command of this.client.commands.values()) {
      commands.push(command.data.toJSON());
    }

    const rest = new REST().setToken(config.discord.token);

    try {
      logger.info(`Started refreshing ${commands.length} application (/) commands.`);

      const data = (await rest.put(Routes.applicationCommands(config.discord.clientId), {
        body: commands,
      })) as Array<{ id: string; name: string }>;

      logger.info(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
      logger.error('Error registering commands:', error);
    }
  }

  public async start(): Promise<void> {
    try {
      await this.loadCommands();
      await this.loadEvents();
      await this.registerCommands();

      await this.client.login(config.discord.token);
    } catch (error) {
      logger.error('Failed to start bot:', error);
      process.exit(1);
    }
  }
}
