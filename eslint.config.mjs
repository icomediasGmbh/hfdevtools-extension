import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import eslintPluginRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

const rules = [
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            '@stylistic': stylistic,
        },
        extends: [...tseslint.configs.recommended, ...tseslint.configs.stylistic],
        rules: {
            '@typescript-eslint/no-this-alias': 'off',
            '@typescript-eslint/dot-notation': 'off',

            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                },
            ],

            '@typescript-eslint/ban-types': 'off',

            '@typescript-eslint/explicit-member-accessibility': [
                'error',
                {
                    accessibility: 'explicit',

                    overrides: {
                        constructors: 'no-public',
                    },
                },
            ],

            '@typescript-eslint/no-redeclare': ['error'],

            '@stylistic/ts/member-delimiter-style': [
                'error',
                {
                    multiline: {
                        delimiter: 'semi',
                        requireLast: true,
                    },

                    singleline: {
                        delimiter: 'semi',
                        requireLast: false,
                    },
                },
            ],

            '@typescript-eslint/member-ordering': [
                'warn',
                {
                    default: [
                        'private-instance-field',
                        'private-static-field',
                        'protected-instance-field',
                        'protected-static-field',
                        'public-instance-field',
                        'public-static-field',
                        'constructor',
                        'private-instance-method',
                        'private-static-method',
                        'protected-instance-method',
                        'protected-static-method',
                        'public-instance-method',
                        'public-static-method',
                    ],
                },
            ],

            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'enumMember',
                    format: null,
                },
                {
                    selector: 'typeProperty',
                    format: null,
                },
            ],

            '@typescript-eslint/no-empty-function': 'error',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-inferrable-types': 'off',
            '@typescript-eslint/no-require-imports': 'off',

            '@typescript-eslint/no-shadow': [
                'error',
                {
                    hoist: 'never',
                    ignoreTypeValueShadow: true,
                },
            ],

            '@typescript-eslint/no-unused-expressions': 'error',
            '@typescript-eslint/no-var-requires': 'error',
            '@typescript-eslint/prefer-namespace-keyword': 'error',
            '@typescript-eslint/consistent-type-imports': 'warn',
            '@typescript-eslint/class-literal-property-style': 'off',

            '@/quotes': [
                'error',
                'single',
                {
                    avoidEscape: true,
                    allowTemplateLiterals: true,
                },
            ],

            '@typescript-eslint/triple-slash-reference': [
                'error',
                {
                    path: 'always',
                    types: 'always',
                },
            ],

            '@typescript-eslint/no-namespace': 'off',
            '@typescript-eslint/prefer-for-of': 'off',
            '@typescript-eslint/consistent-indexed-object-style': 'off',

            '@/semi': ['error', 'always'],
            '@stylistic/ts/type-annotation-spacing': 'error',

            'brace-style': [
                'error',
                '1tbs',
                {
                    allowSingleLine: true,
                },
            ],

            'comma-dangle': ['error', 'always-multiline'],
            'linebreak-style': ['off', 'unix'],
            'no-unused-vars': 'off',
            curly: 'off',
            'default-case': 'off',
            'eol-last': 'error',
            eqeqeq: ['error', 'always'],
            'guard-for-in': 'off',
            'id-blacklist': ['error', 'any', 'string', 'Undefined', 'undefined'],
            'id-match': 'error',

            'max-len': [
                'off',
                {
                    code: 180,
                },
            ],

            'no-bitwise': 'off',
            'no-caller': 'error',
            'no-cond-assign': 'error',
            'no-console': 'off',
            'no-debugger': 'warn',
            'no-empty': 'error',
            'no-eval': 'error',
            'no-fallthrough': 'error',
            'no-multiple-empty-lines': 'error',
            'no-new-wrappers': 'off',
            'no-trailing-spaces': 'off',
            'no-underscore-dangle': 'off',
            'no-unused-labels': 'error',
            'no-var': 'error',
            radix: 'off',
            'spaced-comment': 'off',
            'prefer-const': 'warn',
            'prefer-rest-params': 'off',
            'no-case-declarations': 'off',
        },
    },
    {
        files: [
            'FormDev/formTranslator/**/*.ts',
            'FormDev/templateBoilerplate/**/*.ts',
            'FormDev/templateExporter/**/*.ts',
            'FormDev/templateUpload/**/*.ts',
            'Tests/mocha/**/*.ts',
            'Node/**/*.ts',
        ],
        rules: {
            'no-console': 'off',
        },
    },
    {
        files: ['**/*.js'],
        rules: {
            'no-undef': 'error',
            'no-redeclare': 'error',
            'no-console': 'off',
            'brace-style': [
                'error',
                '1tbs',
                {
                    allowSingleLine: true,
                },
            ],

            'comma-dangle': ['error', 'always-multiline'],
            'linebreak-style': ['off', 'unix'],
            'no-unused-vars': 'off',
            curly: 'off',
            'default-case': 'off',
            'eol-last': 'error',
            eqeqeq: ['error', 'always'],
            'guard-for-in': 'off',
            'id-blacklist': ['error', 'any', 'string', 'Undefined', 'undefined'],
            'id-match': 'error',

            'max-len': [
                'off',
                {
                    code: 180,
                },
            ],

            'no-bitwise': 'off',
            'no-caller': 'error',
            'no-cond-assign': 'error',
            'no-debugger': 'warn',
            'no-empty': 'error',
            'no-eval': 'error',
            'no-fallthrough': 'error',
            'no-multiple-empty-lines': 'error',
            'no-new-wrappers': 'off',
            'no-trailing-spaces': 'off',
            'no-underscore-dangle': 'off',
            'no-unused-labels': 'error',
            'no-var': 'error',
            radix: 'off',
            'spaced-comment': 'off',
            'prefer-const': 'warn',
            'prefer-rest-params': 'off',
            'no-case-declarations': 'off',
        },
    },
    {
        // Override configuration for your test subfolder
        files: ['Tests/mocha/**/*.ts'],
        rules: {
            '@typescript-eslint/no-unused-expressions': 'off',
        },
    },
];

const config = tseslint.config(
    {
        languageOptions: {
            parserOptions: {
                warnOnUnsupportedTypeScriptVersion: false,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es6,
                ...globals.commonjs,
            },
        },
    },
    {
        ignores: [
            '**/.*',
            'Cordova/platforms/*',
            'Cordova/plugins/*',
            'Cordova/www/*',
            'Core/source/libs/**/*',
            'Core/source/typings/pdfjs/*',
            'Core/wwwroot/*',
            'Documentation/build/*',
            'Documentation/static/*',
            'Electron/dist/*',
            'Electron/wwwroot/*',
            'FormDev/wwwroot/build/*',
            'FormDev/**/bin/*',
            'Node/bin/*',
            'Reachout/wwwroot/*',
        ],
    },
    eslint.configs.recommended,
    ...rules,
    eslintPluginRecommended,
);

export default config;
