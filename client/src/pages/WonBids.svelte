<script>
    import Loading from "../components/Loading.svelte";
    import {tokenStore} from "../stores/tokenStore.js";

    async function getWonBooks() {
        const headers = {};
        if ($tokenStore) {
            headers.Authorization = $tokenStore;
        }

        // Fetch the JSON data from your books.json file
        const response = await fetch('http://localhost:3000/users/me/won', {
            headers: headers
        });
        if (response.ok) {
            // Parse the JSON data and assign it to the 'books' variable
            return response.json();
        }

        throw {message: 'Cannot get your won bids'};
    }
</script>

{#await getWonBooks()}
    <Loading />
{:then books}

    <div class="book-list">

        {#each books as book (book.isbn)}
            <a href={`/bookInfo/${book.isbn}`}>
                <div class="book">
                    <div class="image-container">
                        <img src="{book.images[0]}" alt="book-image">
                    </div>
                    <h1>{book.title}</h1>
                    <h2>{book.author}</h2>
                </div>
            </a>
        {/each}
    </div>
{:catch error}
    <p>Error!! {error.message}</p>
{/await}

<style>
    .book-list {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        color: black;
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
</style>