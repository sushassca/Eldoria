<script>
    import { tiles, buildings, enviroment } from "../assets"
    
    const elements = { tiles, buildings, enviroment }

    import { sfloor, sasset, isToolsOpen } from "../storages/storage"

    let sections = []

    
    for (const el in elements) {
     sections.push({el, type: (el === "tiles") ? "f" : "a", items: elements[el]})
    }


    function handleItem(type, id) {
        if (type == "f") {
            $sfloor = id
        }

        if (type == "a") {
             if ($sasset != id) {
                $sasset = id
             } else {
                $sasset= "null"
             }
        }
    }


    function toggle() {
        $isToolsOpen = ($isToolsOpen == "true") ? "false" : "true" 
    }

</script>

<div class={($isToolsOpen == "true") ? "expand" : ""} id="tools">
    <button id="toggle" on:click={toggle}>
        <img src="/images/arrow.png" alt="arrow">
    </button>
    <div class="scroll-wrapper">
        {#each sections as section}
            <div class="grid-wrapper">
                <h3>{section.el}</h3>
                <div class="grid">
                    {#each Object.values(section.items) as item}
                        <button id={item.id} on:mouseover={() => {console.log(item.id)}} on:click={() => {handleItem(section.type, item.id)}} class={($sfloor == item.id || $sasset == item.id) ? "item focus" : "item"} >
                            <img src={item.src} alt={item.id}>
                        </button>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>

<style>

    ::-webkit-scrollbar {
        width: 0;  /* Remove scrollbar space */
        background: transparent;  /* Optional: just make scrollbar invisible */
    }
    /* Optional: show position indicator in red */
  

    #tools{
        position: absolute;
        top: 0;
        left: 0;
        width: 125px;
        height: 100vh;
        background-color: #10151eeb;
    }

    #tools.expand{
        width: 370px;
    }

    

    #tools:not(.expand) .grid-wrapper .grid{
    }

    #tools:not(.expand) #toggle img{
        transform: rotate(0deg);
    }

    #toggle{
        position: absolute;
        top: 0;
        left: 100%;
        background: #10151eeb;
        width: 60px;
        height: 60px;
        cursor: pointer;
        border: 0;
        padding: 10px;

        border-radius: 0px 0px 10px 0px;

    }

    #toggle img{
        width: 100%;
        height: auto;
        transform: rotate(180deg);
        transition: 0.6s ease-in-out;
        filter: invert(1);
    }

    .scroll-wrapper {
        overflow: auto;
        height: inherit;
    }

    .grid-wrapper h3{
        color: white;
        text-transform: capitalize;
        margin: 10px;
    }

    .grid-wrapper .grid{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, 50px);
        padding: 10px;
        grid-gap: 5px;
        box-sizing: border-box;
    }


    #tools.expand .grid-wrapper .grid{
        grid-template-columns: repeat(auto-fill, 80px);
        grid-gap: 10px;
    }

    .grid-wrapper .grid .item{
        align-items: center;
        display: flex;
        justify-content: center;
        background: #090f1a;
        border-radius: 10px;
        min-height: 50px;
        max-width: 50px;
        border: 0;
        overflow: hidden;
    }

    #tools.expand .grid-wrapper .grid .item{
        min-height: 80px;
        max-width: 80px;
    }

    .grid-wrapper .grid .item:hover, .grid-wrapper .grid .item.focus{
        background: #ab7f18c7;
        cursor: pointer;
    }


    .grid-wrapper .grid .item img{
        width: 50px;
        height: auto;
        padding: 5px;
        box-sizing: border-box;
    }

    #tools.expand .grid-wrapper .grid .item img{
        width: 80px;
        padding: 10px;
    }

</style>