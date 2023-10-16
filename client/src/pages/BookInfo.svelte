<script>

    import Book from "../components/Book.svelte";

    export let params;

    async function getBookByIsbn() {
        // Fetch the JSON data from your books.json file
        const response = await fetch('http://localhost:3000/books/' + params.isbn);
        if (response.ok) {
            // Parse the JSON data and assign it to the 'books' variable
            return response.json();
        }

        throw {error: 'Something went wrong!'}
    }

</script>

<!--<Book />-->

{#await getBookByIsbn()}
    <p>Loading...</p>
{:then book}
    <div class="book">
        <div class="image-container">
            <img src="{book.image}" alt="book-image">
        </div>
        <h1>{book.title}</h1>
        <h2>{book.author}</h2>
    </div>
{:catch error}
    <p>Error!! {error}</p>
{/await}

<style>
    img {
        max-width: 300px;
    }
</style>