<script lang="ts">
	import keySound from '$lib/assets/key-sound6.wav';
	import { Modal } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	export let data;

	let completionModal = false;
	let practiceCompleted = false;
	let currentSample = data.code_sample;
	let text = currentSample?.data ?? ``;
	let index = 0;
	let chars = text.split('').map((char: String) => {
		if (char === '\n') return '⏎\n';
		if (char === '\r') return '⏎\n';
		return char;
	});
	let startTime: Date | null = null;
	let correctChars = 0;
	let totalChars = 0;

	onMount(() => {
		const audioTune = new Audio(keySound);
		const preview = document.getElementById('preview') as HTMLIFrameElement;

		function checkInput(event: KeyboardEvent) {
			if (
				!practiceCompleted &&
				(event.key === text[index] ||
					(event.key === 'Enter' && (text[index] === '\n' || text[index] === '\r')))
			) {
				if (startTime === null) {
					startTime = new Date();
					totalChars = 0;
				}
				audioTune.play();
				index++;
				let nextChar = document.querySelector('.next');
				if (nextChar) {
					nextChar.scrollIntoView({ behavior: 'smooth', block: 'center' });
				}

				if (text[index] === '\r') {
					index++;
				}
				correctChars++;
				while (text[index] === '\t') {
					index++;
				}

				if (text[index] === ' ' && text[index + 1] === ' ') {
					while (text[index] === ' ') {
						index++;
					}
				}
			}
			totalChars++;
			updatePreview(text.slice(0, index));
			if (index >= text.length) {
				completionModal = true;
				practiceCompleted = true;
			}
		}

		window.addEventListener('keypress', checkInput);

		function updatePreview(code: string) {
			let previewCode = currentSample.preview.replace(
				/(<!-- Page content goes here -->|\/\* CSS styles go here \*\/|\/\/ JavaScript code goes here)/,
				code
				// currentSample.data
			);
			preview.srcdoc = previewCode;
		}
	});

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

<div class="flex lg:h-full overflow-clip flex-wrap lg:flex-nowrap">
	<section class="flex-1 h-full border-t border-gray-700">
		<div class="flex flex-col h-full">
			<div class="p-1 border-gray-700 bg-gray-900 h-full">
				<p
					class="p-4 text-wrap text-green-400 font-mono font-sefonfonbmibold break-words w-full lg:w-[680px] xl:w-[700px] min-w-full whitespace-pre"
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
	<section class="w-full lg:w-[450px] xl:w-[470px] border-l border-gray-700">
		<div class="flex">
			<div class="flex-1 h-16 text-white px-5 pt-1 border-t border-gray-700">
				<p>Speed: {wpm} WPM</p>
				<p>Accuracy: {accuracy}%</p>
			</div>
			<div class="flex-1 border-t border-b border-gray-700" />
			<div class="flex-1 border-b border-gray-700" />
		</div>
		<iframe id="preview" title={currentSample.title} class="w-full h-full mx-auto" />
	</section>
	<Modal
		bind:open={completionModal}
		size="xs"
		defaultClass="bg-slate-900 border-gray-700 border"
		autoclose
	>
		<div class="p-6 text-center">
			<p>🎉🎊🎉🎊</p>
			<h3 class="mb-5 text-lg font-normal text-green-500">Congratulation?</h3>
			<p class="text-white">Your typeing speed was {wpm} with an accuracy of {accuracy}</p>
		</div>
	</Modal>
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
