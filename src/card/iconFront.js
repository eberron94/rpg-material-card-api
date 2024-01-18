const { CLASSNAMES } = require('../helper/classUtil');
const { iconBundleFront } = require('../helper/dataUtil');
const { elementDiv, element } = require('../helper/elementUtil');

exports.iconFront = (params) => {
    const div = elementDiv();
    const img = element('img', CLASSNAMES.front.icon);
    const { path, rotation } = iconBundleFront(params);
    
    const tempPath =
    "https://raw.githubusercontent.com/eberron94/rpg-material-cards/0ce001cc02bbd4a23eec4a9cb7e6eff4ad54a144/public" +
    path;

    const content = img(
        '',
        'icon',
        `src="${tempPath}" style="transform:rotate${rotation}deg"`
    );

    return div(content, 'icon-front');
};
