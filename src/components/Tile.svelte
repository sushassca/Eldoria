<script>

import { assetToBuild } from '@/stores/building'
import {floors, assets, buildings} from "@/tiles";
import { onMount } from 'svelte';

export let data
export let index
export let size
export let floor
export let asset


const getRandomItem = (items, threshold) => {

  const itemArray = Object.values(items);
  const totalProbability = itemArray.reduce((sum, item) => sum + item.probability, 0);

  // Adjust the total probability based on the threshold
  const adjustedTotalProbability = totalProbability + threshold;

  let randomValue = Math.random() * adjustedTotalProbability;

  for (const item of itemArray) {
    randomValue -= item.probability;
    if (randomValue <= 0) {
      return item;
    }
  }

  // If no item is selected, return null or handle accordingly
  return null;
}

const getStyles = (styles) => {

    if (!styles) return ""

    return Object.keys(styles)
      .map((key) => `${key}: ${styles[key]};`)
      .join(' ');
}

const updateStorage = (__tile) => {
    const [x,y] = data
    const storage = window.localStorage.getItem('block')
    if (storage) {
        const OBJ = JSON.parse(storage)
        OBJ.map[x][y] = __tile
        window.localStorage.setItem('block', JSON.stringify(OBJ))
    }
}

const handleClick = () => {
    assetToBuild.subscribe((value) => {
        assetComponent = newAssets?.[value]
        const newTile = { f: drawFloor?.id || null , a: assetComponent?.id || null}
        updateStorage(newTile)
    })
}



const newAssets = {...assets, ...buildings}

const drawFloor = (floor) ? floors?.[floor] || getRandomItem(floors , 0) : floor
const drawAsset = (asset) ? newAssets?.[asset] || getRandomItem(newAssets , 50) : asset


onMount(() => {
    const newTile = { f: drawFloor?.id || null , a: drawAsset?.id || null}
    updateStorage(newTile)
})


$: floorComponent = drawFloor
$: assetComponent = drawAsset

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={handleClick}  class="tile" data-tile={data} style={`z-index: ${index}; --tile-size: ${size}px;`}>

    <!-- FLOOR -->
    {#if (floorComponent)}
        <div class={`floor ${floorComponent.class || ""}`}>
            <img alt={""} src={floorComponent.src}>
        </div>
    {/if}

    <!-- ASSETS -->
    {#if (assetComponent && !floorComponent.preventAsset)}
        <div style={getStyles(assetComponent.style)} class={`asset ${assetComponent.class || ""}`}>
            <img alt={""} src={assetComponent.src} >
        </div>
    {/if}

</div>

<style>
.tile {
    top: 0;
    left: 0;
    width: var(--tile-size);
    height: var(--tile-size);
    background-color: rgb(131, 172, 63);
    position: relative;
    transition: 0.3s ease-in-out;
}

.tile:hover {
    top: -30px;
    left: 30px;
    cursor: pointer;
    animation: none;

}

.tile:hover .floor {
    box-shadow: inset 0px 0px 17px 10px #ab3820a8;
    box-sizing: border-box;
    transition: 0.1s ease-out;
    
}


.tile:not(:hover) .floor img {
    animation-play-state: paused;
}

.tile:not(:hover) .floor{
    
    transition-delay: 300ms; 
}




.tile::before {
    content: "";
    width: 100%;
    height: 30px;
    display: inline-flex;
    background-color: rgb(131, 172, 63);
    transform: rotateZ(90deg) skewX(45deg);
    position: absolute;
    z-index: 2;
    top: 50%;
    left: calc(-50% - 15px)
}

.tile::after {
    content: "";
    width: 100%;
    height: 30px;
    display: inline-flex;
    background-color: rgb(32, 27, 27);
    transform: rotateZ(0deg) skewX(-45deg);
    position: absolute;
    z-index: 2;
    top: 100%;
    left: -15px;
}

div {
    width: 100%;
    height: 100%;
    position: absolute;
}

div img {
    pointer-events: none;
}

.floor {
    overflow: hidden;
    box-shadow: inset 0px 0px 17px 10px transparent;
    transition: 0.3s ease-out;
}

.floor img {
    width: 100%;
    height: 165%;
    top: 55%;
    position: absolute;
    transform: translate(0%, -50%) rotateZ(45deg) scale(1.5);
    left: -5%;
    z-index: -1;
}

.square img {
    width: 100%;
    height: 100%;
    top: 50%;
    position: absolute;
    transform: translate(0%, -50%) rotateZ(0deg) scale(1);
    left: 0%;
}

.square.xl img {
    transform: translate(0%, -50%) rotateZ(0deg) scale(2);
}

.floor-xl img {
    transform: translate(0%, -50%) rotateZ(45deg) scale(2.2);
}

.asset {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(45deg) translate(calc(-100% - 5px), -50%) skewY(0deg) skewX(0deg) scale(.8);
    left: 50%;
    top: 50%;
    z-index: 9999999999;
    transform-origin: center;
    height: 200%;
    display: flex;
    justify-content: center;
}

.asset img {
    width: inherit;
    position: relative;
}

div.m img {
    transform: scale(0.7);
    bottom: 5%;
}

div.xl img {
    transform: scale(1.5);
    bottom: 20%;
}

div.xxl img {
    transform: scale(2);
    bottom: 40%;
}
</style>
