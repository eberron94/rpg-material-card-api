const { textTextString } = require('../helper/dataUtil');
const { elementDiv, elementP } = require('../helper/elementUtil');

const TYPE_KEYS = ['t','text'];

exports.textLine = {
    isType: (key) => TYPE_KEYS.includes(key),
    element: (params, decoration) => {
        const div = elementDiv(decoration);
        const p = elementP();

        const content = p(textTextString(params), 'line-text');

        return div(content, 'element text');
    },
};
