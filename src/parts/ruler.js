const { elementDiv } = require('../helper/elementUtil');

const TYPE_KEYS = ['ruler', 'divide', 'rule'];

exports.ruler = {
    isType: (key) => TYPE_KEYS.includes(key),
    element: () => {
        const div = elementDiv();
        return div('', 'element ruler');
    },
};
