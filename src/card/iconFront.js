const { CLASSNAMES } = require('../helper/classUtil');
const { iconBundleFront } = require('../helper/dataUtil');
const { elementDiv, element } = require('../helper/elementUtil');

exports.iconFront = (params) => {
    const div = elementDiv();
    const img = element('img', CLASSNAMES.front.icon);
    const { path, rotation } = iconBundleFront(params);
    
    

    const content = img(
        '',
        'icon',
        `src="${path}" style="transform:rotate${rotation}deg"`
    );

    return div(content, 'icon-front');
};
