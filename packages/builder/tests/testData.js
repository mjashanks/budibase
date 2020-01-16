
export const componentsAndScreens = () => ({
    components: [
        {
            name: "budibase-components/TextBox",
            tags: ["Text", "input"],
            children: false,
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
            children: true,
            props: {
                size: {type:"options", options:["small", "medium", "large"]},
                css: "string",
                contentText: "string"
            } 
        },
        {
            name: "budibase-components/div",
            tags: ["input"],
            props: {
                width: "number",
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
            name: "common/SmallTextbox",
            props: {
                _component: "budibase-components/TextBox",
                size: "small"
            }
        },
        
        {
            name: "common/PasswordBox",
            tags: ["mask"],
            props: {
                _component: "budibase-components/TextBox",
                isPassword: true,
                size: "small"
            }
        },

        {
            name:"PrimaryButton",
            props: {
                _component:"budibase-components/Button",
                css:"btn-primary"
            }
        },

        {
            name:"ButtonGroup",
            props: {
                _component:"budibase-components/div",
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
            name:"Field",
            props: {
                _component:"budibase-components/div",
                _children:[
                    {
                        _component: "common/SmallTextbox"
                    }
                ]
            }
        },
    ]
});