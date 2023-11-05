<!-- UserList.svelte -->
<script>

    import {tokenStore} from "../stores/tokenStore.js";
    import User from "./User.svelte";

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
            <User {user} />
        {/each}
    </div>
{:catch error}
    <p>Error!! {error.message}</p>
{/await}