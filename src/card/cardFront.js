const { CLASSNAMES } = require('../helper/classUtil');
const { splitParams } = require('../helper/dataUtil');
const { elementDiv, element } = require('../helper/elementUtil');
const { partManager } = require('../parts');
const { tablerow } = require('../parts/tablerow');
const { title } = require('./title');

exports.cardFront = (params) => {
    const div = elementDiv();

    const titleElement = title(params);
    const content = div(makeContent(params), CLASSNAMES.front.content);

    return div([titleElement, content], CLASSNAMES.front.root);
};

const makeContent = (params) => {
    const { cardData, options, iconMap } = params;
    const { contents } = cardData;

    const smartContents = contents
        .concat([''])
        .map(splitParams)
        .map(addHtmlToContent(cardData, options, iconMap));

    const groupedContent = groupTableContent(smartContents);

    return groupedContent.map((arr) => {
        if (arr.length === 0) return null;
        if (arr.length === 1) return arr[0].html; // handle elemental

        return makeTable(arr, params);
    });
};

const addHtmlToContent =(cardData, options, iconMap) => (content, props) => {
    const { type } = content;

    content.html = partManager.getElement(type)({ ...props, ...content }, cardData, options, iconMap);
    return content;
};

const groupTableContent = (contents) => {
    if (contents.length === 0) return [];

    const groups = [];

    let queue = [];
    contents.forEach((item) => {
        if (tablerow.isType(item.type)) {
            queue.push(item);
        } else {
            if (queue.length) {
                // current item is not part of the last table group
                // push group to queue and empty queue
                groups.push(queue);
                queue = [];
            }
            groups.push([item]);
        }
    });

    return groups;
};

const makeTable = (content, props) => {
    const table = element('div', 'table');
};
