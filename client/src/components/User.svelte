<!-- User.svelte -->
<script>
    export let user;
</script>

<div class="user">
    <h1>{user.email}</h1>
</div>

<style>
    h1 {
        font-size: 1.5em;
    }

    @media (max-width: 550px) {
        h1 {
            font-size: 1em;
        }
    }
</style>
