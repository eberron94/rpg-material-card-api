const defaultClassNames = () => ({
  title: {
    root: "title",
    name: "name",
    code: "code",
    icon: "icon",
  },

  element: {
    root: "element",
    div: "-div",
    span: "-span",
    p: "-p",
    img: "-img",
    table: "-table",
    tablerow: "-tablerow",
    tablecell: "-tablecell",
    listitem: "-listitem",
  },

  content: {
    root: "content",
    text: "text",
    description: "description",
    subtitle: "subtitle",
    trait: "trait",
    property: "property",
    list: "list",
    section: "section",
    ruler: "ruler",
    tableGroup: "table-group",
    tableRow: "table-row",
    tableCell: "table-cell",

    pfTraitGroup: "pftrait-group",
    pfTraitItem: "pftrait-item",
  },

  inline: {
    lineName: "line-name",
    lineText: "line-text",

    title: "inline-title",
    icon: "inline-icon",
    linebreak: "linebreak",
    mdash: "mdash",
    ndash: "ndash",

    format: {
      bold: "bold",
      italic: "italic",
      bolditalic: "bold italic",
      underline: "underline",
      strike: "strike",
      superscript: "superscript",
      subscript: "subscript",
      smallcaps: "smallcaps",
    },

    pf2e: {
      action: "pf2e-action",
      oneaction: "one-action",
      twoaction: "two-action",
      threeaction: "three-action",
      freeaction: "free-action",
      reaction: "reaction",
    },
  },

  front: {
    root: "card card-front",
    icon: "icon",
    content: "card-content",
  },

  back: {
    root: "card card-back",
    icon: "icon",
  },
});

exports.CLASSNAMES = defaultClassNames();
