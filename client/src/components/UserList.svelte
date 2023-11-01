<script>

    import {tokenStore} from "../stores/tokenStore.js";

    async function getUsers() {
        const headers = {};
        if ($tokenStore) {
            headers.Authorization = $tokenStore;
        }

        // Fetch the JSON data from your books.json file
        const response = await fetch('http://localhost:3000/users', {
            headers: headers
        });

        const respJson = await response.json();

        if (response.ok) {
            // Parse the JSON data and assign it to the 'books' variable
            return respJson;
        }

        throw respJson;
    }

</script>

{#await getUsers()}
    <p>Loading...</p>
{:then users}
    <div class="user-list">
        {#each users as user (user.id)}
            <div class="user">
                <h1>{user.email}</h1>
            </div>
        {/each}
    </div>
{:catch error}
    <p>Error!! {error.message}</p>
{/await}