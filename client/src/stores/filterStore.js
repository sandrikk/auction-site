
import { writable } from 'svelte/store';

export const filterStore = writable({
    category: '',
    language: '',
    cover: ''
});

