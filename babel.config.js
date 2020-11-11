module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      'react-native-classname-to-style',
      [
        'react-native-platform-specific-extensions',
        { extensions: ['scss', 'sass'] },
      ],
    ],
  };
};
