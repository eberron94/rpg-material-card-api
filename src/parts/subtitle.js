const { subtitleTextString } = require('../helper/dataUtil');
const { elementDiv, elementP } = require('../helper/elementUtil');

const TYPE_KEYS = ['subtitle','emphasis'];

exports.subtitle = {
    isType: (key) => TYPE_KEYS.includes(key),
    element: (params) => {
        const div = elementDiv();
        const p = elementP();

        const content = p(subtitleTextString(params));

        return div(content, 'element subtitle');
    },
};
