module.exports = {
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    rules: {
        'prettier/prettier': 'warn'
        // Reglas específicas para las pruebas
        //'jest/valid-describe': 'off', // Permite usar describe en las pruebas
        //'jest/valid-expect': 'off', // Permite usar expect en las pruebas
        //'jest/no-identical-title': 'error' // Advierte sobre títulos duplicados de las pruebas
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    env: {
        node: true,
        es6: true,
        jest: true
    },
    ignorePatterns: ['__tests__/*.js']
}
