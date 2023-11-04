<!-- Timer.svelte -->
<script>
    import { onDestroy } from 'svelte';

    export let book;

    let timeToStart = "";
    let timeToEnd = "";

    // Function to calculate and update time remaining
    function updateTimeRemaining() {
        const now = new Date();
        const start = new Date(book.startTime);
        const end = new Date(book.endTime);

        const startDiff = start - now;
        const endDiff = end - now;

        if (startDiff > 0) {
            // Auction hasn't started yet
            timeToStart = formatTime(startDiff);
            timeToEnd = "Auction hasn't started";
        } else if (endDiff > 0) {
            // Auction is ongoing
            timeToStart = "Auction has started";
            timeToEnd = formatTime(endDiff);
        } else {
            // Auction has ended
            timeToStart = "Auction has ended";
            timeToEnd = "Auction has ended";
        }
    }

    // Helper function to format the time
    function formatTime(diff) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    // Update time remaining every second
    let intervalId = setInterval(updateTimeRemaining, 1000);

    // Initial update
    updateTimeRemaining();

    // Clean up the interval when the component is destroyed
    onDestroy(() => {
        clearInterval(intervalId);
    });
</script>

<div>
    <p>Time to start: {timeToStart}</p>
    <p>Time to end: {timeToEnd}</p>
</div>
