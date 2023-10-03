<!-- LoginForm.svelte -->
<script>
    import Button from "./Button.svelte";

    export let apiUrl;
    let email = '';
    let password = '';

    async function handleLoginSubmit() {
        //Handle login form submission
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.status === 200) {
            console.log('Login successful');
        } else {
            console.error('Login failed');
        }
    }
</script>

<div class="page">
    <div class="form-container">
        <form class="form" on:submit={handleLoginSubmit}>
            <!-- Login form inputs -->
            <input type="text" placeholder="email" name="email" />
            <input type="password" placeholder="password" name="password" />

            <Button name="Login" />
            <p class="message"><a href="/register">Not registered?</a></p>
        </form>
    </div>
</div>

<style>
    .page {
        width: 360px;
        padding: 8% 0 0;
        margin: auto;
    }
    .form-container {
        position: relative;
        z-index: 1;
        background: var(--bg-secondary);
        max-width: 360px;
        margin: 0 auto 100px;
        padding: 45px;
        text-align: center;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }
    .form input {
        width: 100%;
        margin: 0 0 15px;
        padding: 15px;
        font-size: 14px;
    }

    .form .message {
        margin: 15px 0 0;
        color: #b3b3b3;
        font-size: 12px;
    }
    .form .message a {
        color: #000000;
    }
</style>
