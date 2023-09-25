<!-- Form.svelte -->
<script>
    import Button from "./Button.svelte";
    export let anchorHref;
    export let formTitle;
    export let buttonLabel;
    export let buttonName;
    export let includeEmail = false;
</script>

<div class="page">
    <div class="form-container">
        <form class="form">
            <!-- You can customize the form inputs here as needed -->
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/>

            {#if includeEmail}
                <input type="text" placeholder="email address"/>
            {/if}

            <Button name={buttonName} />
            <p class="message">{formTitle} <a href="{anchorHref}">{buttonLabel}</a></p>
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
        background: var(--bg-primary);
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
        color: var(--bg-secondary);
    }
</style>
