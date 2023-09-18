<script>
    export let active;
    import logo from '../assets/logo-no-background.png'

</script>
<!--
<nav>
    <ul>
        <li><a class:active={active === "/"} href="/">Home</a></li>
        <li><a class:active={active === "/about"} href="/about">About</a></li>
    </ul>
</nav>
-->

<div >
    <img src={logo} alt="logo" class="logo" />
</div>
<button>Login</button>


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
    }

    button:hover {
        background-color: #0056b3; /* Choose a different color for hover effect */
    }
</style>