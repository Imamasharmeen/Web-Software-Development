<!-- <script>
  import { enhance } from '$app/forms';
    export let form;
</script>

<form method="POST" use:enhance>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" required />

  <button type="submit">Login</button>
</form>
{#if form?.message}
  <p style="color: red;">{form.message}</p>
{/if} -->



<h1>Login</h1>

<!-- Again: Let it hit SvelteKit's action -->
<form method="POST">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" required />

  <button type="submit">Login</button>
</form>
