<!-- FilterSection.svelte -->
<script>
    import Filter from "./Filter.svelte";
</script>

<div class="filter-section">
    <!-- Language Filter -->
    <Filter title="Category" options={["Arts & Photography", "Biographies & Memoirs", "Business & Careers", "Calendars, Diaries & Annuals", "Children's Books", "Comics & Graphic Novels", "Computing & Internet"]} />
    <Filter title="Language" options={["English", "Spanish", "German", "Dutch"]} />
    <Filter title="Cover" options={["Hardcover", "Paperback", "Board book", "Large print"]} />


</div>

<style>
    label {
        display: block;
    }

</style>


