<!-- login.svelte -->
<script>
    import Form from "../components/Form.svelte";
    export let active;
    export let params;
</script>

<Form formTitle="Sign In" buttonLabel="Not registered?" buttonName="Login" anchorHref="/register" includeEmail=false />
