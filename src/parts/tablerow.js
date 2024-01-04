const { CLASSNAMES } = require('../helper/classUtil');
const { tableCellTextArray } = require('../helper/dataUtil');
const { elementDiv } = require('../helper/elementUtil');

const TYPE_KEYS = ['table'];

exports.tablerow = {
    isType: (key) => TYPE_KEYS.includes(key),
    element: (params, cardData, options, iconMap) => {
        const stylize = markupUtil.stylizer(cardData, options, iconMap);
        const row = elementDiv([
            CLASSNAMES.content.root,
            CLASSNAMES.content.tableRow,
        ]);
        const cell = elementDiv(CLASSNAMES.content.tableCell);

        const content = tableCellTextArray(params).map((text) =>
            cell(stylize(text), CLASSNAMES.inline.lineText)
        );

        return row(content, params?.decoration);
    },
};
