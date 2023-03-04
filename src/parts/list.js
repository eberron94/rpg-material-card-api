const { listNameString, listTextString } = require('../helper/dataUtil');
const { elementDiv, elementSpan } = require('../helper/elementUtil');
const { markupUtil } = require('../helper/markupUtil');

const TYPE_KEYS = [
    'list','item','bullet','check'
];

exports.list = {
    isType: (key) => TYPE_KEYS.includes(key),
    element: (params) => {
        const div = elementDiv();
        const span = elementSpan();

        const name = listNameString(params);
        const text = listTextString(params);

        const content = [span(markupUtil.stylize(text), 'line-text')];
        if (name) {
            content.unshift(span(markupUtil.stylize(name), 'line-name'));
        }

        return div(content, 'element list');
    },
};
