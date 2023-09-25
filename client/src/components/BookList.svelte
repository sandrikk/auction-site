<script>
    import Book from "./Book.svelte";
</script>

<div class="book-list">
    <Book />
    <Book />
    <Book />
    <Book />
    <Book />
</div>

<style>
    .book-list {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }
</style>