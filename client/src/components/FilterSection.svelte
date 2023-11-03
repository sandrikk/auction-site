<!-- FilterSection.svelte -->
<script>
    import Filter from "./Filter.svelte";
    import Loading from "./Loading.svelte";

    async function getFilterValues() {
        const response = await fetch('http://localhost:3000/books');
        if (response.ok) {
            const allBooks = await response.json();
            return {
                categories: [...new Set(allBooks.map(book => book.category))],
                languages: [...new Set(allBooks.map(book => book.language))],
                covers: [...new Set(allBooks.map(book => book.cover))]
            };
        }
        throw {error: 'Error fetching filter values.'};
    }
</script>

{#await getFilterValues()}
    <Loading />
{:then filters}

<div class="filter-section">
    <Filter title="Category" options={filters.categories} />
    <Filter title="Language" options={filters.languages} />
    <Filter title="Cover" options={filters.covers} />
</div>
{:catch error}
    <p>{error}</p>
{/await}
<style>
    label {
        display: block;
    }

</style>


