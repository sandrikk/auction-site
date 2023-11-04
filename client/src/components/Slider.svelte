<!-- Slider.svelte -->
<script>
    export let book;
    let slideIndex = 0;

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

<div class="image-slider">
    {#each book.images as image, i (image)}
        <div class="mySlides fade" class:index={i} style="display: {i === slideIndex ? 'block' : 'none'}">
            <img src={image} class="book-image">
        </div>
    {/each}
    <a class="prev" on:click={prevSlide}>&#10094;</a>
    <a class="next" on:click={nextSlide}>&#10095;</a>
</div>

<style>

    .image-slider {
        width: 25%;
        position: relative;
        display: flex;
        justify-content: center;
    }

    .mySlides {
        display: none;
    }

    .book-image {
        width: 300px;
        height: 400px;
        margin: 0 auto;
    }

    .prev, .next {
        position: absolute;
        top: 200px;
        transform: translateY(-50%);
        font-size: 24px;
        cursor: pointer;
        padding: 8px 16px;
        background-color: var(--details);
        color: var(--bg-primary);
        border: none;
    }

    .prev:hover, .next:hover {
        background-color: var(--details-hover);
    }

    .prev {
        left: 0;
    }

    .next {
        right: 0;
    }
</style>