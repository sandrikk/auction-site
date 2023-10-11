<script>

    async function getUsers() {
        // Fetch the JSON data from your books.json file
        const response = await fetch('http://localhost:3000/users/');
        if (response.ok) {
            // Parse the JSON data and assign it to the 'books' variable
            return response.json();
        }

        throw {error: 'Something went wrong!'}
    }

</script>

{#await getUsers()}
    <p>Loading...</p>
{:then users}
    <div class="user-list">
        {#each users as user (user.id)}
            <div class="user">
                <div class="image-container">
                    <img src="{user.image}" alt="book-image">
                </div>
                <h1>{user.username}</h1>
            </div>
        {/each}
    </div>
{:catch error}
    <p>Error!! {error}</p>
{/await}