<script>
	import "../app.css";
	import { ToastProvider } from "@skeletonlabs/skeleton-svelte";
</script>

<ToastProvider>
	<div class="flex flex-col h-full">
		<main class="container mx-auto max-w-2xl grow py-8">
			<slot />
		</main>
	</div>
</ToastProvider>
