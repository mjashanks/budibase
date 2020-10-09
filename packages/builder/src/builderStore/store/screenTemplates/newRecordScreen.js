export default function(models) {
  return models.map(model => {
    const fields = Object.keys(model.schema)
    const heading = fields.length > 0 ? `{{ data.${fields[0]} }}` : "Add Row"
    return {
      name: `New Row - ${model.name}`,
      create: () => createScreen(model, heading),
      id: NEW_RECORD_TEMPLATE,
    }
  })
}

export const NEW_RECORD_TEMPLATE = "NEW_RECORD_TEMPLATE"

const createScreen = (model, heading) => ({
  props: {
    _id: "",
    _component: "@budibase/standard-components/newrow",
    _styles: {
      normal: {},
      hover: {},
      active: {},
      selected: {},
    },
    model: model._id,
    _children: [
      {
        _id: "",
        _component: "@budibase/standard-components/heading",
        _styles: {
          normal: {},
          hover: {},
          active: {},
          selected: {},
        },
        _code: "",
        className: "",
        text: heading,
        type: "h1",
        _instanceName: "Heading 1",
        _children: [],
      },
      {
        _id: "",
        _component: "@budibase/standard-components/dataform",
        _styles: {
          normal: {},
          hover: {},
          active: {},
          selected: {},
        },
        _code: "",
        _instanceName: `${model.name} Form`,
        _children: [],
      },
      {
        _id: "",
        _component: "@budibase/standard-components/container",
        _styles: {
          normal: {
            display: "flex",
            "flex-direction": "row",
            "align-items": "center",
            "justify-content": "flex-end",
          },
          hover: {},
          active: {},
          selected: {},
        },
        _code: "",
        className: "",
        onLoad: [],
        type: "div",
        _instanceName: "Buttons Container",
        _children: [
          {
            _id: "",
            _component: "@budibase/standard-components/button",
            _styles: {
              normal: {
                "margin-right": "20px",
              },
              hover: {},
              active: {},
              selected: {},
            },
            _code: "",
            text: "Back",
            className: "",
            disabled: false,
            onClick: [
              {
                parameters: {
                  url: `/${model.name.toLowerCase()}`,
                },
                "##eventHandlerType": "Navigate To",
              },
            ],
            _instanceName: "Back Button",
            _children: [],
          },
          {
            _id: "",
            _component: "@budibase/standard-components/button",
            _styles: {
              normal: {},
              hover: {},
              active: {},
              selected: {},
            },
            _code: "",
            text: "Save",
            className: "",
            disabled: false,
            onClick: [
              {
                parameters: {
                  contextPath: "data",
                  modelId: model._id,
                },
                "##eventHandlerType": "Save Record",
              },
            ],
            _instanceName: "Save Button",
            _children: [],
          },
        ],
      },
    ],
    _instanceName: `${model.name} - New`,
    _code: "",
  },
  route: `/${model.name.toLowerCase()}/new`,
  name: "",
})