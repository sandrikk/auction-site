<script>
    import Slider from "../components/Slider.svelte";
    import Loading from "../components/Loading.svelte";
    import {onDestroy} from "svelte";
    import {tokenStore} from "../stores/tokenStore.js";
    import hammer from '../assets/hammer.gif'
    import BookDescription from "../components/BookDescription.svelte";
    import Bidding from "../components/Bidding.svelte";

    let timeToStart = ""; // Variable to store time until the auction starts
    let timeToEnd = "";
    let highestBid = null;
    let showSuccessIcon = false;
    let errorMessage = "";
    let amount = "";

    export let params;

    async function getBookByIsbn() {

        const response = await fetch('http://localhost:3000/books/' + params.isbn);
        if (response.ok) {
            // Parse the JSON data and assign it to the 'book' variable
            const book = await response.json();
            findHighestBid(book);
            intervalId = setInterval(() => updateTimeRemaining(book), 1000);
            return book;
        } else {
            throw { error: 'Something went wrong!' };
        }

    }

    export const handleSubmit = async () => {
        try {
            console.log(amount);
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
                console.log('Successful');
                showSuccessIcon = true;
                setTimeout(() => showSuccessIcon = false, 3000); // Hide after 3 seconds
                //router("/")

            } else {
                errorMessage = (await response.json()).error;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    function findHighestBid(book) {
        if (book && book.bids) {
            const bids = book.bids.map(bid => Number(bid.amount));
            highestBid = Math.max(...bids);
        }
    }

    // Function to calculate and update time remaining
    function updateTimeRemaining(book) {
        const now = new Date();
        const startTime = new Date(book.startTime);
        const endTime = new Date(book.endTime);

        const startDiff = startTime - now;
        const endDiff = endTime - now;

        if (startDiff > 0) {
            // Auction hasn't started yet
            const startDays = Math.floor(startDiff / (1000 * 60 * 60 * 24));
            const startHours = Math.floor((startDiff / (1000 * 60 * 60)) % 24);
            const startMinutes = Math.floor((startDiff / 1000 / 60) % 60);
            const startSeconds = Math.floor((startDiff / 1000) % 60);

            timeToStart = `${startDays}d ${startHours}h ${startMinutes}m ${startSeconds}s`;
            timeToEnd = "Auction hasn't started";
        } else if (endDiff > 0) {
            // Auction is ongoing
            const endDays = Math.floor(endDiff / (1000 * 60 * 60 * 24));
            const endHours = Math.floor((endDiff / (1000 * 60 * 60)) % 24);
            const endMinutes = Math.floor((endDiff / 1000 / 60) % 60);
            const endSeconds = Math.floor((endDiff / 1000) % 60);

            timeToStart = "Auction has started";
            timeToEnd = `${endDays}d ${endHours}h ${endMinutes}m ${endSeconds}s`;
        } else {
            // Auction has ended
            timeToStart = "Auction has ended";
            timeToEnd = "Auction has ended";
        }
    }


    // Update time remaining every second
    let intervalId;

    // Clean up the interval when the component is destroyed
    onDestroy(() => {
        clearInterval(intervalId);
    });

</script>

{#await getBookByIsbn()}
    <Loading />
{:then book}
    <div class="book-layout">
        <Slider {book}/>

        <BookDescription {book}/>

        <Bidding bind:amount
                {book}
                {timeToStart}
                {timeToEnd}
                {highestBid}
                {handleSubmit}
                {errorMessage}
        />

    </div>

    {#if showSuccessIcon}
        <img src={hammer} alt="animation" class="animation" />
    {/if}
{:catch error}
    <p>Error: {error}</p>
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

</style>
