// tokenStore.js
import { writable } from 'svelte/store';

// Create a writable store for JWT token
export const tokenStore = writable('');
