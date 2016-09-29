require.config({
    baseUrl: './../../../js/lib/',
    paths: {
        'jquery': 'jquery.min',
        'bs3': 'bootstrap/bootstrap.min',
        // 表格插件
        'bs3table': 'bootstrap-table/bootstrap-table.min',
        // 日期插件
        'bs3date': 'bootstrap-datetimepicker/bootstrap-datetimepicker.min',
        'bs3datecn': 'bootstrap-datetimepicker/locales/bootstrap-datetimepicker.zh-CN',
        // 选择框插件
        'bs3sel': 'bootstrap-select/bootstrap-select.min',
        'bs3selcn': 'bootstrap-select/i18n/defaults-zh_CN.min',
    },
    shim: {
        'bs3': ['jquery'],
        // 表格插件
        'bs3table': ['bs3'],
        // 日期插件
        'bs3date': ['jquery'],
        'bs3datecn': ['bs3date'],
        // 选择框插件
        'bs3sel': ['jquery'],
        'bs3selcn': ['bs3sel'],
    }
});
require(['jquery', 'bs3', 'bs3table', 'bs3date', 'bs3datecn', 'bs3sel', 'bs3selcn'], function($) {
    'use strict';

    // test
    console.log($)

    // 表格
    $('#mytable').bootstrapTable({
        columns: [{
            field: 'id',
            title: 'Item ID'
        }, {
            field: 'name',
            title: 'Item Name'
        }, {
            field: 'price',
            title: 'Item Price'
        }],
        data: [{
            id: 1,
            name: 'Item 1',
            price: '$1'
        }, {
            id: 2,
            name: 'Item 2',
            price: '$2'
        }]
    })

    // 日期插件
    $("#mydate").datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: true,
        minView: 2,
        todayHighlight: true,
    });
    // 选择框插件
    $('#mysel').selectpicker()

})
