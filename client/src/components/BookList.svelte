<!-- BookList.svelte -->
<script>
    import {filterStore} from "../stores/filterStore.js";
    import Loading from "./Loading.svelte";
    import Book from "./Book.svelte";

    export let searchTerm;

    async function getBooks(category, language, cover) {

        let query = '';

        let queryOptions = [];

        if (category) {
            queryOptions.push('category=' + category);
        }

        if (language) {
            queryOptions.push('language=' + language);
        }

        if (cover) {
            queryOptions.push('cover=' + cover);
        }

        if (queryOptions.length !== 0) {
            query = '?' + queryOptions.join('&');
        }

        const response = await fetch('http://localhost:3000/books' + query);
        if (response.ok) {
            return response.json();
        }

        throw {error: 'Something went wrong!'}
    }

</script>

{#await getBooks($filterStore.category, $filterStore.language, $filterStore.cover)}
    <Loading />
{:then books}
    <div class="book-list">
        {#each books as book (book.isbn)}
            {#if book.title.toLowerCase().includes(searchTerm.toLowerCase())}
                <a href={`/bookInfo/${book.isbn}`}>
                    <div class="book">
                        <Book bookData={book} mode="list" />
                    </div>
                </a>
            {/if}
        {/each}
    </div>
{:catch error}
    <p>Error!! {error}</p>
{/await}

<style>
    .book-list {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        color: black;
    }

    .book {
        max-width: 200px;
    }

    .book h1 {
        font-size: 18px;
    }

    .book h2 {
        font-size: 16px;
    }

    .book h1, h2 {
        margin: 7px 0 5px;
    }

    .book img {
        width: 200px;
        height: 300px;
        object-fit: cover;
        transition: transform 0.3s;
    }

    .book img:hover {
        transform: scale(0.9);
    }



    @media (max-width: 850px) {
        .book-list {
            justify-content: center;
        }
    }
</style>
