<script>
    import {onMount} from "svelte";

    let book = [];

    onMount(async () => {
        // Fetch the JSON data from your books.json file
        const response = await fetch('http://localhost:3000/books/id');
        if (response.ok) {
            // Parse the JSON data and assign it to the 'books' variable
            book = await response.json();
        }
    });
</script>