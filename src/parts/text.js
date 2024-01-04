const { CLASSNAMES } = require('../helper/classUtil');
const { textTextString } = require('../helper/dataUtil');
const { elementDiv, elementP } = require('../helper/elementUtil');
const { markupUtil } = require('../helper/markupUtil');

const TYPE_KEYS = ['t', 'text'];

exports.textLine = {
    isType: (key) => TYPE_KEYS.includes(key),
    element: (params, cardData, options, iconMap) => {
        const stylize = markupUtil.stylizer(cardData, options, iconMap);
        const div = elementDiv([
            CLASSNAMES.content.root,
            CLASSNAMES.content.text,
        ]);
        const p = elementP();

        const content = p(
            stylize(textTextString(params)),
            CLASSNAMES.inline.lineText
        );

        return div(content, params?.decoration);
    },
};
