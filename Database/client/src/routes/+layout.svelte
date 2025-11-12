<script>
  export let data;
</script>

{#if data.user}
  <p>Logged in as: {data.user.email}</p>
{/if}

<slot />
