
var $         = require('jquery');
var Dates     = require('date-es5');
var Numbers   = require('number-es5');
var DataTable = require('lib/data-table.js');

var _datatable     = null;
var _hdr           = null;
var _data          = [];

function _newNum () {
    return Math.floor(Math.random() * 10000) / 100;
}

function _loadData () {
    
    var start = Dates.currentTimeMillis();
    
    _datatable.loadData(_hdr, _data);
    
    var end     = Dates.currentTimeMillis(),
        numRows = _data.length;
    
    $('#numRows').text(numRows);
    
    console.log( 'Loaded ' + numRows + ' rows by '
                + _hdr.length + ' cols in '
                + (end - start) + ' ms.' );
}

function _appendData (numRows) {
    
    var lastDate;
    if (_data.length > 0)
        lastDate = _data[_data.length - 1][0];
    else
        lastDate = _tomorrow();
    
    var newLength = _data.length + numRows,
        dow       = null,
        val       = _data.length - 1,
        numCols   = _hdr.length - 1,
        row       = null;
    
    while (_data.length < newLength) {
        
        lastDate = new Date(lastDate.getTime() - Dates.millisPerDay);
        dow      = lastDate.getUTCDay();
        
        if (dow > 0 && dow < 6) {
            val++;
            var row  = [lastDate];
            for (var i = 0; i < numCols; i++)
                row.push(_newNum());
            _data.push(row);
        }
    }
    
    _loadData();
}


function _dropAllData () {
    _dropData(_data.length);
}

function _dropData (numRows) {
    
    numRows = Math.min(numRows, _data.length);
    
    _data.splice(_data.length - numRows, numRows);
    _loadData();
}

function _addRows() {
    var numRows = parseInt($('#addRows').val(), 10);
    if (   typeof numRows === 'number'
        && numRows > 0 )
        _appendData(numRows);
}

function _dropRows() {
    var numRows = parseInt($('#addRows').val(), 10);
    if (   typeof numRows === 'number'
        && numRows > 0 )
        _dropData(numRows);
}

function _addCol1 () {
    _addCol(1);
}
function _dropCol1 () {
    _dropCol(1);
}

function _addCol (numCol) {
    
    var colIdx  = _hdr.length - 1;
    
    for (var i = 0; i < numCol; i++)
        _hdr.push(_numColInfo("Column " + _hdr.length));
    
    var data = _data;
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        for (var j = 1; j <= numCol; j++)
            row.push(_newNum());
    }
    
    _loadData();
}

function _freezeColumns () {
    var numCols = parseInt($('#freezeColumns').val(), 10);
    if (   typeof numCols === 'number'
        && numCols >= 0 )
        _datatable.freezeColumns(numCols);
}

function _dropCol (numCol) {
    
    numCol = Math.min(numCol, _hdr.length - 2);
    if (numCol <= 0)
        return;
    
    var idx = _hdr.length - numCol;
    
    _hdr.splice(idx, numCol);
    for (var i = 0; i < _data.length; i++)
        _data[i].splice(idx, numCol);
    
    var colIdx = _datatable.sortColumn();
    if (colIdx >= _hdr.length)
        _datatable.sortColumn(0);

    _loadData();
}

function _tomorrow () {
    var dt = new Date();
    return new Date(  dt.getTime()
                    - Dates.millisSinceMidnightUTC(dt)
                    + Dates.millisPerDay );
}


function _setWidth () {
    var w = _datatable.width();
    w = parseInt(window.prompt('Enter new width:', w), 10);
    if (   typeof w === 'number'
        && !isNaN(w) ) {
        _datatable.width(w);
    }
}

function _setHeight () {
    var h = _datatable.height();
    h = parseInt(prompt('Enter new height:', h), 10);
    if (   typeof h === 'number'
        && !isNaN(h) ) {
        _datatable.height(h);
    }
}

function _numColInfo (text) {
    return {
        text:    text,
        value:   text,
        compare: Numbers.compare,
        toText:  Numbers.getFormatter("0.00")
    };
}

function _autoAppend () {
    var numRows = parseInt(document.getElementById('autoAppend').value, 10);
    
    if (   !isNaN(numRows)
        && numRows > 0 )
    _appendData(numRows);
}

function _scrolledToBottom (datatable) {
    if (   datatable.sortColumn()    === 0
        && datatable.sortAscending() === false )
        _autoAppend();
}

function _scrolledToTop (datatable) {
    if (   datatable.sortColumn()    === 0
        && datatable.sortAscending() === true )
        _autoAppend();
}

function _hdrContextMenu (dataTable, position, colIdx) {
    if (colIdx < _hdr.length) {
        $('#headerCell').text(_hdr[colIdx].value);
        return false;
    }
}

function _toggleSumStats() {
    _statEnabled = !_statEnabled;
    sumEnabled.attr('checked', _statEnabled);
    _setStatOptions();
}

function _setStatOptions() {
    var isEnabled = sumEnabled.attr('checked');
    var statOptVal = statOptions.val();
    var statNames = ((!isEnabled || null === statOptVal) ? [] : statOptVal);
    _datatable.sumStats(statNames);
}

var btnAddRow  = $('#btn-add-row').bind('click', _addRows);
var btnDropRow = $('#btn-drop-row').bind('click', _dropRows);
var btnAddCol  = $('#btn-add-col').bind('click', _addCol1);
var btnDropCol = $('#btn-drop-col').bind('click', _dropCol1);
var btnLoadData = $('#btn-load-data').bind('click', _loadData);
var btnDropAll = $('#btn-drop-all').bind('click', _dropAllData);
var btnFreezeCols = $('#freeze-cols').bind('click', _freezeColumns);
var btnSetWidth = $('#btn-set-width').bind('click', _setWidth);
var btnSetHeight = $('#btn-set-height').bind('click', _setHeight);
var statOptions = $('#stat-options').bind('change', _setStatOptions);
var sumEnabled = $('#sum-enabled').bind('click', _toggleSumStats);

var _datatable  = new DataTable($('#tableGoesHere'));
_datatable.sortColumn(0);
_datatable.sortAscending(false);
_datatable.events.bind('scrollBottom',      _scrolledToBottom)
                 .bind('scrollTop',         _scrolledToTop)
                 .bind('headerContextMenu', _hdrContextMenu);

var _hdr = [{
        text:    "Date",
        value:   "Date",
        compare: Dates.compare,
        toText:  Dates.getFormatter('yyyy-MM-dd', true)
    },
    _numColInfo('Open'),
    _numColInfo('High'),
    _numColInfo('Low'),
    _numColInfo('Close')
];

var _statEnabled = false;
_loadData();
