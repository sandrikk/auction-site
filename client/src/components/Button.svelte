<script>
    export let name;
    export let type;
</script>

<button type="submit" >{name}</button>

<style>
    button {
        text-transform: uppercase;
        background: var(--details);
        width: 100%;
        padding: 15px;
        border: 0;
        color: var(--bg-primary);
        font-size: 14px;
    }

</style>