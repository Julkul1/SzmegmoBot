module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: '20' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@commands': './src/commands',
          '@events': './src/events',
          '@client': './src/client',
          '@config': './src/config',
          '@database': './src/database',
          '@types': './src/types',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};

