<script>
    import Slider from "../components/Slider.svelte";
    import Loading from "../components/Loading.svelte";
    import {onDestroy} from "svelte";
    import Button from "../components/Button.svelte";
    import {tokenStore} from "../stores/tokenStore.js";
    import router from "page";

    let highestBid = null;
    let amount = null;
    let username = null;
    let errorMessage = "";
    let timeToStart = ""; // Variable to store time until the auction starts
    let timeToEnd = "";

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

    const handleSubmit = async () => {
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
                console.log('Successful');
                router("/")

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
            <p>Starts in: {timeToStart}</p>
            <p>Ends in: {timeToEnd}</p>
            <p>Current bid: <span>{highestBid ? `€${highestBid}` : 'No bids yet'}</span></p>
            <form on:submit|preventDefault={handleSubmit}>
                <input name="bid" inputmode="numeric" pattern="[0-9]*" id="textField100" type="text" bind:value={amount}>
                <p>{errorMessage}</p>
                <Button text="Place a bid" type="submit" />
            </form>

            {#each book.bids as bid, i (bid)}
                <p>{bid.username} did place bid with amount {bid.amount}€ at {bid.date}</p>
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
