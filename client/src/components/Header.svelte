<script>
    import Button from "./Button.svelte";

    export let active;
    import logo from '../assets/logo-no-background.png'

</script>

<div >
    <a class:active={active === "/"} href="/">
        <img src={logo} alt="logo" class="logo" />
    </a>
</div>

<nav>
    <ul class="menu">
        <li><a class="login" class:active={active === "/login"} href="/login">Login</a></li>
    </ul>
</nav>




<style>

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