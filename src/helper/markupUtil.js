const { elementSpan } = require('./elementUtil');

const replaceBoldItalics = (string) => {
    const boldItalic = elementSpan('bold italics');

    return string.replace(/[_*]{3}([^\*]+)[_*]{3}/g, (_, match) =>
        boldItalic(match)
    );
};

const replaceBold = (string) => {
    const bold = elementSpan('bold');

    return string.replace(/[_*]{2}([^\*]+)[_*]{2}/g, (_, match) => bold(match));
};

const replaceItalics = (string) => {
    const italics = elementSpan('italics');

    return string.replace(/[_*]{1}([^\*]+)[_*]{1}/g, (_, match) =>
        italics(match)
    );
};

const replaceNewLineCarrots = (string) => {
    const lineBreak = elementSpan('line-break')('<br/>');

    return string.replace(/(?:<br *\/?>|\^\^)/g, lineBreak);
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

const stylize = (string) => {
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
        replaceBoldItalics,
        replaceBold,
        replaceItalics,
        replaceNewLineCarrots,
        replacePathfinder2EActions,

        //TODO: Inject custom stylizers?

        shinkExtraSpace,
    ].reduce((editString, fn) => fn(editString), string);
};

exports.markupUtil = { stylize };
