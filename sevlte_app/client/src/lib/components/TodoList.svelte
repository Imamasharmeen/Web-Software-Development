<script>
	import TodoItem from "./TodoItem.svelte";
	import { fade } from "svelte/transition";
	import { todos } from "$lib/states/todoState.svelte.js";
	import { get } from "svelte/store";
	import { getContext } from "svelte";
	const toast = getContext("toast");

	const remove = (todo) => {
		// Simulated random failure for demonstration
		if (Math.random() < 0.1) {
			toast?.create({
				title: "Error",
				description: "Failed to remove todo",
				type: "error"
			});
			return;
		}

		todos.update((t) => t.filter((item) => item !== todo));
	};
</script>

<ul class="space-y-4">
	{#each $todos as todo (todo.name)}
		<li transition:fade>
			<TodoItem {todo} removeTodo={() => remove(todo)} />
		</li>
	{/each}
</ul>
