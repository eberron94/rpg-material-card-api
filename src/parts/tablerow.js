const { tableCellTextArray } = require('../helper/dataUtil');
const { elementDiv } = require('../helper/elementUtil');

const TYPE_KEYS = ['table'];

exports.tablerow = {
    isType: (key) => TYPE_KEYS.includes(key),
    element: (params, decoration) => {
        const row = elementDiv();
        const cell = elementDiv('cell');

        const content = tableCellTextArray(params).map((text) =>
            cell(text, 'line-text')
        );

        return row(content, ['element', decoration]);
    },
};
