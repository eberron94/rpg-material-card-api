const { CLASSNAMES } = require('./classUtil');
const { iconBundleInline } = require('./dataUtil');
const { elementSpan, element } = require('./elementUtil');

const replaceBoldItalics = (string) => {
    const boldItalic = elementSpan(CLASSNAMES.inline.format.bolditalic);

    return string.replace(/[_*]{3}([^\*]+)[_*]{3}/g, (_, match) =>
        boldItalic(match)
    );
};

const replaceBold = (string) => {
    const bold = elementSpan(CLASSNAMES.inline.format.bold);

    return string.replace(/[_*]{2}([^\*]+)[_*]{2}/g, (_, match) => bold(match));
};

const replaceItalics = (string) => {
    const italics = elementSpan(CLASSNAMES.inline.format.italic);

    return string.replace(/[_*]{1}([^\*]+)[_*]{1}/g, (_, match) =>
        italics(match)
    );
};

const replaceNewLineCarrots = (string) => {
    const lineBreak = elementSpan(CLASSNAMES.inline.linebreak)('<br/>');

    return string.replace(/(?:<br *\/?>|\^\^)/g, lineBreak);
};

const replaceIconInline = (string) => {
    const iconImg = element('img', CLASSNAMES.inline.icon);

    return string.replace(
        /(?:\{|\[\[) ?icon? ([^\]\}]+)? (?:\}|\]\])/g,
        (_, match) => {
            const { path, rotation } = iconBundleInline(match);
            return iconImg(
                '',
                CLASSNAMES.inline.icon + '-' + match,
                `src="${path}" style="transform:rotate${rotation}deg"`
            );
        }
    );
};

const replaceTitle = (string, cardData) => {
    const title = elementSpan(CLASSNAMES.inline.title);

    return string.replace(/(\{title\}|\[\[title\]\])/g, (_, match) =>
        title(cardData?.title || 'TITLE')
    );
};

const replacePathfinder2EActions = (string) => {
    const action = elementSpan('pf2e-action');

    // Handles both {action-type} and [[action-type]]
    return string
        .replace(
            //replace 1A
            /(\{one-action\}|\[\[one-action\]\])/g,
            action('1', 'one-action')
        )
        .replace(
            //replace 2A
            /(\{two-action\}|\[\[two-action\]\])/g,
            action('2', 'two-action')
        )
        .replace(
            //replace 3A
            /(\{three-action\}|\[\[three-action\]\])/g,
            action('3', 'three-action')
        )
        .replace(
            //replace RA
            /(\{reaction\}|\[\[reaction\]\])/g,
            action('R', 'reaction')
        )
        .replace(
            //replace FA
            /(\{free-action\}|\[\[free-action\]\])/g,
            action('F', 'free-action')
        );
};

const shinkExtraSpace = (string) => {
    return string.replace(/  +/g, ' ');
};

const stylize = (string, params) => {
    switch (typeof string) {
        case 'string':
            break;
        case 'object':
            if (Array.isArray(string)) {
                return string.map(stylize).join(' ');
            }
        default:
            return string;
    }

    return [
        replaceTitle,
        replaceBoldItalics,
        replaceBold,
        replaceItalics,
        replaceNewLineCarrots,
        replacePathfinder2EActions,
        replaceIconInline,

        //TODO: Inject custom stylizers?

        shinkExtraSpace,
    ].reduce((editString, fn) => fn(editString, params), string);
};

exports.markupUtil = { stylize };
