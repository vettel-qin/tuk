module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier', // 确保这个是最后一个扩展
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  plugins: ['unicode'],
  rules: {
    // 允许中文字符的自定义规则
    'unicode/bom': 'off', // 如果需要BOM头，则开启
    'no-restricted-syntax': ['off', 'TemplateLiteral'], // 允许模板字符串中使用中文
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'max-len': [
      'warn',
      {
        code: 150,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ], // 更长的行长度，适应中文
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ], // 忽略以 _ 开头的未使用变量
  },
}
