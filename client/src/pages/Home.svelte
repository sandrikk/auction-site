<script>
    import RandomSVGs from '../components/RandomSVGs.svelte';
    import image from '../assets/book.png'
    import arrow from '../assets/arrow.png'
    import {onDestroy, onMount} from "svelte";

    let scale = 1;
    let rotate = 10;

    function updateTransform(scrollY) {
        scale = 1 + scrollY / 1000;
        rotate = Math.max(10 - scrollY / 100, 0);
    }


    $: if (typeof window !== "undefined") {
        window.onscroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            updateTransform(scrollY);
        };
    }

    onMount(() => {
        document.body.classList.add('homepage');
    });

    onDestroy(() => {
        document.body.classList.remove('homepage');
    });
</script>

<RandomSVGs />

<div class="homepage-wrapper">
    <h1 class="heading">
        Bid for your bookshelf favorites.
    </h1>
    <div class="image-wrapper">
        <img src={image} alt="image" class="image" style={`transform: rotate(${rotate}deg) scale(${scale});`} />
    </div>

    <div class="bid-now">
        <img src={arrow} alt="arrow" class="arrow"/>
        <a href="/books">Bid now</a>
    </div>
</div>


<style>
    .homepage-wrapper {
        width: 100%;
    }
    .image-wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-direction: column;
        height: 80vh;
    }

    .image {
        width: 30%;
        transition: transform 0.3s ease-out;
    }

    .heading {

        font-size: 4em;
        color: red;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 1.8px;
        font-weight: 700;
    }

    .bid-now {
        margin: 5rem 0 5rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .bid-now a {
        text-transform: uppercase;
        background: var(--details);
        width: 50%;
        padding: 10px 15px;
        border: 0;
        color: var(--bg-primary);
        font-size: 14px;
        font-weight: bold;
        text-align: center;
    }

    .bid-now a:hover {
        background: var(--details-hover);
        border: 0;
    }

    .arrow {
        width: 70vh;
    }

    @media (max-width: 550px) {
        .image-wrapper {
            height: 50vh;
        }
        .image {
            width: 50%;
        }
        .heading {
            font-size: 2.5em;
        }
    }
</style>