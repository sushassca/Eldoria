<script>
// @ts-nocheck

import {
    config
} from '@/constants/config.js'

import {
    onMount
} from 'svelte';


import { resetGrid } from '@/stores/reset'
import Tile from './Tile.svelte'

import { forest } from '@/constants/terrains/forest';

let loaded = false
$: blockGrid = {}


// FUNCTIONS

const getBlock = (startCoords, endCoords) => {
  const [x1, x2] = startCoords;
  const [y1, y2] = endCoords;
  const block = [];

  for (let i = x1; i <= x2; i++) {
    const row = forest.map[i].slice(y1, y2 + 1);
    block.push(row);
  }

  return block;
};

function blockGridData(__block) {
    const [x, y]= __block.coords

    const maxRow = x[1] - x[0] 
    const maxCol = y[1] - y[0] 

    // Add 1 to the max values to get the actual number of rows and columns
    const rows = Array.from({ length: maxRow + 1 }, (_, index) => index);
    const cols = Array.from({ length: maxCol + 1 }, (_, index) => index);

    return { map: __block.map, rows, cols };
}

function updateMAP(__loadOBJ) {
    blockGrid =  blockGridData(__loadOBJ)
}



const [fx, fy] =  forest.coords

const maxX1 = fx[0]
const maxX2 = fx[1]
const maxY1 = fy[0]
const maxY2 = fy[1]

let x1 = 1
let x2 = 4

let y1 = 5
let y2 = 9

let coords = [[x1, x2], [y1, y2]]


const moveDown = (distance) =>{
     if (x2 < maxY2) {
        x1 = x1 + distance
        x2 = x2 + distance
        move()
     }
}

const moveUp = (distance) =>{
    if (x1 > 0) {
        x1 = x1 - distance
        x2 = x2 - distance
        move()
    }
}

const moveRight= (distance) =>{
    if (y2 < maxX2) {
        y1 = y1 + distance
        y2 = y2 + distance
        move()
    }
}

const moveLeft = (distance) =>{
    if (y1 > 0) {
        y1 = y1 - distance
        y2 = y2 - distance
        move()
    }
}


const move = () =>{
    generateTiles([[x1, x2], [y1, y2]])
}


const generateBlock = (coords) =>{
    const [x, y] = coords

    const viewX =  x[1] - x[0]
    const viewY =  y[1] - y[0] 

    return {
      title: "Sample Grid",
      coords: [[0, viewX], [0, viewY]],
      map: getBlock(x, y)
    }
}

const generateTiles = (__coords) => {
    loaded = false
    const loadOBJ = generateBlock(__coords);
    blockGrid = blockGridData(loadOBJ);
    setTimeout(() => {
        loaded = true
        window.localStorage.setItem('block', JSON.stringify(loadOBJ));
    }, 0);
}

const handleKeyPress = (event) => {
        if (event.key === 'ArrowUp') {
            moveUp(1)
        } 
        if (event.key === 'ArrowDown') {
            moveDown(1)
        }
        if (event.key === 'ArrowRight') {
            moveRight(1)
        }
        if (event.key === 'ArrowLeft') {
            moveLeft(1)
        }
    } 

resetGrid.subscribe((value) => {
    if (value) {
        generateTiles(coords)
    }
});



onMount(() => {
    const history = window.localStorage.getItem('block')

    const loadOBJ = history ? JSON.parse(history) : generateBlock(coords)

    updateMAP(loadOBJ)
    
    if (!history) {
        window.localStorage.setItem('block', JSON.stringify(loadOBJ))
    }
    loaded = true



    

})

</script>

{#if loaded && blockGrid}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div on:keydown={handleKeyPress} tabindex="0" autofocus="true" id="grid-container" style={
        `grid-template-columns:repeat(${blockGrid.cols.length}, ${config.container.w / blockGrid.cols.length}px);
        --grid-gap: ${config.tiles.gap}px;`
        }>
        {#each blockGrid.rows as row}
            {#each blockGrid.cols as col}
               {#if (blockGrid.map[row][col])}
                <Tile 
                    floor={blockGrid.map[row][col]?.f} 
                    asset={blockGrid.map[row][col]?.a} 
                    data={[row,col]} 
                    index={blockGrid.map[row].length - col} 
                    size={config.container.w / blockGrid.cols.length}
                />
               {/if}
            {/each}
        {/each}
    </div>
{/if}

<style>
#grid-container {
    width: var(--container-width);
    height: var(--container-height);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotateX(60deg) rotateY(0deg) rotateZ(-45deg)
        /**/
    ;
    display: grid;
    grid-auto-rows: var(--tile-size);
    gap: var(--grid-gap);
}
</style>
