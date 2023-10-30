<script>
    import Slider from "../components/Slider.svelte";
    import Loading from "../components/Loading.svelte";
    import {onDestroy} from "svelte";
    import Button from "../components/Button.svelte";
    import {tokenStore} from "../stores/tokenStore.js";
    import router from "page";
    let book = null;
    let highestBid = null;
    let timeRemaining = "";
    let bid = null;


    export let params;

    async function getBookByIsbn() {

        const response = await fetch('http://localhost:3000/books/' + params.isbn);
        if (response.ok) {
            // Parse the JSON data and assign it to the 'book' variable
            book = await response.json();
            findHighestBid();
        } else {
            throw { error: 'Something went wrong!' };
        }

    }

    async function placeBid() {
        const response = await fetch('http://localhost:3000/books/' + params.isbn + '/bids');
        if (response.ok) {
            console.log('Placing bid successful');
        } else {
            throw { error: 'Something went wrong with bid!' };
        }
    }


    function findHighestBid() {
        if (book && book.bids) {
            const bids = book.bids.map(bid => Number(bid.amount));
            highestBid = Math.max(...bids);
        }
    }

    // Function to calculate and update time remaining
    function updateTimeRemaining() {
        const now = new Date();
        const startTime = new Date(book.startTime);
        const timeDiff = startTime - now;

        if (timeDiff > 0) {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
            const seconds = Math.floor((timeDiff / 1000) % 60);

            timeRemaining = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            timeRemaining = "Auction has started";
        }
    }

    // Update time remaining every second
    const intervalId = setInterval(updateTimeRemaining, 1000);

    // Clean up the interval when the component is destroyed
    onDestroy(() => {
        clearInterval(intervalId);
    });

</script>

{#await getBookByIsbn()}
    <Loading />
{:then}
    <div class="book-layout">
        <Slider {book}/>

        <div class="book-description">
            <a class="go-back-link" href="/">Go back</a>
            <h1>{book.title}</h1>
            <h2>{book.author}</h2>
            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Language:</strong> {book.language}</p>
            <p><strong>Cover:</strong> {book.cover}</p>
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>Number of Pages:</strong> {book.numberOfPages}</p>
            <p><strong>Release Date:</strong> {book.releaseDate}</p>
        </div>
        <div class="book-biding">
            <p>Starts in: {timeRemaining}</p>
            <p>Current bid: <span>{highestBid ? `€${highestBid}` : 'No bids yet'}</span></p>
            <form on:submit|preventDefault={placeBid}>
                <input name="bid" inputmode="numeric" pattern="[0-9]*" id="textField100" type="text" bind:value={bid}>
                <Button text="Place a bid" type="submit" />
            </form>

            {#each book.bids as bid, i (bid)}
                <p>{bid.username} did place bid with amount {bid.amount}€ at {bid.time}</p>
            {/each}
        </div>
    </div>
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

    .book-description {
        width: 50%;
    }

    .book-biding {
        width: 25%;
    }

    h1, h2 {
        margin: 0;
    }

    .go-back-link {
        color: var(--details);
        text-decoration: underline;
    }
</style>
