<!-- Bidding.svelte -->
<script>
    import Button from "./Button.svelte";
    import Timer from "./Timer.svelte";
    export let book;
    export let highestBid;
    export let errorMessage;
    export let amount;
    export let handleSubmit;

</script>

<div class="book-biding">
    <Timer {book} />
    <p>Current bid: <span>{highestBid ? `€${highestBid}` : 'No bids yet'}</span></p>
    <form on:submit|preventDefault={handleSubmit}>
        <input name="bid" inputmode="numeric" pattern="[0-9]*" id="textField100" type="text" bind:value={amount} on:input={(e) => amount = e.target.value}>
        <p>{errorMessage}</p>
        <Button text="Place a bid" type="submit" />
    </form>

    {#if book.bids && book.bids.length > 0}
        {#each book.bids as bid, i (bid)}
            <p>{bid.username} did place a bid with an amount of {bid.amount}€ at {bid.date}</p>
        {/each}
    {/if}
</div>

<style>
    .book-biding {
        width: 25%;
    }

    @media (max-width: 1285px) {
        .book-biding {
            width: 40%;
        }
    }

    @media (max-width: 1150px) {
        .book-biding {
            width: 100%;
        }
    }
</style>
