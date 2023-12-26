const { textTextString } = require('../helper/dataUtil');
const { elementDiv, elementP } = require('../helper/elementUtil');
const { markupUtil } = require('../helper/markupUtil');

const TYPE_KEYS = ['t','text'];

exports.textLine = {
    isType: (key) => TYPE_KEYS.includes(key),
    element: (params, cardData) => {
        const div = elementDiv(params?.decoration);
        const p = elementP();

        console.log(cardData)

        const content = p(markupUtil.stylize(textTextString(params), cardData), 'line-text');

        return div(content, 'element text');
    },
};
