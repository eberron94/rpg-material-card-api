const defaultIconBundle = () => ({
    icon: 'ace',
    rotation: 0,
    color: '',
    path: '',
});

/**
 *
 * @param {string} iconString
 * @param {object} iconMap
 * @returns iconBundle
 */
const getIconBundle = (iconString, iconMap) => {
    const icon = defaultIconBundle();
    if (!iconString || typeof iconString !== 'string') return icon;

    //Extract (icon id)(#rotation)(%color) from string
    const result = iconString.match(
        /([-a-z0-9]+)((?:#|%)[-a-z0-9]+)?((?:#|%)[-a-z0-9]+)?/
    );

    const [_, iconName, op1, op2] = result;
    [op1, op2]
        .filter((op) => typeof op === 'string' && op)
        .forEach((op) => {
            const code = op.charAt(0);
            const value = op.substring(1);

            switch (code) {
                case '#':
                    icon.color = Number(value);
                    break;
                case '%':
                    icon.rotation = Number(value);
                    break;
            }

            const iconLookup = iconMap[iconName] || {};
            return { ...icon, ...iconLookup };
        });

    return icon;
};

const splitParams = (rawParams) => {
    const dividedParams = rawParams
        .replaceAll('\\|', '~#~')
        .split('|')
        .map((param) => param.replaceAll('~#~', '|'))
        .map((param) => param.trim());

    const [typeRaw, ...params] = dividedParams;
    const [type, decorationRaw = ''] = typeRaw.split(':');
    const dividedDecoration = decorationRaw.split(';');

    return {
        type,
        decoration: {},
        _decoration: dividedDecoration,
        params,
        html: '',
    };
};

const extractText = (params) => params[0];
const extractTextArray = (params) => params.map((e) => e || '');
const extractNameTextArray = (params) => {
    const arr = [];
    const pack = (name, text, ...args) => {
        if (name) {
            arr.push({ name: String(name), text: String(text) });
            pack(...args);
        }
    };

    pack(params);

    return arr;
};

const colorFront = ({ cardData = {}, options = {} }) => {
    return (
        cardData.color_front ||
        cardData.color ||
        options.default_color ||
        'black'
    );
};

const colorBack = ({ cardData = {}, options = {} }) => {
    return (
        cardData.color_back ||
        cardData.color ||
        options.default_color ||
        'black'
    );
};

const iconBundleFront = ({ cardData = {}, options = {}, iconMap }) => {
    const iconString =
        cardData.icon_front || cardData.icon || options.default_icon || 'ace';

    return getIconBundle(iconString, iconMap);
};

const iconBundleBack = ({ cardData = {}, options = {}, iconMap }) => {
    const iconString =
        cardData.icon_back || cardData.icon || options.default_icon || 'ace';

    return getIconBundle(iconString, iconMap);
};

const iconBundleInline = ({ params, cardData = {}, options = {}, iconMap }) => {
    const iconString = params[0] || '';
    const size = params[1] || '6';
    const align = params[2] || '';
    const count = Number(params[3]) || 1;
    const rounded = Boolean(params[4]) ? 2 : 0;
    const color = colorFront({ cardData, options });

    const iconBundle = getIconBundle(iconString, iconMap);

    return { ...iconBundle, size, align, color, count, rounded };
};

const cardCount = ({ cardData = {}, options = {} }) => {
    return Number(cardData.count) || Number(options.default_count) || 1;
};

const titleCodeString = ({ cardData = {}, options = {} }) => {
    return String(cardData.code) || String(options.default_code) || '';
};

const titleTextString = ({ cardData = {}, options = {} }) => {
    return String(cardData.title) || String(options.default_title) || '';
};

const titleFormatString = ({ cardData = {}, options = {} }) => {
    return cardData.title_format || options.title_format || 'name-icons';
};

const subtitleTextString = ({ params }) => {
    return extractText(params);
};

const textTextString = ({ params }) => {
    return extractText(params);
};

const sectionTextArray = ({ params }) => {
    return extractTextArray(params);
};

const propertyNameTextArray = ({ params }) => {
    return extractNameTextArray(params);
};

const descriptionNameTextArray = ({ params }) => {
    return extractNameTextArray(params);
};

const listNameString = ({ params }) => {
    return params[1] ? params[0] : '';
};

const listTextString = ({ params }) => {
    return params[1] ? params[1] : params[0];
};

const tableCellTextArray = ({ params }) => {
    return extractTextArray(params);
};

const traitTextArray = ({ params }) => {
    return extractTextArray(params).map((trait) => String(trait).toLowerCase());
};

const fillSize = ({ params }) => {
    return params[0] || 1;
};

module.exports = {
    splitParams,
    colorFront,
    colorBack,
    iconBundleFront,
    iconBundleBack,
    iconBundleInline,
    cardCount,
    titleCodeString,
    titleTextString,
    titleFormatString,
    subtitleTextString,
    textTextString,
    sectionTextArray,
    propertyNameTextArray,
    descriptionNameTextArray,
    listNameString,
    listTextString,
    tableCellTextArray,
    traitTextArray,
    fillSize,
};

/*
const titleTextFont = ({ cardData, options }) => {
    return (
        Number(
            cardData.title_font_size || options.default_title_font_size || '16'
        ) * (Number(options.scale) || 1)
    );
};

const bodyTextFont = ({ cardData, options }) => {
    return (
        Number(
            cardData.body_font_size || options.default_body_font_size || '16'
        ) * Number(options.scale || 1)
    );
};

const lineTextFont = (lineData, cardData, options) => {
    if (lineData.font_size) {
        return (
            Number(lineData.font_size) * Number(options.scale || 1) ||
            bodyTextFont({ cardData, options })
        );
    }
    return bodyTextFont({ cardData, options });
};

*/
