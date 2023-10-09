<script>
    import LoginForm from "../components/LoginForm.svelte";
    export let active;
    export let currentRoute;
</script>

<LoginForm active={currentRoute}/>