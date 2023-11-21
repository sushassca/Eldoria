<script>
    import { writable } from 'svelte/store';
    import { buildings, assets } from "@/tiles";
    import { updateAsset } from '@/stores/building'

    let buildingEntries = Object.entries({...buildings, ...assets});

    // Create a writable store
    export const selectedBuilding = writable(null);

    const handleClick = (key) => {
        keySelected = key
        updateAsset(key)
    }

    let keySelected = null

</script>
<div id="building-container">
     <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click={() => handleClick(null)} class={`asset ${keySelected === null ? "focus" : ""}`}>
        <img alt={undefined} class="remove" src="/PNG/remove.png">
    </div>
    {#each buildingEntries as [key, value]}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div on:click={() => handleClick(key)} class={`asset ${value.class || ""} ${keySelected === key ? "focus" : ""}`}>
            <img alt={""} src={value.src}>
        </div>
    {/each}
</div>



  <style>
#building-container {
    position: fixed;
    left: 20px;
    height: auto;
    width: calc((60px) * 3 + 20px);
    background: #0f141ce5;
    top: 50%;
    transform: translateY(-50%);
    padding: 10px;
    border-radius: 5px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 60px);
    box-sizing: content-box;
    grid-gap: 10px;
}

#building-container .asset {
    min-height: 50px;
    height: auto;
    width: 50px;
    background-color: #100f1c;
    display: grid;
    align-content: center;
    border-radius: 10px;
    padding: 5px;
    user-select: none;
    transition: 0.3s ease-in-out, width 0s, height 0s;
    transition-delay: 100ms;

}


#building-container .asset .remove {
    width: 35px;
    height: 35px;
    margin: 0 auto;
}

#building-container .asset.focus {
    box-shadow: inset 0px 0px 0px 2px #ab3820a8;
    cursor: pointer;
    border-color: transparent;
    transition: 0s;
    /* transition-delay: 0ms; */
    cursor: pointer;
}


#building-container .asset:hover {
    background-color: #ab3820a8;
    cursor: pointer;
    border-color: transparent;
    transition: 0s;
    /* transition-delay: 0ms; */
    cursor: pointer;
}


#building-container .asset img {
    height: auto;
    width: 50px;
    pointer-events: none;
    box-sizing: border-box;

}
  </style>