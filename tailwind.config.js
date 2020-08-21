const plugin = require('tailwindcss/plugin');

module.exports = {
    purge: false,
    corePlugins: {
        container: false,
    },
    plugins: [
        require('@vue-interface/variant/tailwindcss'),
        require('@vue-interface/btn/tailwindcss'),
        require('@vue-interface/pagination/tailwindcss'),
        require('./tailwindcss')
    ]
};