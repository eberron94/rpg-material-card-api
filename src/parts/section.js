const { CLASSNAMES } = require('../helper/classUtil');
const { sectionTextArray } = require('../helper/dataUtil');
const { elementDiv, elementSpan } = require('../helper/elementUtil');
const { markupUtil } = require('../helper/markupUtil');

const TYPE_KEYS = ['section'];

exports.section = {
    isType: (key) => TYPE_KEYS.includes(key.toLowerCase()),
    element: (params, cardData, options, iconMap) => {
        const stylize = markupUtil.stylizer(cardData, options, iconMap);
        const div = elementDiv([
            CLASSNAMES.content.root,
            CLASSNAMES.content.section,
        ]);
        const span = elementSpan();

        const content = sectionTextArray(params).map((text) =>
            span(stylize(text), CLASSNAMES.inline.lineText)
        );

        return div(content);
    },
};
