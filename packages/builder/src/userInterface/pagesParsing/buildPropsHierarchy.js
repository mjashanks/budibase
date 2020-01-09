import { 
    getComponentInfo, createProps, getInstanceProps 
} from "./createProps";

export const buildPropsHierarchy = (components, baseComponent) => {

    const buildProps = (componentName, propsDefinition, derivedFromProps) => {

        const {props} = createProps(componentName, propsDefinition, derivedFromProps);
        props._component = componentName;
        for(let propName in props) {
            if(propName === "_component") continue;

            const propDef = propsDefinition[propName];
            if(!propDef) continue;
            if(propDef.type === "children") {

                const childrenProps = props[propName];
                
                if(!childrenProps 
                   || childrenProps.length === 0) {
                       continue;
                }

                props[propName] = [];

                for(let child of childrenProps) {
                    const propComponentInfo = getComponentInfo(
                        components, child._component);
    
                    const subComponentInstanceProps = getInstanceProps(
                        propComponentInfo,
                        child
                    );
    
                    props[propName].push(
                        buildProps(
                            propComponentInfo.rootComponent.name,
                            propComponentInfo.propsDefinition,
                            subComponentInstanceProps));
                }

            } else if(propDef.type === "array") {
                const propsArray = props[propName];
                const newPropsArray = [];
                let index = 0;
                for(let element of propsArray) {
                    newPropsArray.push(
                        buildProps(
                            `${propName}#array_element#`,
                            propDef.elementDefinition,
                            element));
                    index++;
                }

                props[propName] = newPropsArray;
            }
        }

        return props;

    }

    if(!baseComponent) return {};

    const baseComponentInfo  = getComponentInfo(components, baseComponent);

    return buildProps(
        baseComponentInfo.rootComponent.name,
        baseComponentInfo.propsDefinition,
        baseComponentInfo.fullProps);

}