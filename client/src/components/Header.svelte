<script>
    export let active;
    import logo from '../assets/logo-no-background.png'

</script>

<div >
    <a class:active={active === "/"} href="/">
        <img src={logo} alt="logo" class="logo" />
    </a>
</div>

<nav>
    <ul>
        <li><a class:active={active === "/login"} href="/login">Login</a></li>
    </ul>
</nav>




<style>

    a.active {
        font-weight: bold;
    }

    .logo {
        width: 7rem;
    }

    button {
        padding: 0.5rem 1rem;
        background-color: var(--bg-secondary); /* Choose a background color for your button */
        color: white;
        border-radius: 5px;
    }

    button:hover {
        background-color: var(--details); /* Choose a different color for hover effect */
    }
</style>