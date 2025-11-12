<script>
	import { todos } from "$lib/states/todoState.svelte.js";

	let name = "";
	let done = false;

	const addTodo = () => {
		if (!name.trim()) return;
		todos.update((t) => [...t, { name, done }]);
		name = "";
		done = false;
	};
</script>

<form class="space-y-4" on:submit|preventDefault={addTodo}>
	<label class="label" for="name">
		<span class="label-text">Todo</span>
		<input class="input" id="name" name="name" type="text" bind:value={name} placeholder="Todo name" />
	</label>

	<label class="flex items-center space-x-2" for="done">
		<input id="done" name="done" type="checkbox" bind:checked={done} class="checkbox" />
		<p>Done</p>
	</label>

	<button class="w-full btn preset-filled-primary-500" type="submit">Add todo</button>
</form>
