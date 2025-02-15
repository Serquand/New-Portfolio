import antfu from '@antfu/eslint-config';

// https://github.com/antfu/eslint-config
export default antfu({
    // Enable stylistic formatting rules
    // stylistic: true,

    // Or customize the stylistic rules
    stylistic: {
        indent: 4, // 4, or 'tab'
        quotes: 'single', // or 'double'
        semi: true,
    },

    // TypeScript and Vue are auto-detected, you can also explicitly enable them:
    typescript: true,
    vue: true,

    // // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
    // ignores: [
    //   './fixtures',
    //   // ...globs
    // ]
    overrides: {
        // Config from antfu https://github.com/antfu/eslint-config/tree/main#rules-overrides
        // https://github.com/antfu/eslint-config/blob/main/src/configs/vue.ts
        // Vue recommended rules : https://eslint.vuejs.org/rules/multi-word-component-names.html
        vue: {
            'vue/max-attributes-per-line': ['error', {
                singleline: {
                    max: 1,
                },
                multiline: {
                    max: 1,
                },
            }],
            'vue/no-dupe-keys': ['error', {
                groups: [],
            }],
            'vue/require-default-prop': 'error',
            'vue/require-prop-types': 'error',
            'vue/custom-event-name-casing': ['error', 'kebab-case', {
                ignores: [],
            }],
        },
    },

}, {
    // Without `files`, they are general rules for all files
    rules: {
        'curly': ['error', 'all'],
        'style/member-delimiter-style': ['error', {
            multiline: {
                delimiter: 'comma',
                requireLast: true,
            },
            singleline: {
                delimiter: 'comma',
                requireLast: false,
            },
            multilineDetection: 'brackets',
        }],
        'node/prefer-global/process': ['off'],
        'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],

    },
});
