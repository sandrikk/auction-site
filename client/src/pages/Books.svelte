<script>
    import SearchBar from "../components/SearchBar.svelte";
    import FilterSection from "../components/FilterSection.svelte";
    import BookList from "../components/BookList.svelte";
    import RandomSVGs from "../components/RandomSVGs.svelte";
    let searchTerm = "";

</script>
<RandomSVGs />

<div class="sidebar">
    <FilterSection />
</div>

<div class="content">

    <SearchBar bind:searchTerm />
    <BookList {searchTerm} />

</div>

<style>

    .content {
        width: 80vw;
        margin: 1rem;
    }

    .sidebar {
        width: 20vw;
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

    @media (max-width: 850px) {
        .sidebar {
            width: 100%;
        }

        .content {
            width: 100%;
        }
    }

    @media (max-width: 550px) {
        .content {
            margin: 1rem 0 0;
        }
    }
</style>