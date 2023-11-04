<!-- Button.svelte -->
<script>
    export let text;
    export let type;
    export let width = '100%';
</script>

<button type={type} style="width: {width};"> {text} </button>

<style>

    button {
        text-transform: uppercase;
        background: var(--details);
        width: 100%;
        padding: 10px 15px;
        border: 0;
        color: var(--bg-primary);
        font-size: 14px;
        font-weight: bold;
    }

    button:hover {
        background: var(--details-hover);
        border: 0;
    }

</style>