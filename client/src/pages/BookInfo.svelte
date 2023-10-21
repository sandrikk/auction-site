<script>
    let book = null;
    let slideIndex = 0;

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

    function nextSlide() {
        if (book && book.images) {
            slideIndex = (slideIndex + 1) % book.images.length;
        }
    }

    function prevSlide() {
        if (book && book.images) {
            slideIndex = (slideIndex - 1 + book.images.length) % book.images.length;
        }
    }
</script>

{#await getBookByIsbn()}
    <p>Loading...</p>
{:then}
    <div class="book-layout">
        <div class="image-slider">
            {#each book.images as image, i (image)}
                <div class="mySlides fade" class:index={i} style="display: {i === slideIndex ? 'block' : 'none'}">
                    <img src={image} class="book-image">
                </div>
            {/each}
            <a class="prev" on:click={prevSlide}>&#10094;</a>
            <a class="next" on:click={nextSlide}>&#10095;</a>
        </div>
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
        align-items: center;
        padding: 20px;
    }

    .image-slider {
        width: 50%;
        position: relative;
    }

    .mySlides {
        display: none;
    }

    .book-image {
        width: 300px;
        height: 400px;
    }

    .prev, .next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 24px;
        cursor: pointer;
        padding: 8px 16px;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        border: none;
    }

    .prev {
        left: 0;
    }

    .next {
        right: 0;
    }

    .book-description {
        width: 40%;
    }

    h1, h2 {
        margin: 0;
    }
</style>
