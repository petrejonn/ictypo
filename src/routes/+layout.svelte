<script>
	import '../app.css';
</script>

<main class="bg-slate-900 min-w-[708px] w-full h-full">
	<section class="w-full h-1/5" />
	<section class="flex w-full h-4/5">
		<section class="w-44 hidden xl:block border-r border-gray-700 border-t" />
		<section class="flex-1 h-full">
			<slot />
		</section>
		<!-- <section class="border-l border-gray-700 w-36" /> -->
		<aside
			class="border-l border-gray-700 w-0 lg:w-[5%] xl:w-36 hidden lg:block transition-transform"
		>
			<div class="w-full">
				<a href="/" class="flex justify-center items-center pl-2.5 h-16 border-b border-gray-700">
					<img
						src="https://flowbite.com/docs/images/logo.svg"
						class="h-6 mr-3 sm:h-7"
						alt="Site Logo"
					/>
					<span
						class="self-center hidden xl:block text-lg font-semibold whitespace-nowrap text-white"
						>ICTypo</span
					>
				</a>
				<ul class="space-y-2 justify-center flex">
					<li>
						<a
							href="/"
							class="flex items-center p-2 hover:bg-gray-700 text-sm font-medium text-center text-gray-400 group"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-5 h-5 transition duration-75 text-gray-300 group-hover:text-white"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
								/>
							</svg>

							<span class="ml-3 hidden xl:block">Practice</span>
						</a>
					</li>
				</ul>
			</div>
		</aside>
	</section>
</main>
