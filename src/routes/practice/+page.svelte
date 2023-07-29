<script lang="ts">
	import keySound from '$lib/assets/key-sound3.mp3';
	import { onMount } from 'svelte';
	type Sample = {
		text: string;
		preview: string;
	};
	const samples: { [key: string]: Sample } = {
		'hello-world': {
			text: `<h1>Hello, World!</h1>`,
			preview:
				`<!DOCTYPE html>
    <html>
    <head>
      <title>Page Title</title>
      <style>
      </style>
      <script>
      </scr` +
				`ipt>
    </head>
    <body>
      <!-- Page content goes here -->
    </body>
    </html>`
		},
		'blue-background': {
			text: `body {\n\tbackground-color: blue;\n}`,
			preview:
				`<!DOCTYPE html>
    <html>
    <head>
      <title>Page Title</title>
      <style>
		/* CSS styles go here */
	</style>
      <script>
      </scr` +
				`ipt>
    </head>
    <body>
      <h1>BLUE BACKGROUND!</h1>
    </body>
    </html>`
		}
	};

	let currentSample = 'blue-background';
	let text = samples[currentSample].text;
	let index = 0;
	let chars = text.split('');
	let startTime: Date | null = null;
	let correctChars = 0;
	let totalChars = 0;

	onMount(() => {
		const audioTune = new Audio(keySound);
		const preview = document.getElementById('preview') as HTMLIFrameElement;

		function checkInput(event: KeyboardEvent) {
			if (event.key === text[index] || (event.key === 'Enter' && text[index] === '\n')) {
				if (startTime === null) {
					startTime = new Date();
					totalChars = 0;
				}
				audioTune.play();
				index++;
				correctChars++;
				while (text[index] === '\t') {
					index++;
				}
			}
			totalChars++;
			updatePreview(text.slice(0, index));
		}

		window.addEventListener('keypress', checkInput);

		function updatePreview(code: string) {
			let previewCode = samples[currentSample].preview.replace(
				/(<!-- Page content goes here -->|\/\* CSS styles go here \*\/|\/\/ JavaScript code goes here)/,
				code
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
	<section class="w-96 border-l border-gray-700 flex justify-center items-center">
		<iframe id="preview" />
	</section>
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
