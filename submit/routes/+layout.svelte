<script>
  export let data;
</script>

<style>
  @import '../app.css';
</style>

{#if data.user}
  <p>Logged in as: {data.user.email}</p>
{/if}

<slot />