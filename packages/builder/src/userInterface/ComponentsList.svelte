<script>
import {
    isRootComponent
} from "./pagesParsing/searchComponents"
import { splitName } from "./pagesParsing/splitRootComponentName.js"
import { store } from "../builderStore";
import {
    groupBy, keys, find, sortBy
} from "lodash/fp";
import { pipe } from "../common/core";

let componentLibraries=[];

const addRootComponent = (c, all) => {
    const { libName } = splitName(c.name);
    let group = find(r => r.libName === libName)(all);

    if(!group) {
        group = {
            libName,
            components: [],
            generators: []
        };

        all.push(group);
    }

    group.components.push(c)
    
};

const onComponentChosen = (component) => {
    
};

store.subscribe(s => {

    const newComponentLibraries = [];

    for(let comp of sortBy(["name"])(s.components)) {
        addRootComponent(
            comp, 
            newComponentLibraries);
    }

    componentLibraries = newComponentLibraries;
});





</script>

{#each componentLibraries as lib}
<div class="library-header">
    {lib.libName}
</div>

<div class="library-container">

 
    <div class="inner-header">
        Components
    </div>

    {#each lib.components as component}

    <div class="component"
         on:click={() => onComponentChosen(component)}>
        <div class="name">
            {splitName(component.name).componentName}
        </div>
        <div class="description">
            {component.description}
        </div>
    </div>

    {/each}

</div>

{/each}


<style>

.library-header {
    font-size: 1.1em;
    border-color: var(--primary25);
    border-width: 1px 0px;
    border-style: solid;
    background-color: var(--primary10);
    padding: 5px 0;
}

.library-container {
    padding: 0 0 10px 10px;
}

.inner-header {
    font-size: 0.9em;
    font-weight: bold;
    margin-top: 7px;
    margin-bottom: 3px;
}

.component {
    padding: 2px 0px;
    cursor: pointer;
}

.component:hover {
    background-color: var(--lightslate);
}

.component > .name {
    color: var(--secondary100);
    display: inline-block;
}

.component > .description {
    font-size: 0.8em;
    color: var(--secondary75);
    display: inline-block;
    margin-left: 10px;
}



</style>
