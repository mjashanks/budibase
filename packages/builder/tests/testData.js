
export const componentsAndScreens = () => ({
    components: [
        {
            name: "budibase-components/TextBox",
            tags: ["Text", "input"],
            props: {
                size: {type:"options", options:["small", "medium", "large"]},
                isPassword: "bool",
                placeholder: "string",
                label:"string"
            } 
        },
        {
            name: "budibase-components/Button",
            tags: ["input"],
            props: {
                size: {type:"options", options:["small", "medium", "large"]},
                css: "string",
                content: "children",
                contentText: "string"
            } 
        },
        {
            name: "budibase-components/div",
            tags: ["input"],
            props: {
                width: "number",
                header : "children",
                children: {
                    type:"array",
                    elementDefinition: {
                        control: "children"
                    }
                } 
            }
        },
        {
            name:"budibase-components/RecordView",
            tags: ["record"],
            props: {
                data: "state"
            }
        }
    ],
    screens: [
        {
            inherits:"budibase-components/TextBox",
            name: "common/SmallTextbox",
            props: {
                size: "small"
            }
        },
        
        {
            inherits:"budibase-components/TextBox",
            name: "common/PasswordBox",
            tags: ["mask"],
            props: {
                isPassword: true,
                size: "small"
            }
        },
        {
            inherits:"budibase-components/Button",
            name:"PrimaryButton",
            props: {
                css:"btn-primary"
            }
        },
        {
            inherits:"budibase-components/div",
            name:"ButtonGroup",
            props: {

                width: 100,
                header: [{
                    _component: "PrimaryButton"
                }],
                children: [
                    {
                        control: [{
                            _component: "PrimaryButton",
                            contentText: "Button 1"
                        }]
                    },
                    {
                        control: [{
                            _component: "PrimaryButton",
                            contentText: "Button 2"
                        }]
                    },
                    {
                        control: [{
                            _component: "common/PasswordBox",
                        }]
                    }
                ]
            }
        },
        {
            inherits:"budibase-components/div",
            name:"Field",
            props: {
                children:[
                    {
                        _component: "common/SmallTextbox"
                    }
                ]
            }
        },
    ]
});