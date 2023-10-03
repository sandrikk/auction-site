<script>
  import router from 'page';

  import Home from "./pages/Home.svelte";
  import Login from "./pages/Login.svelte";
  import Header from "./components/Header.svelte";
  import Register from "./pages/Register.svelte";

  let page;
  let params;
  let currentRoute;

  router('/', (ctx) => {
    page = Home;
    currentRoute = ctx.pathname;
  });
  router('/login', (ctx) => {
    page = Login;
    currentRoute = ctx.pathname;
  });
  router('/register', (ctx) => {
    page = Register;
    currentRoute = ctx.pathname;
  });

  router.start();
</script>

<header>
  <Header active={currentRoute} />
</header>
<main>
  <svelte:component active={currentRoute} this={page} {params} />
</main>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: var(--bg-secondary);
    color: var(--details);
  }

  main {
    display: flex;
    padding: 1rem 2rem;
    margin: 0 auto;
  }


</style>
