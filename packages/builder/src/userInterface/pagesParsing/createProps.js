import {
    isString, isUndefined, find, keys, uniq,
    some, filter, reduce, cloneDeep, includes,last
} from "lodash/fp";
import { types, expandPropsDefinition } from "./types";
import { assign } from "lodash";
import { pipe } from "../../common/core";
import { isRootComponent } from "./searchComponents";
import { ensureShardNameIsInShardMap } from "../../../../core/src/indexing/sharding";

export const getInstanceProps = (componentInfo, props) => {
    const finalProps = cloneDeep(componentInfo.fullProps);

    for(let p in props) {
        finalProps[p] = props[p];
    }

    return finalProps;
}

export const getNewComponentInfo = (components, inherits, name) => {
    const parentcomponent = find(c => c.name === inherits)(components);
    const component = {
        name: name || "", 
        description:"", 
        inherits, 
        props:{}, 
        tags:parentcomponent.tags
    };
    return getComponentInfo(
        components,
        component);
}


export const getScreenInfo = (components, screen) => {
    return getComponentInfo(
        components, 
        screen);
}

export const getComponentInfo = (components, comp) => {
    const targetComponent = isString(comp) 
                            ? find(c => c.name === comp)(components)
                            : comp;
    let component;
    let subComponent;
    if(isRootComponent(targetComponent)) {
        component = targetComponent;
    } else {
        subComponent = targetComponent;
        component = find(c => c.name === subComponent.inherits)(components);
    }

    const cname = isString(comp) ? comp : comp.name;

    const subComponentProps = subComponent ? subComponent.props : {};
    const p = createProps(cname, component.props, subComponentProps);
    const rootProps = createProps(cname, component.props);

    const unsetProps = pipe(p.props, [
        keys,
        filter(k => !includes(k)(keys(subComponentProps)) && k !== "_component")
    ]);

    const fullProps = cloneDeep(p.props);
    fullProps._component = targetComponent.name;

    return ({
        propsDefinition:expandPropsDefinition(component.props), 
        rootDefaultProps: rootProps.props,
        unsetProps,
        fullProps: fullProps,
        errors: p.errors,
        component: targetComponent,
        rootComponent: component
    });
}

export const createProps = (componentName, propsDefinition, derivedFromProps) => {

    const error = (propName, error) =>
        errors.push({propName, error});

    const props = {
        _component: componentName
    };

    const errors = [];

    if(!componentName)
        error("_component", "Component name not supplied");

    for(let propDef in propsDefinition) {
        const parsedPropDef = parsePropDef(propsDefinition[propDef]);
        if(parsedPropDef.error)
            error(propDef, parsedPropDef.error); 
        else 
            props[propDef] = parsedPropDef;
    }

    if(derivedFromProps) {
        assign(props, derivedFromProps);
    }

    return ({
        props, errors
    });
}

export const createArrayElementProps = (arrayPropName, elementDefinition) => 
    createProps(
        `#${arrayPropName}#array_element`,
        elementDefinition);

const parsePropDef = propDef => {
    const error = message => ({error:message, propDef});

    if(isString(propDef)) {
        if(!types[propDef])
            return error(`Do not recognise type ${propDef}`);
        
        return types[propDef].default();
    }

    if(!propDef.type)
        return error("Property Definition must declare a type");
    
    const type = types[propDef.type];
    if(!type)
        return error(`Do not recognise type ${propDef.type}`);

    if(isUndefined(propDef.default))
        return type.default(propDef);

    if(!type.isOfType(propDef.default))
        return error(`${propDef.default} is not of type ${type}`);

    return propDef.default;
}

export const arrayElementComponentName = (parentComponentName, arrayPropName) => 
    `${parentComponentName}:${arrayPropName}`;

/*
Allowed propDefOptions
- type: string, bool, number, array
- default: default value, when undefined
- required: field is required 
*/