<!-- Header.svelte -->
<script>
    import router from "page";
    import logo from '../assets/logo-no-background.png'
    import {tokenStore} from "../stores/tokenStore.js";

    export let active;


    const handleLogout = async () => {
        tokenStore.set(null);
        router("/login");
    };

</script>

<div >
    <a href="/">
        <img src={logo} alt="logo" class="logo" />
    </a>
</div>

<nav class="navigation">
    <ul class="menu">
        <li><a class:active={active === "/books"} href="/books">Books</a></li>
        <li><a class:active={active === "/users"} href="/users">Users</a></li>
        {#if $tokenStore === ""}
            <li><a class="login" class:active={active === "/login"} href="/login">Login</a></li>
        {:else}
            <li><a class:active={active === "/users/me/won"} href="/users/me/won">Won Bids</a></li>
            <li><a class="logout" on:click={handleLogout}>Logout</a></li>
        {/if}
    </ul>
</nav>




<style>

    .menu {
        display: flex;
        gap: 2rem;
    }

    .menu li:last-child {
        margin-left: 1rem;
    }

    .menu .login, .logout {
        text-transform: uppercase;
        background: var(--details);
        width: 100%;
        padding: 10px 15px;
        border: 0;
        font-weight: bold;
        font-size: 14px;
        color: var(--bg-primary);
    }
    .menu .login:hover, .logout:hover {
        background: var(--details-hover);
        border: 0;
    }

    .logo {
        width: 7rem;
    }

    @media (max-width: 450px) {
        .menu {
            flex-direction: column;
        }

        .menu li {
            text-align: center;
        }
    }
</style>