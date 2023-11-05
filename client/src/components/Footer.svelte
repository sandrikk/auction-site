<!-- Footer.svelte -->
<script>
    import {tokenStore} from "../stores/tokenStore.js";

    export let active;
</script>


<a href="/">
    <img src="../src/assets/logo-black-no-background.png" alt="logo" class="logo-footer">
</a>

<p class="author">
    © 2023 <a href="mailto:krevovasandra@gmail.com">Sandra Krevova, </a> All Rights Reserved ofc
</p>

<nav class="navigation">
    <ul class="menu menu-footer">
        <li><a class:active={active === "/books"} href="/books">Books</a></li>
        <li><a class:active={active === "/users"} href="/users">Users</a></li>
        {#if $tokenStore}
            <li><a class:active={active === "/users/me/won"} href="/users/me/won">Won Bids</a></li>
        {:else}
            <li><a class="login" class:active={active === "/login"} href="/login">Login</a></li>
        {/if}
    </ul>
</nav>


<style>
    a {
        color: var(--bg-primary);
    }

    .menu-footer {
        display: flex;
        gap: 1rem;
    }

    .logo-footer {
        width: 7rem;
    }

    .author {
        text-align: center;
    }

</style>