
<!-- Filter.svelte -->
<script>
    export let title;
    export let options;
</script>

<label class="filter-label">{title}:</label>
<div class="filter-checkboxes">

    {#each options as option}
        <label><input type="checkbox"/>{option}</label>
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

