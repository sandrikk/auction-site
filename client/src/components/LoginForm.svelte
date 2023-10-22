<script>
    import router from 'page';
    import { tokenStore } from "../stores/tokenStore.js";
    import Button from "./Button.svelte";

    let email = '';
    let password = '';
    let errorMessage = '';

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:3000/tokens", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log('Response Status:', response.status);

            if (response.status === 201) {
                console.log('Login successful');
                const data = await response.json();
                const token = `Bearer ${data.token}`; // Add "Bearer" schema to the token
                tokenStore.set(token);
                router("/")

            } else {
                const data = await response.json();
                console.error('Login failed:', data.error || 'Unknown error');
            }
        } catch (error) {
            console.error('Error:', error);
            errorMessage = 'An error occurred';
        }
    };

</script>


<div class="page">
    <div class="form-container">
        <form class="form" on:submit|preventDefault={handleSubmit}>
            <!-- Bind form inputs to variables -->
            <input type="text" placeholder="email" name="email" bind:value={email} />
            <input type="password" placeholder="password" name="password" bind:value={password} />

            <!--
            <button type="submit">Login</button>
            -->
            <Button type="submit" text="Login" />

            {#if errorMessage}
                <p class="error-message">{errorMessage}</p>
            {/if}

            <p class="message"><a href="/register">Didn't register yet?</a></p>
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
