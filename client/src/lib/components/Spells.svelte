<script>
    import { PUBLIC_HARRY_POTTER_API } from "$env/static/public";
    let spells = $state([]);
  
    const fetchSpells = async () => {
      const response = await fetch(`${PUBLIC_HARRY_POTTER_API}/en/spells`);
      spells = await response.json();
      console.log(spells); 
    };
  </script>
  
  <button on:click={fetchSpells}>Accio</button>
  
  <ul>
    {#each spells as spell}
      <li>{spell.spell}</li>
    {/each}
  </ul>