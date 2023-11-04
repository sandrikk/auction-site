<!-- Loading.svelte -->
<script>
    import spinner from '../assets/spinner.svg'
</script>

<span class="loading">
    <img src={spinner} alt="spinner">
</span>

<style>
    .loading {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>