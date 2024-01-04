const { CLASSNAMES } = require('../helper/classUtil');
const { elementDiv } = require('../helper/elementUtil');

const TYPE_KEYS = ['ruler', 'divide', 'rule'];

exports.ruler = {
    isType: (key) => TYPE_KEYS.includes(key.toLowerCase()),
    element: () => {
        const div = elementDiv([
            CLASSNAMES.content.root,
            CLASSNAMES.content.ruler,
        ]);
        return div('');
    },
};
