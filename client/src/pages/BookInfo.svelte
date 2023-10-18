<script>

    import Book from "../components/Book.svelte";
    import Button from "../components/Button.svelte";
    import {onMount} from "svelte";

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

        <div class="book-layout">
            <div class="image-slider">
                <img src="{book.image}" alt="book-image">
            </div>
            <div class="book-description">
                <h1>{book.title}</h1>
                <h2>{book.author}</h2>
            </div>
            <div class="book-biding">
                <p>Biding</p>
            </div>
        </div>


{:catch error}
    <p>Error!! {error}</p>
{/await}

<style>

    .book-layout {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }


    img {
        max-width: 300px;
        height: auto;
    }

    .thumbnail img{
        max-width: 100px
    }


    /* Slideshow container */
    .slideshow-container {
        max-width: 1000px;
        position: relative;
        margin: auto;
    }

    /* Hide the images by default */
    .mySlides {
        display: none;
    }

    /* Next & previous buttons */
    .prev, .next {
        cursor: pointer;
        position: absolute;
        top: 50%;
        width: auto;
        margin-top: -22px;
        padding: 16px;
        color: white;
        font-weight: bold;
        font-size: 18px;
        transition: 0.6s ease;
        border-radius: 0 3px 3px 0;
        user-select: none;
    }

    /* Position the "next button" to the right */
    .next {
        right: 0;
        border-radius: 3px 0 0 3px;
    }

    /* On hover, add a black background color with a little bit see-through */
    .prev:hover, .next:hover {
        background-color: rgba(0,0,0,0.8);
    }

    /* The dots/bullets/indicators */
    .dot {
        cursor: pointer;
        height: 15px;
        width: 15px;
        margin: 0 2px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        transition: background-color 0.6s ease;
    }

    .active, .dot:hover {
        background-color: #717171;
    }

    /* Fading animation */
    .fade {
        animation-name: fade;
        animation-duration: 1.5s;
    }

    @keyframes fade {
        from {opacity: .4}
        to {opacity: 1}
    }




</style>