const { traitTextArray } = require('../helper/dataUtil');
const { elementDiv, elementSpan } = require('../helper/elementUtil');

const TYPE_KEYS = [
    'pftrait','trait'
];

exports.pftrait = {
    isType: (key) => TYPE_KEYS.includes(key),
    element: (params) => {
        const div = elementDiv();
        const trait = elementSpan('trait');

        const content = traitTextArray(params).map((text) => {
            switch (text) {
                case 'common':
                case 'uncommon':
                case 'rare':
                case 'unique':
                    return trait(text, text);
                default:
                    return trait(text);
            }
        });

        return div(content, 'element pftrait');
    },
};
