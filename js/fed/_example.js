require.config({
    baseUrl: './../../../js/lib/',
    paths: {
        'jquery': 'jquery.min',
        'bs3': 'bootstrap.min',
        'bs3table': 'bootstrap-table.min',
    },
    shim: {
        'bs3': ['jquery'],
        'bs3table': ['bs3'],
    }
});
require(['jquery', 'bs3', 'bs3table'], function ($) {
    console.log($)

})
