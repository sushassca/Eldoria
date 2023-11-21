<script>
    import { resetGrid } from '@/stores/reset'


    function reset() {
        resetGrid.set(Math.random());
    }

</script>



<button on:click={()=> { window.localStorage.removeItem("block"); reset()}} id="reset">💣 RESET </button>

<style>
#reset {
    position: fixed;
    bottom: 20px;
    left: 20px;
    border-radius: 5px;
    border: 0px solid white;
    padding: 10px 20px 10px 10px;
    background: #100f1c;
    color: #fcfbff;
    transition: 0.3s ease-in-out;
}

#reset:hover {
    background: #e3284be5;
    cursor: pointer;
}
</style>
