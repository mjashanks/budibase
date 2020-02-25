<script>
  import { List } from "../List";
  import { MDCMenu } from "@material/menu";
  import { onMount, setContext } from "svelte";
  export let items = [];
  export let singleSelection = true;
  export let width = "400px";
  export let open = true;
  export let useFixedPosition = false;
  export let useAbsolutePosition = false;
  //{x: number, y: number}
  export let absolutePositionCoords = null;
  export let listElement;

  let menu = null;
  let instance = null;


  $: listElement && _bb.attachChildren(listElement)

  onMount(() => {
    if (!!menu) {
      instance = new MDCMenu(menu);
      instance.open = open;
      if (useFixedPosition) {
        instance.setFixedPosition(true);
      } else if (useAbsolutePosition) {
        let { x, y } = absolutePositionCoords;
        instance.setAbsolutePosition(x | 0, y | 0);
      }
    }
    setContext("BBMD:list:context", "menu");
  });
</script>

{#if useFixedPosition || useAbsolutePosition}
  <div
    bind:this={menu}
    class="mdc-menu mdc-menu-surface"
    style={`width: ${width}`}>
    <List {items} {singleSelection} />
  </div>
{:else}
  <div class="mdc-menu-surface--anchor">
    <!-- Will automatically anchor to slotted element -->
    <slot />
    <div
      bind:this={menu}
      class="mdc-menu mdc-menu-surface"
      style={`width: ${width}`}>
      <List  {singleSelection} bind:this={listElement}></List>
    </div>
  </div>
{/if}


/-----------------

<script>
import Menu from "Menu"

let menuElement

$: menuElement && _bb.attachChildren(menuElement.listElement)

</script>

<Menu bind:this={menuElement}></Menu>