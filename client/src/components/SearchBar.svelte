<!-- SearchBar.svelte -->
<script>
    export let searchTerm = "";

</script>

<input class="searchbar" bind:value={searchTerm} type="text" placeholder="Search for books...">

<style>
    .searchbar {
        width: 100%;
        padding: 10px;
        margin-bottom: 1rem;
        border: none;
        border-radius: 5px;
        outline: none;
        color: var(--bg-primary);

    }

    /* Style for the input field when it's focused */
    input[type="text"]:focus {
        border-color: #007bff; /* Change the border color on focus */
    }
</style>