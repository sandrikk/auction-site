<script>
  import router from 'page';

  import Home from "./pages/Home.svelte";
  import Login from "./pages/Login.svelte";
  import Header from "./components/Header.svelte";
  import Register from "./pages/Register.svelte";
  import Footer from "./components/Footer.svelte";
  import BookInfo from "./pages/BookInfo.svelte";
  import Books from "./pages/Books.svelte";
  import Users from "./pages/Users.svelte";
  import WonBids from "./pages/WonBids.svelte";

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
  router('/bookInfo/:isbn', (ctx) => {
    page = BookInfo;
    currentRoute = ctx.pathname;
    params = ctx.params;
  });
  router('/books', (ctx) => {
    page = Books;
    currentRoute = ctx.pathname;
  });
  router('/users', (ctx) => {
    page = Users;
    currentRoute = ctx.pathname;
  });
  router('/users/me/won', (ctx) => {
    page = WonBids;
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
    height: 13vh;
  }

  main {
    display: flex;
    padding: 1rem 2rem;
    min-height: 75vh;
  }

  footer {
    color: #000000;
    background-color: var(--details);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    height: 12vh;
  }


</style>
