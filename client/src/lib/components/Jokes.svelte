<script>
    import { getJoke } from "$lib/apis/joke-api.js";
  
    let joke = $state({ setup: "", punchline: "" });
    let loading = $state(false);
  
    const loadJoke = async () => {
      loading = true;
      joke = await getJoke();
      loading = false;
    };
  </script>
  
  <button on:click={loadJoke}>Load joke</button>
  
  {#if loading}
    <p>Loading a joke...</p>
  {:else}
    <p>{joke.setup}</p>
    <p>{joke.punchline}</p>
  {/if}