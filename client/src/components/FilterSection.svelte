<!-- FilterSection.svelte -->
<script>
    import Filter from "./Filter.svelte";
</script>

<div class="filter-section">
    <!-- Language Filter -->
    <Filter title="Category" options={["Arts", "Fantasy", "Classic Literature", "Children's Books", "Comics", "Novel", "Maps", "Drama"]} />
    <Filter title="Language" options={["English", "Spanish", "German", "French"]} />
    <Filter title="Cover" options={["Hardcover", "Paperback", "Large print"]} />


</div>

<style>
    label {
        display: block;
    }

</style>


