<script>
    export let name;
</script>

<button type="submit" >{name}</button>

<style>
    button {
        text-transform: uppercase;
        background: var(--bg-secondary);
        width: 100%;
        padding: 15px;
        border: 0;
        color: var(--bg-primary);
        font-size: 14px;
    }
    button:hover,button:active,button:focus {
        background: var(--details);
        border: 0;
        color: #000;
    }
</style>