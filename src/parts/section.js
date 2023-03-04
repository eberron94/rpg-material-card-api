const { sectionTextArray } = require('../helper/dataUtil');
const { elementDiv, elementSpan } = require('../helper/elementUtil');
const { markupUtil } = require('../helper/markupUtil');

const TYPE_KEYS = ['section'];

exports.section = {
    isType: (key) => TYPE_KEYS.includes(key),
    element: (params) => {
        const div = elementDiv();
        const span = elementSpan();

        const content = sectionTextArray(params).map((text) =>
            span(markupUtil.stylize(text), 'line-text')
        );

        return div(content, 'element section');
    },
};
