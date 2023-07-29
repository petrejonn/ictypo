<script lang="ts">
	let text = `def greet(name):\n\tprint(f"Hello, {name}!")\n\ngreet("John")`;
	let index = 0;
	let chars = text.split('');
	let startTime: Date | null = null;
	let correctChars = 0;
	let totalChars = 0;

	function checkInput(event: KeyboardEvent) {
		if (event.key === text[index] || (event.key === 'Enter' && text[index] === '\n')) {
			if (startTime === null) {
				startTime = new Date();
				totalChars = 0;
			}
			index++;
			correctChars++;
			while (text[index] === '\t') {
				index++;
			}
		}
		totalChars++;
	}

	if (typeof window !== 'undefined') {
		window.addEventListener('keypress', checkInput);
	}

	$: wpm = calculateWPM(totalChars);
	$: accuracy = calculateAccuracy(totalChars);

	function calculateWPM(totalChars: number) {
		if (startTime === null) {
			return 0;
		}

		let timeInMinutes = (new Date().getTime() - startTime.getTime()) / 60000;
		if (timeInMinutes === 0) {
			return 0;
		}
		let words = correctChars / 5;
		return Math.round(words / timeInMinutes);
	}

	function calculateAccuracy(totalChars: number) {
		if (totalChars === 0) {
			return 0;
		}
		return Math.round((correctChars / totalChars) * 100);
	}
</script>

<div class="flex h-full">
	<section class="flex-1 p-5">
		<div class="min-h-0 flex flex-col h-full">
			<div class="h-24 text-white">
				<p>Speed: {wpm} WPM</p>
				<p>Accuracy: {accuracy}%</p>
			</div>
			<div class="p-4 border-2 border-sky-400/20 bg-black min-h-0 h-full">
				<p
					class="overflow-hidden text-green-400 font-mono font-sefonfonbmibold break-words w-[770px] whitespace-pre"
				>
					{#each chars as char, i}
						{#if i < index}
							{char}
						{:else if i === index}
							<span class="next text-gray-600">{char}</span>
						{:else}
							<span class="text-gray-600">{char}</span>
						{/if}
					{/each}
				</p>
			</div>
		</div>
	</section>
	<section class="w-96 border-l border-gray-700" />
</div>

<style>
	.next {
		animation: blink 1s linear infinite;
	}
	@keyframes blink {
		50% {
			background-color: green;
		}
	}
</style>
