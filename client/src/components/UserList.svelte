<!-- UserList.svelte -->
<script>

    import {tokenStore} from "../stores/tokenStore.js";

    async function getUsers() {
        const headers = {};
        if ($tokenStore) {
            headers.Authorization = $tokenStore;
        }

        const response = await fetch('http://localhost:3000/users', {
            headers: headers
        });


        if (response.ok) {
            return response.json();
        }

        throw {message: 'Cannot get users. You are not an admin'};
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

<style>
    @media (max-width: 550px) {
        .user h1 {
           font-size: 1em;
       }
    }
</style>