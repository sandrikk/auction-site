<!-- BookDescription.svelte -->
<script>
    export let book;
</script>

<div class="book-description">
    <a class="go-back-link" href="/books">Go back</a>
    <h1>{book.title}</h1>
    <h2>{book.author}</h2>
    <p><strong>Category:</strong> {book.category}</p>
    <p><strong>Language:</strong> {book.language}</p>
    <p><strong>Cover:</strong> {book.cover}</p>
    <p><strong>Publisher:</strong> {book.publisher}</p>
    <p><strong>Number of Pages:</strong> {book.numberOfPages}</p>
    <p><strong>Release Date:</strong> {book.releaseDate}</p>
</div>

<style>
    .book-description {
        width: 50%;
    }

    h1, h2 {
        margin: 0;
    }

    .go-back-link {
        color: var(--details);
        text-decoration: underline;
    }
</style>
