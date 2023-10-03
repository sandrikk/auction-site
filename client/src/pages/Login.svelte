<script>
    import Form from "../components/Form.svelte";
    import LoginForm from "../components/LoginForm.svelte";
    export let active;
</script>

<!--<Form formTitle="Sign In" buttonLabel="Not registered?" buttonName="Login" anchorHref="/register" includeEmail=false apiUrl="http://localhost:3000/login" />-->
<LoginForm />