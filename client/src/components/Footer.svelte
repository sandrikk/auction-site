<!-- Footer.svelte -->
<script>
    export let active;
</script>


<a href="/">
    <img src="../src/assets/logo-black-no-background.png" alt="logo" class="logo-footer">
</a>

<p class="author">
    © 2023 <a href="mailto:krevovasandra@gmail.com">Sandra Krevova, </a> All Rights Reserved
</p>

<nav class="navigation">
    <ul class="menu menu-footer">
        <li><a class:active={active === "/books"} href="/books">Books</a></li>
        <li><a class:active={active === "/bids"} href="/bids">Bids</a></li>
        <li><a class:active={active === "/users"} href="/users">Users</a></li>
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