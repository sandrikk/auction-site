<!-- register.svelte -->
<script>
    import Form from "../components/Form.svelte";
    export let active;
</script>

<Form formTitle="Create an account" buttonLabel="Already registered?" buttonName="Create" anchorHref="/login" includeEmail=true />
