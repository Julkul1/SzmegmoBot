import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { Command } from '../types';
import { supabase } from '../database/supabase';

export const info: Command = {
  data: new SlashCommandBuilder().setName('info').setDescription('Get bot information'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    try {
      const { data, error } = await supabase.from('bot_info').select('*').single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      const embed = new EmbedBuilder()
        .setTitle('Bot Information')
        .setDescription('Modern Discord bot with Supabase integration')
        .setColor(0x5865f2)
        .addFields(
          { name: 'Version', value: '1.0.0', inline: true },
          { name: 'Guilds', value: interaction.client.guilds.cache.size.toString(), inline: true },
          { name: 'Users', value: interaction.client.users.cache.size.toString(), inline: true }
        )
        .setTimestamp();

      if (data) {
        embed.setDescription(data.description || embed.data.description);
      }

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      const embed = new EmbedBuilder()
        .setTitle('Bot Information')
        .setDescription('Modern Discord bot with Supabase integration')
        .setColor(0x5865f2)
        .addFields(
          { name: 'Version', value: '1.0.0', inline: true },
          { name: 'Guilds', value: interaction.client.guilds.cache.size.toString(), inline: true },
          { name: 'Users', value: interaction.client.users.cache.size.toString(), inline: true }
        )
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    }
  },
};

export default info;
