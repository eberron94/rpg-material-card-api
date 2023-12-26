const fs = require("fs");
const { cardFront } = require("./src/card/cardFront");

exports.materialCard = cardFront;

const saveFile = (name, data) => {
  try {
    if (typeof data === "object") {
      const jsonStr = JSON.stringify(data, null, 4);
      fs.writeFile(name, jsonStr, (err) => {
        if (err) return console.log(err);
        console.log("saved " + name);
      });
    } else if (typeof data === "string")
      fs.writeFile(name, data, (err) => {
        if (err) return console.log(err);
        console.log("saved " + name);
      });
  } catch (err) {
    console.log(err);
  }
};

const testCard = {
    cardData: {
        count: 1,
        color: '',
        title: 'Content lines part 1',
        icon_front: '',
        icon_back: '',
        qr: '',
        title_font_size: 0,
        body_font_size: 0,
        contents: [
            'subtitle | The basics of formatting',
            'text | Each line in the content area will be transformed and formatted to appear on the card. On each line, you can further format the text by using the following markups:',
            'bullet | Bold | A phrase surrounded by two stars or underlines will be bolded like **this** or __this__.',
            'bullet | Italics | A phrase surrounded by a single star or underline will be italicized like *this* or _this_.',
            'bullet | Bold Italics | A phrase surrounded by three stars or underlines will be bolded and italicized like ***this*** or ___this___.',
            'bullet | New line | A line with two carrots will break into a new line.^^Like this.',
            'bullet | ndash | Two dashes will become a ndash--like this.',
            'bullet | mdash | Three dashes will become a mdash---like this.',
            'text | example of title substitution: {title} or [[title]]',
        ],
    },
    options: {
        default_color: '#000000',
        default_icon: 'ace',
        default_title_font_size: '13',
        default_body_font_size: '8',
        page_width: '8.5in',
        page_height: '11in',
        page_rows: 2,
        page_columns: 3,
        card_arrangement: 'doublesided',
        card_width: '3in',
        card_height: '5in',
        scale: 1,
        shrink: true,
    },
};

saveFile(
  "text.html",
  '<!DOCTYPE html><html><head><link rel="stylesheet" href="mystyle.css"></head><body>' +
    cardFront(testCard) +
    "</body></html>"
);
