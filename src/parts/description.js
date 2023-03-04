const { propertyNameTextArray } = require('../helper/dataUtil');
const { elementDiv, elementSpan } = require('../helper/elementUtil');
const { markupUtil } = require('../helper/markupUtil');

const TYPE_KEYS = ['description', 'desc', 'd'];

exports.description = {
    isType: (key) => TYPE_KEYS.includes(key),
    element: (params) => {
        const div = elementDiv();
        const span = elementSpan();

        const content = propertyNameTextArray(params).map(
            ({ name, text }) =>
                span(markupUtil.stylize(name), 'line-name') +
                span(markupUtil.stylize(text), 'line-text')
        );

        return div(content, 'element description');
    },
};
