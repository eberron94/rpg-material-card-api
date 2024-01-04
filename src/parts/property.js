const { CLASSNAMES } = require('../helper/classUtil');
const { propertyNameTextArray } = require('../helper/dataUtil');
const { elementDiv, elementSpan } = require('../helper/elementUtil');
const { markupUtil } = require('../helper/markupUtil');

const TYPE_KEYS = ['property', 'prop'];

exports.property = {
    isType: (key) => TYPE_KEYS.includes(key.toLowerCase()),
    element: (params, cardData, options, iconMap) => {
        const stylize = markupUtil.stylizer(cardData, options, iconMap);
        const div = elementDiv([
            CLASSNAMES.content.root,
            CLASSNAMES.content.property,
        ]);
        const span = elementSpan();

        const content = propertyNameTextArray(params).map(
            ({ name, text }) =>
                span(stylize(name), CLASSNAMES.inline.lineName) +
                span(stylize(text), CLASSNAMES.inline.lineText)
        );

        return div(content);
    },
};
