<script>
  import router from 'page';

  import Home from "./pages/Home.svelte";
  import Login from "./pages/Login.svelte";
  import Header from "./components/Header.svelte";
  import Register from "./pages/Register.svelte";
  import Footer from "./components/Footer.svelte";
  import BookInfo from "./pages/BookInfo.svelte";

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
  router('/bookInfo', (ctx) => {
    page = BookInfo;
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
<footer>
  <Footer />
</footer>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
  }

  main {
    display: flex;
    padding: 1rem 2rem;
    margin: 0 auto;
  }

  footer {
    color: #000000;
    background-color: var(--details);
  }


</style>
