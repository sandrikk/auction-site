<!-- BookDescription.svelte -->
<script>
    import Book from "./Book.svelte";

    export let book;
</script>

<div class="book-description">
    <a class="go-back-link" href="/books">Go back</a>
    <Book bookData={book} mode="detail" />
</div>

<style>
    .book-description {
        width: 50%;
        margin-left: 1rem;
    }

    h1, h2 {
        margin: 0;
    }

    .go-back-link {
        color: var(--details);
        text-decoration: underline;
    }

    @media (max-width: 1285px) {
        .book-description {
            width: 30%;
        }
    }

    @media (max-width: 1150px) {
        .book-description {
            width: 100%;
        }
    }
</style>
