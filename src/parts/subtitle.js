const { CLASSNAMES } = require('../helper/classUtil');
const { subtitleTextString } = require('../helper/dataUtil');
const { elementDiv, elementP } = require('../helper/elementUtil');
const { markupUtil } = require('../helper/markupUtil');

const TYPE_KEYS = ['subtitle', 'emphasis'];

exports.subtitle = {
    isType: (key) => TYPE_KEYS.includes(key),
    element: (params, cardData, options, iconMap) => {
        const stylize = markupUtil.stylizer(cardData, options, iconMap);
        const div = elementDiv([
            CLASSNAMES.content.root,
            CLASSNAMES.content.subtitle,
        ]);
        const p = elementP();

        const content = p(
            stylize(subtitleTextString(params)),
            CLASSNAMES.inline.lineText
        );

        return div(content);
    },
};
