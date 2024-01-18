const { CLASSNAMES } = require("./classUtil");
const { iconBundleInline } = require("./dataUtil");
const { elementSpan, element, elementVoid } = require("./elementUtil");

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
    const lineBreak = elementSpan(CLASSNAMES.inline.linebreak)("<br/>");

    return string.replace(/(?:<br *\/?>|\^\^)/g, lineBreak);
};

const replaceMDash = (string) => {
    const mdash = elementSpan(CLASSNAMES.inline.mdash)("&mdash;");

    return string.replace(/(?:---|—)/g, mdash);
};

const replaceNDash = (string) => {
    const ndash = elementSpan(CLASSNAMES.inline.ndash)("&ndash;");

    return string.replace(/(?:--|–)/g, ndash);
};

const replaceIconInline = (string, cardData, options, iconMap) => {
    const iconImg = elementVoid("img", CLASSNAMES.inline.icon);

    return string.replace(
        /(?:\{|\[\[) *icon *([^\]\}]+) *(?:\}|\]\])/g,
        (_, matchCode) => {
            const { path, rotation } = iconBundleInline({
                params: [matchCode],
                cardData,
                options,
                iconMap,
            });

            return iconImg(
                CLASSNAMES.inline.icon + "-" + matchCode,
                `onerror="this.style.color='red'" src="${path}" alt="~${matchCode}~" style="transform:rotate ${rotation}deg"`
            );
        }
    );
};

const replaceTitle = (string, cardData) => {
    const title = elementSpan(CLASSNAMES.inline.title);

    return string.replace(/(\{title\}|\[\[title\]\])/g, (_, match) =>
        title(cardData?.title || "TITLE")
    );
};

const replacePathfinder2EActions = (string) => {
    const action = elementSpan(CLASSNAMES.inline.pf2e.action);

    // Handles both {action-type} and [[action-type]]
    return string
        .replace(
            //replace 1A
            /(\{one-action\}|\[\[one-action\]\])/g,
            action("1", CLASSNAMES.inline.pf2e.oneaction)
        )
        .replace(
            //replace 2A
            /(\{two-action\}|\[\[two-action\]\])/g,
            action("2", CLASSNAMES.inline.pf2e.twoaction)
        )
        .replace(
            //replace 3A
            /(\{three-action\}|\[\[three-action\]\])/g,
            action("3", CLASSNAMES.inline.pf2e.threeaction)
        )
        .replace(
            //replace RA
            /(\{reaction\}|\[\[reaction\]\])/g,
            action("R", CLASSNAMES.inline.pf2e.reaction)
        )
        .replace(
            //replace FA
            /(\{free-action\}|\[\[free-action\]\])/g,
            action("F", CLASSNAMES.inline.pf2e.freeaction)
        );
};

const shinkExtraSpace = (string) => {
    return string.replace(/  +/g, " ");
};

const stylize = (string, cardData, options, iconMap) => {
    switch (typeof string) {
        case "string":
            break;
        case "object":
            if (Array.isArray(string)) {
                return string
                    .map((s) => stylize(s, string, cardData, options, iconMap))
                    .join(" ");
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
        replaceMDash,
        replaceNDash,
        replacePathfinder2EActions,
        replaceIconInline,

        //TODO: Inject custom stylizers?

        shinkExtraSpace,
    ].reduce(
        (editString, fn) => fn(editString, cardData, options, iconMap),
        string
    );
};

const markup = (string) => {
    switch (typeof string) {
        case "string":
            break;
        case "object":
            if (Array.isArray(string)) {
                return string.map((s) => markup(s)).join(" ");
            }
        default:
            return string;
    }

    return [
        replaceBoldItalics,
        replaceBold,
        replaceItalics,
        replaceMDash,
        replaceNDash,
        replacePathfinder2EActions,

        //TODO: Inject custom stylizers?

        shinkExtraSpace,
    ].reduce((editString, fn) => fn(editString), string);
};

exports.markupUtil = {
    stylizer: (cardData, options, iconMap) => {
        return (string) => stylize(string, cardData, options, iconMap);
    },
    markup: () => (string) => markup(string),
};
