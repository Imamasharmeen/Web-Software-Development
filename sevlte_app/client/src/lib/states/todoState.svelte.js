import { browser } from "$app/environment";
import { writable } from "svelte/store";

const storedTodos = browser ? JSON.parse(localStorage.getItem("todos") || "[]") : [];

export const todos = writable(storedTodos);

todos.subscribe((value) => {
	if (browser) {
		localStorage.setItem("todos", JSON.stringify(value));
	}
});
