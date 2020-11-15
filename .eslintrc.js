module.exports = {
  extends: 'universe/native',
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Use our .prettierrc file as source
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'react/self-closing-comp': 'off',
  },
};
