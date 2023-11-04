<!-- Book.svelte -->
<script>
    export let bookData;
    export let mode;
</script>

{#if mode === 'detail'}
    <!-- bookdetail -->
    <div class="book-detail">
        <h1>{bookData.title}</h1>
        <h2>{bookData.author}</h2>
        <p><strong>Category:</strong> {bookData.category}</p>
        <p><strong>Language:</strong> {bookData.language}</p>
        <p><strong>Cover:</strong> {bookData.cover}</p>
        <p><strong>Publisher:</strong> {bookData.publisher}</p>
        <p><strong>Number of Pages:</strong> {bookData.numberOfPages}</p>
        <p><strong>Release Date:</strong> {bookData.releaseDate}</p>
    </div>
{:else if mode === 'list'}
    <!-- booklist -->
    <div class="book-list">
        <div class="image-container">
            <img src="{bookData.images[0]}" alt="{bookData.title} cover">
        </div>
        <h1>{bookData.title}</h1>
        <h2>{bookData.author}</h2>
    </div>
{/if}

<style>
    /* bookdetail */
    .book-detail h1, .book-detail h2 {
        margin: 0;
    }

    /* booklist */
    .book-list h1 {
        font-size: 18px;
    }

    .book-list h2 {
        font-size: 16px;
    }

    .book-list h1, .book-list h2 {
        margin: 7px 0 5px;
    }

    .book-list .image-container img {
        width: 200px;
        height: 300px;
        object-fit: cover;
        transition: transform 0.3s;
    }

    .book-list .image-container img:hover {
        transform: scale(0.9);
    }
</style>
