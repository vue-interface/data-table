module.exports = () => ([
    'caption-top',
    'loading',
    'mr-2',
    'mr-3',
    'table',
    'table-sm',
    'table-lg',
    'table-bordered',
    'table-borderless',
    'table-active',
    'table-hover',
    'table-responsive',
    ...require('@vue-interface/form-control/tailwindcss/safelist')(),
    ...require('@vue-interface/pagination/tailwindcss/safelist')()
]);