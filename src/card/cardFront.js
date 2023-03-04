const { splitParams } = require('../helper/dataUtil');
const { elementDiv, element } = require('../helper/elementUtil');
const { partManager } = require('../parts');
const { tablerow } = require('../parts/tablerow');
const { title } = require('./title');

exports.cardFront = (params) => {
    const div = elementDiv();

    const titleElement = title(params);
    const content = div(makeContent(params), 'content');

    return div([titleElement, content], 'card card-front');
};

const makeContent = (props) => {
    const { cardData } = props;
    const { contents } = cardData;

    const smartContents = contents
        .concat([''])
        .map(splitParams)
        .map(addHtmlToContent);

    const groupedContent = groupTableContent(smartContents);

    return groupedContent.map((arr) => {
        if (arr.length === 0) return null;
        if (arr.length === 1) return arr[0].html; // handle elemental

        return makeTable(arr, props);
    });
};

const addHtmlToContent = (content, props) => {
    const { type } = content;

    content.html = partManager.getElement(type)({ ...props, ...content });
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
