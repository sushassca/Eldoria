<script>

let loading = true

let data = []

import { tiles, buildings, enviroment } from "../assets"    
const assets = { ...buildings, ...enviroment }


import { onMount } from "svelte";
import { io } from 'socket.io-client'

import { sfloor, sasset, isToolsOpen, scale } from "../storages/storage"
import Tools from "../components/tools.svelte";

const socket = io()

const fetchData = async () => {
    try {
        const response = await fetch('/api');
        return response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const postData = async (__block) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(__block)
        }

        const response = await fetch('/api', options);
        const data = await response.json();
        socket.emit('action', data)
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// on Mount
onMount(async () => {
    data = await fetchData();

    loops = Array.from({
        length: data.length
    }, (_, index) => index)

    if (socket) {
        socket.on('eventFromServer', (message) => {
            const { row, col, result } = message
            data[row][col] = result
        })
    }

    const upper_container = document.body;
    upper_container.addEventListener("scroll", () => alert("scroll"))

    setTimeout(() => {
        loading = false

       
    }, 600);
});

// reactive
$: loops = Array.from({
    length: 0
}, (_, index) => index)



// handles
const handleClick = (row, col) => {

    if ($isToolsOpen === "false") {
        console.log("Tools Closed! Won't Update!");
        console.log({row, col});
    }



    const block = {
        type: "putBlock",
        row,
        col,
        block: [$sfloor, $sasset]
    }
    postData(block)
}


const getStyles = (styles) => {
    if (!styles) return ""

    return Object.keys(styles)
      .map((key) => `${key}: ${styles[key]};`)
      .join(' ');
}

const handleWheel = (event) =>{

    if (event.deltaY > 0) {
        // Scrolling down
        $scale = String(Number($scale) - 0.1)

    } else if (event.deltaY < 0) {
      // Scrolling up
      $scale = String(Number($scale) + 0.1)
    }
}



</script>


<div on:wheel={handleWheel} style={`grid-template-columns: repeat(1, 1fr);`} class="wrapper center">

    <div id="map" style={`grid-template-columns: repeat(${data?.length}, 1fr); --square-size: ${data?.length}; --scale-factor: ${$scale}`}>
        {#each loops as row}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            {#each loops as col}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div style={`z-index:${(data?.length - col)  + row}`} class={`cell center ${data[row][col][0]} ${assets[data[row][col][1]]?.span || ""}`} on:click={() => {handleClick(row,col)}}> 
                    <div class={`floor ${tiles[data[row][col][0]]?.class || ""}`}>
                        {#if (data[row][col][0])}
                            <div class="overflow-hidden">
                                <img alt={`${tiles[data[row][col][0]]?.label}`} src={`${tiles[data[row][col][0]]?.src}`}>
                            </div>
                        {/if}
                    </div>
                    {#if ( data[row][col][1] && data[row][col][1] != "null" && data[row][col][1] != "reset")}
                        <div class="center">
                            <div class={`asset`}>
                                <img class={assets[data[row][col][1]]?.class} alt={`${assets[data[row][col][1]]?.label}`} src={`${assets[data[row][col][1]]?.src}`}>
                            </div>
                        </div>
                    {/if}
                </div>
            {/each}
        {/each}
    </div>

</div>

<Tools/>
{#if loading === true}
    <div id="loader">

        <img src="/images/spinner.gif" alt="loading" >

    </div>
{/if}

<style>

#loader{
    width: 100vw;
    height: 100vh;
    background-color: #1c273a;
    z-index: 999;
    position: absolute;
    left: 0;
    top: 0;
    display: grid;
    align-items: center;
    justify-content: center;
}


.wrapper {
    height: 100%;
    width: 100%;
}

#map {
    display: grid;
    position: relative;
    transform: translate(0%, 0%) rotateX(60deg) rotateY(0deg) rotateZ(-45deg) scale(var(--scale-factor));
}

.cell {
    aspect-ratio: 1;
    max-width: calc(100vw / var(--square-size));
    max-height: calc(100vw / var(--square-size));
    width: 10rem;
    color: white;
    position: relative;
    bottom: 0;
    left: 0;
    transition: left 0.3s ease-out, bottom 0.3s ease-out;
}

.cell:hover {
    background-color: rgba(207, 172, 17, 0.466);
    bottom: 30px;
    left: 30px;
    cursor: pointer;
    
}

.cell:not(:hover) {
}

.cell div{
    position: absolute;
    width: 100%;
    height: 100%;
}


.cell.span-2{
    grid-row: span 2;
    height: 200%;
    grid-column: span 2;
    width: 200%;
    max-width: -webkit-fill-available;
    max-height: -webkit-fill-available;
}
.cell.d-none{
    display: none;
}

div img {
    pointer-events: none!important;
    user-select: none!important;
}

.floor::before {
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

.floor::after {
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

.floor img {
    width: 100%;
    height: 165%;
    top: 55%;
    position: absolute;
    transform: translate(0%, -50%) rotateZ(45deg) scale(1.5);
    left: -5%;
}


.square img {
    width: 100%;
    height: 100%;
    top: 50%;
    position: absolute;
    transform: translate(0%, -50%) rotateZ(0deg) scale(1);
    left: 0%;
}

.asset {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(45deg)skewY(0deg) skewX(0deg) scale(.6);
    transform-origin: center;
    display: grid;
    justify-content: center;
    height: 200% !important;
    z-index: 1;
}

.asset img{
    width: 100%;
    height: 100%;
    scale: 1;
    transform-origin: bottom;
}



.center {
    display: grid;
    align-items: center;
    justify-items: center;
    align-content: center;
}

.overflow-hidden{
    overflow: hidden;
    background-color: grey;
}




.asset img.s{
    scale: 0.7;
}
.asset img.m{
    scale: 0.8;
}
.asset img.l{
    scale: 1.5;
}

.asset img.ml{
    scale: 2;
}

.asset img.xl{
    scale: 3;
}
.asset img.xxl{
    scale: 4;
}

.to-bottom {
    transform-origin: bottom!important;
}

.to-center {
    transform-origin: center!important;
}

.to-initial {
    transform-origin: initial!important;
}

.l.mv-up{
    position: absolute;
    bottom: 25%;
}

.mv-dw{
    position: absolute;
    bottom: -30%;
}

.mv-up{
    position: absolute;
    bottom: 20%;
}

.mv-up.b-10{
    bottom: 10%;
}

.xxl.mv-up{
    position: absolute;
    bottom: 10%;
}

.stretch{
    width: 160%!important;
    left: -30%!important;
    position: absolute;
}


</style>
