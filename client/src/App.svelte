<script>
  import router from 'page';

  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Header from "./components/Header.svelte";
  import SearchBar from "./components/SearchBar.svelte";
  import Filter from "./components/FilterSection.svelte";

  let page;
  let params;
  let currentRoute;

  router('/', (ctx) => {
    page = Home;
    currentRoute = ctx.pathname;
  });
  router('/about', (ctx) => {
    page = About;
    currentRoute = ctx.pathname;
  });

  router.start();
</script>

<header>
  <Header active={currentRoute} />
</header>
<main>

  <div class="sidebar">
    <Filter/>
  </div>

  <div class="content">
    <SearchBar />
    <svelte:component this={page} {params} />
  </div>

</main>

<style>


  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: var(--bg-primary); /* Choose a background color for your header */
  }

  main {
    display: flex;
    padding: 1em;
    margin: 0 auto;
  }

  main .content {
    width: 70vw;
  }

  main .sidebar {
    width: 30vw;
    color: var(--bg-primary);
  }

  b,
  strong {
    font-weight: bolder;
  }

  a {
    color: inherit;
    background-color: transparent;
  }

  ul {
    list-style-type: none;
  }

  img {
    border-style: none;
    max-width: 100%;
    height: auto;
  }

  p {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 1rem 0 0;
  }

  input,
  button {
    all: unset;
    font-size: inherit;
    font-family: inherit;
    line-height: 1;
  }

  button {
    cursor: pointer;
  }

</style>
