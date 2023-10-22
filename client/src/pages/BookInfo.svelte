<script>
    import Slider from "../components/Slider.svelte";
    import Loading from "../components/Loading.svelte";
    let book = null;


    export let params;

    async function getBookByIsbn() {

        const response = await fetch('http://localhost:3000/books/' + params.isbn);
        if (response.ok) {
            // Parse the JSON data and assign it to the 'book' variable
            book = await response.json();
        } else {
            throw { error: 'Something went wrong!' };
        }

    }
</script>

{#await getBookByIsbn()}
    <Loading />
{:then}
    <div class="book-layout">
        <Slider {book}/>

        <div class="book-description">
            <h1>{book.title}</h1>
            <h2>{book.author}</h2>
            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Language:</strong> {book.language}</p>
            <p><strong>Cover:</strong> {book.cover}</p>
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>Number of Pages:</strong> {book.numberOfPages}</p>
            <p><strong>Release Date:</strong> {book.releaseDate}</p>
        </div>
        <div class="book-biding">
            <p>Biding</p>
        </div>
    </div>
{:catch error}
    <p>Error: {error}</p>
{/await}

<style>
    .book-layout {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        width: 100%;
        gap: 1rem;
    }

    .book-description {
        width: 50%;
    }

    .book-biding {
        width: 25%;
    }

    h1, h2 {
        margin: 0;
    }
</style>
