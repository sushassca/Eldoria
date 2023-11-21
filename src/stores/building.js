import { writable } from "svelte/store";

export let assetToBuild = writable("")


export const updateAsset = (data) => {
    assetToBuild = writable(data)
}