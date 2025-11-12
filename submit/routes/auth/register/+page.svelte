<script>
  export let form;
</script>

<h1>Register</h1>

<form method="POST">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" required />

  <button type="submit">Register</button>

  {#if form?.message}
    <p>{form.message}</p>
  {/if}
</form>
