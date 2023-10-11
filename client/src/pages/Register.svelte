<script>
    import RegisterForm from "../components/RegisterForm.svelte";
    export let active;
    export let currentRoute;
</script>

<RegisterForm active={currentRoute}/>