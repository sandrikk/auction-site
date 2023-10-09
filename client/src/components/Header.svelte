<script>
    import router from "page";

    export let active;
    import logo from '../assets/logo-no-background.png'
    import {tokenStore} from "../stores/tokenStore.js";

    const handleLogout = async () => {
        tokenStore.set('');
        router("/login");
    };

</script>

<div >
    <a href="/">
        <img src={logo} alt="logo" class="logo" />
    </a>
</div>

<nav>
    <ul class="menu">
        <li><a class:active={active === "/bids"} href="/bids">Bids</a></li>
        <li><a class:active={active === "/books"} href="/books">Books</a></li>
        <li><a class:active={active === "/users"} href="/books">Users</a></li>
        {#if $tokenStore === ''}
            <li><a class="login" class:active={active === "/login"} href="/login">Login</a></li>
        {:else}
            <li><a class="login" on:click={handleLogout}>Logout</a></li>
        {/if}
    </ul>
</nav>




<style>

    .menu {
        display: flex;
        gap: 1rem;
    }

    .menu .login {
        text-transform: uppercase;
        background: var(--details);
        width: 100%;
        padding: 10px 15px;
        border: 0;
        font-weight: bold;
        font-size: 14px;
    }
    .menu .login:hover {
        background: var(--details);
        border: 0;
    }

    .logo {
        width: 7rem;
    }
</style>