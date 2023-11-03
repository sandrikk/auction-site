<script>
    let positions = [];

    import { onMount } from 'svelte';
    onMount(() => {
        positions = Array(3).fill(undefined).map(() => {
            let width = 500 + Math.random() * 200;  // Width between 500 and 700
            let height = 300 + Math.random() * 200;  // Height between 500 and 700
            return {
                top: Math.random() * (window.innerHeight - height),
                left: Math.random() * (window.innerWidth - width / 2),
                width,
                height
            };
        });
    });
</script>


<svg style="top: {positions[0]?.top}px; left: {positions[0]?.left}px; width: {positions[0]?.width}; height: {positions[0]?.height}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#F6FA1D" d="M32.1,-46.6C42,-43.7,50.7,-35.4,53.8,-25.5C56.9,-15.6,54.4,-4,51.6,6.6C48.9,17.3,45.7,27.1,38.5,30.8C31.3,34.5,20,32,11.6,30.4C3.2,28.7,-2.4,27.8,-14.8,32.4C-27.2,36.9,-46.6,47,-54.9,44C-63.3,40.9,-60.6,24.6,-54.4,12.9C-48.2,1.2,-38.4,-5.9,-36.8,-19.9C-35.2,-33.8,-41.8,-54.6,-37.1,-59.9C-32.3,-65.3,-16.2,-55.1,-2.5,-51.2C11.1,-47.3,22.3,-49.6,32.1,-46.6Z" transform="translate(100 100)" /></svg>
<svg style="top: {positions[1]?.top}px; left: {positions[1]?.left}px; width: {positions[1]?.width}; height: {positions[0]?.height}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#F6FA1D" d="M31.2,-41.9C41,-29.1,49.7,-19.7,56.5,-6.3C63.3,7.2,68.1,24.6,62.5,37.6C56.8,50.6,40.7,59.2,25.1,61.7C9.5,64.3,-5.7,60.8,-21.1,56C-36.5,51.2,-52.1,45.1,-60.5,33.5C-68.9,21.8,-70.2,4.6,-65.3,-9.6C-60.5,-23.8,-49.6,-35,-37.7,-47.5C-25.8,-59.9,-12.9,-73.7,-1.1,-72.5C10.7,-71.2,21.5,-54.8,31.2,-41.9Z" transform="translate(100 100)" /></svg>
<svg style="top: {positions[2]?.top}px; left: {positions[2]?.left}px; width: {positions[2]?.width}; height: {positions[0]?.height}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#F6FA1D" d="M35.2,-58.4C39.9,-51.8,34,-32.3,32.6,-19.5C31.2,-6.7,34.3,-0.7,41.3,11.5C48.2,23.8,59,42.1,56.3,53.3C53.6,64.4,37.4,68.4,23.8,65.2C10.1,62,-1,51.7,-8.6,43.1C-16.2,34.6,-20.2,27.8,-34,23.2C-47.8,18.6,-71.3,16.1,-82.3,5.8C-93.2,-4.6,-91.5,-22.8,-80.6,-32.8C-69.8,-42.8,-49.8,-44.6,-34.8,-46.5C-19.9,-48.4,-9.9,-50.4,2.7,-54.5C15.3,-58.7,30.5,-65,35.2,-58.4Z" transform="translate(100 100)" /></svg>


<style>
    svg {
        display: block;
        position: absolute;
        z-index: -1;
    }
</style>