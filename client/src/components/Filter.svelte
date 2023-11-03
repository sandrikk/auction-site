
<!-- Filter.svelte -->
<script>
    import {filterStore} from "../stores/filterStore.js";

    export let title;
    export let options;


    function handleCheckboxClick(event, category) {
        if (event.target.checked) {
            $filterStore[title.toLowerCase()] = category;
        } else {
            $filterStore[title.toLowerCase()] = '';
        }
    }

</script>

<label class="filter-label">{title}:</label>
<div class="filter-checkboxes">

    {#each options as option}
        <label>
            <input type="checkbox" on:click={(event) => handleCheckboxClick(event, option)} />
            {option}
        </label>
    {/each}

</div>

<style>
label {
    display: block;
}

.filter-label {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
}
</style>

