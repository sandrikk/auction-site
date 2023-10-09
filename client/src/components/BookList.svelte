<script>
    import Book from "./Book.svelte";
    import { onMount } from 'svelte';

    let books = [];

    onMount(async () => {
        // Fetch the JSON data from your books.json file
        const response = await fetch('http://localhost:3000/books');
        if (response.ok) {
            // Parse the JSON data and assign it to the 'books' variable
            books = await response.json();
        }
    });
</script>

<div class="book-list">
    {#each books as book (book.ISBN)}
        <Book bookData={book} />
    {/each}
</div>

<style>
    .book-list {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        color: black;
    }
</style>
