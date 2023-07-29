<script>
	import '../app.css';
</script>

<main class="bg-slate-900 h-screen">
	<section class="w-full h-1/5 border-b border-gray-700" />
	<section class="flex h-4/5">
		<section class="w-44 border-r border-gray-700" />
		<section class="flex-1">
			<slot />
		</section>
		<section class="border-l border-gray-700 w-36" />
	</section>
</main>
