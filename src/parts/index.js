const { description } = require('./description');
const { list } = require('./list');
const { property } = require('./property');
const { ruler } = require('./ruler');
const { section } = require('./section');
const { subtitle } = require('./subtitle');
const { tablerow } = require('./tablerow');
const { textLine } = require('./text');
const { pftrait } = require('./trait');

exports.partManager = {
    getElement: (type) => {
        if (description.isType(type)) return description.element;
        if (list.isType(type)) return list.element;
        if (property.isType(type)) return property.element;
        if (ruler.isType(type)) return ruler.element;
        if (section.isType(type)) return section.element;
        if (subtitle.isType(type)) return subtitle.element;
        if (tablerow.isType(type)) return tablerow.element;
        if (textLine.isType(type)) return textLine.element;
        if (pftrait.isType(type)) return pftrait.element;

        return textLine.element;
    },
};
