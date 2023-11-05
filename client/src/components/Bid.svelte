<!-- Bid.svelte -->
<script>
    export let bid;
</script>

<div class="bid">
    <p>{bid.username} placed a bid of €{bid.amount} on {bid.date}</p>
</div>
