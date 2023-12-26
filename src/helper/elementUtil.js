const { arrayUtil } = require('./arrayUtil');
const { CLASSNAMES } = require('./classUtil');

const CLASS_PREPEND = '';

const joinClassNames = (...args) =>
    args
        .flatMap(
            (
                e // extract className from objects and items from array
            ) => (typeof e === 'object' && 'className' in e ? e.className : e)
        )
        .flatMap((e) => (typeof e === 'string' ? e.split(' ') : e)) // extract joined strings
        .filter((e) => typeof e === 'string' && e) // only allow non-empty strings
        .map((e) => CLASS_PREPEND + e.trim()) // trim each string
        .join(' ');

const element =
    (elem, classNameCommon = '') =>
    (children, className = '', property = '') => {
        const totalClassName = joinClassNames(
            classNameCommon || '',
            className || ''
        );

        return `<${elem} class='${totalClassName}' ${property}>${arrayUtil.iron(
            children
        )}</${elem}>`;
    };

const elementDiv = (classNameCommon = '') =>
    element('div', [CLASSNAMES.element.div, classNameCommon]);
const elementSpan = (classNameCommon = '') =>
    element('span', [CLASSNAMES.element.span, classNameCommon]);

const elementP = (classNameCommon) =>
    element('div', [CLASSNAMES.element.p, classNameCommon]);
const elementListItem = (classNameCommon) =>
    element('div', [CLASSNAMES.element.listitem, classNameCommon]);

module.exports = {
    element,
    elementDiv,
    elementSpan,
    elementP,
    elementListItem,
};
