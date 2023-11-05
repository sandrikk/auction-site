<script>
    import Slider from "../components/Slider.svelte";
    import Loading from "../components/Loading.svelte";
    import {tokenStore} from "../stores/tokenStore.js";
    import hammer from '../assets/hammer.gif'
    import BookDescription from "../components/BookDescription.svelte";
    import Bidding from "../components/Bidding.svelte";

    let highestBid = null;
    let showSuccessIcon = false;
    let errorMessage = "";
    let amount = "";

    export let params;

    async function getBookByIsbn() {

        const response = await fetch('http://localhost:3000/books/' + params.isbn);
        if (response.ok) {
            const book = await response.json();
            findHighestBid(book);
            return book;
        } else {
            throw {message: 'Cannot get the book'};
        }

    }

    export const handleSubmit = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            if ($tokenStore) {
                headers.Authorization = $tokenStore;
            }
            const response = await fetch('http://localhost:3000/books/' + params.isbn + '/bids', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({amount}),
            });

            if (response.status === 201) {
                showSuccessIcon = true;
                setTimeout(() => showSuccessIcon = false, 3000); // Hide after 3 seconds
            } else {
                errorMessage = (await response.json()).error;
            }
        } catch (error) {
            errorMessage = 'An error occurred';
        }
    };

    function findHighestBid(book) {
        if (!book || !book.bids || book.bids.length === 0) {
            return null;
        } else {
            const bids = book.bids.map(bid => Number(bid.amount));
            highestBid = Math.max(...bids);
        }
    }

</script>

{#await getBookByIsbn()}
    <Loading />
{:then book}
    <div class="book-layout">
        <Slider {book}/>

        <BookDescription {book}/>

        <Bidding
                bind:amount
                {book}
                {highestBid}
                {handleSubmit}
                {errorMessage}
        />

    </div>

    {#if showSuccessIcon}
        <img src={hammer} alt="animation" class="animation" />
    {/if}
{:catch error}
    <p>Error!! {error.message}</p>
{/await}

<style>
    .book-layout {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        width: 100%;
        gap: 1rem;
    }

    h1, h2 {
        margin: 0;
    }

    .animation {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
        width: 200px;
        height: auto;
        pointer-events: none;
    }

    @media (max-width: 1150px) {
        .book-layout {
            flex-direction: column;
        }
    }
</style>
