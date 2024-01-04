const { CLASSNAMES } = require('../helper/classUtil');
const { traitTextArray } = require('../helper/dataUtil');
const { elementDiv, elementSpan } = require('../helper/elementUtil');

const TYPE_KEYS = ['pftrait', 'trait'];

exports.pftrait = {
    isType: (key) => TYPE_KEYS.includes(key),
    element: (params) => {
        const div = elementDiv([
            CLASSNAMES.content.root,
            CLASSNAMES.content.pfTraitGroup,
        ]);
        const trait = elementSpan(CLASSNAMES.content.pfTraitItem);

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

        return div(content);
    },
};
