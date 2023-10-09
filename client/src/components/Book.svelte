<script>
    export let bookData;
</script>


<article class="book">
    <h1>{bookData.title}</h1>
    <h2>{bookData.author}</h2>
    <div class="book-details">
        <p>Category: {bookData.category}</p>
        <p>Language: {bookData.language}</p>
        <p>Cover: {bookData.cover}</p>
        <p>Publisher: {bookData.publisher}</p>
        <p>Pages: {bookData.numberOfPages}</p>
        <p>Release date: {bookData.releaseDate}</p>
        <p>Start time: {bookData.startTime}</p>
        <p>End time: {bookData.endTime}</p>

    </div>
</article>

<style>
    .book {
        min-width: 18.75rem;
        min-height: 18.75rem;
        background-color: #fff;
        border-radius: 5px;
    }
</style>