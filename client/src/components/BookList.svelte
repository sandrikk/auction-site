<script>
    export let searchTerm;

    async function getBooks() {
        // Fetch the JSON data from your books.json file
        const response = await fetch('http://localhost:3000/books/');
        if (response.ok) {
            // Parse the JSON data and assign it to the 'books' variable
            return response.json();
        }

        throw {error: 'Something went wrong!'}
    }

</script>

{#await getBooks()}
    <p>Loading...</p>
{:then books}
    <div class="book-list">
        {#if searchTerm === ""}
            {#each books as book (book.isbn)}
                    <a href={`/bookInfo/${book.isbn}`}>
                            <div class="book">
                                <div class="image-container">
                                    <img src="{book.image}" alt="book-image">
                                </div>
                                <h1>{book.title}</h1>
                                <h2>{book.author}</h2>
                            </div>
                    </a>
            {/each}

        {:else}
            {#each books as book (book.isbn)}
                {#if book.title.toLowerCase().includes(searchTerm.toLowerCase())}

                    <a href={`/bookInfo/${book.isbn}`}>
                        <div class="book">
                            <div class="image-container">
                                <img src="{book.image}" alt="book-image">
                            </div>
                            <h1>{book.title}</h1>
                            <h2>{book.author}</h2>
                        </div>
                    </a>
                {/if}
            {/each}
        {/if}

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
