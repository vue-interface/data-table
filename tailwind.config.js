module.exports = {
    content: [
        "./index.html"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@vue-interface/variant/tailwindcss'),
        require('@vue-interface/btn/tailwindcss'),
        ...require('@vue-interface/form-control/tailwindcss'),
        require('@vue-interface/pagination/tailwindcss'),
        require('./tailwindcss'),
    ],
    safelist: [
        ...require('./tailwindcss/safelist')()
    ]
};