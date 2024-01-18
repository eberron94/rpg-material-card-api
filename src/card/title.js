const {
    titleTextString,
    titleCodeString,
    iconBundleFront,
    titleFormatString,
} = require("../helper/dataUtil");
const { elementDiv, elementSpan } = require("../helper/elementUtil");
const { markupUtil } = require("../helper/markupUtil");
const { iconFront } = require("./iconFront");

exports.title = (params) => {
    const markup = markupUtil.markup();

    const div = elementDiv();
    const span = elementSpan();

    const text = titleTextString(params);
    const code = titleCodeString(params);
    const titleFormat = titleFormatString(params);

    const icon = iconFront(params);

    const content = [];
    titleFormat.split("-").forEach((format) => {
        switch (format) {
            case "name":
                content.push(span(markup(text), "name"));
                break;
            case "icon":
            case "icons":
                content.push(icon);
                break;
            case "code":
                content.push(span(code, "code"));
                break;
        }
    });

    return div(content, ["title", titleFormat]);
};
