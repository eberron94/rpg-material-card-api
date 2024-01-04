const { CLASSNAMES } = require('../helper/classUtil');
const { listNameString, listTextString } = require('../helper/dataUtil');
const { elementDiv, elementSpan } = require('../helper/elementUtil');
const { markupUtil } = require('../helper/markupUtil');

const TYPE_KEYS = ['list', 'item', 'bullet', 'check'];

exports.list = {
    isType: (key) => TYPE_KEYS.includes(key.toLowerCase()),
    element: (params, cardData, options, iconMap) => {
        const stylize = markupUtil.stylizer(cardData, options, iconMap);
        const div = elementDiv([
            CLASSNAMES.content.root,
            CLASSNAMES.content.list,
        ]);
        const span = elementSpan();

        const name = listNameString(params);
        const text = listTextString(params);

        const content = [
            span(stylize(text), CLASSNAMES.inline.lineText),
        ];

        if (name) {
            content.unshift(
                span(stylize(name), CLASSNAMES.inline.lineName)
            );
        }


        return div(content);
    },
};
