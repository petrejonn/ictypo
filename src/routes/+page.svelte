<script lang="ts">
	import { Tabs, TabItem } from 'flowbite-svelte';
	export let data;

	type Tag = {
		id: number;
		name: string;
	};

	type SampleTag = {
		tag_id: number;
		code_sample_id: number;
		tags: Tag;
	};

	const css_sample = data.code_samples.filter((codeSample) =>
		codeSample.code_sample_tags.some((codeSampleTag: SampleTag) => {
			return codeSampleTag.tags.name === 'CSS';
		})
	);
	const html_sample = data.code_samples.filter((codeSample) =>
		codeSample.code_sample_tags.some((codeSampleTag: SampleTag) => {
			return codeSampleTag.tags.name === 'HTML';
		})
	);
	const script_sample = data.code_samples.filter((codeSample) =>
		codeSample.code_sample_tags.some((codeSampleTag: SampleTag) => {
			return codeSampleTag.tags.name === 'Script';
		})
	);
</script>

<div class="h-full">
	<Tabs style="underline" contentClass="bg-slate-900">
		<TabItem open>
			<div slot="title" class="flex items-center gap-2">
				<svg
					aria-hidden="true"
					class="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
						clip-rule="evenodd"
					/></svg
				>
				HTML
			</div>
			<div class="overflow-hidden flex h-full flex-wrap">
				{#each html_sample as sample}
					<a href="/{sample.id}" class="w-1/4 p-2 h-36">
						<img src={sample.output_url} alt="" />
					</a>
				{/each}
			</div>
		</TabItem>
		<TabItem>
			<div slot="title" class="flex items-center gap-2">
				<svg
					aria-hidden="true"
					class="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
					/></svg
				>
				CSS
			</div>
			<div class="overflow-hidden flex flex-wrap h-full">
				{#each css_sample as sample}
					<a href="/{sample.id}" class="w-1/4 p-2 h-36">
						<img src={sample.output_url} alt="" />
					</a>
				{/each}
			</div>
		</TabItem>
		<TabItem>
			<div slot="title" class="flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="w-5 h-5"
				>
					<path
						fill-rule="evenodd"
						d="M6.28 5.22a.75.75 0 010 1.06L2.56 10l3.72 3.72a.75.75 0 01-1.06 1.06L.97 10.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0zm7.44 0a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 010-1.06zM11.377 2.011a.75.75 0 01.612.867l-2.5 14.5a.75.75 0 01-1.478-.255l2.5-14.5a.75.75 0 01.866-.612z"
						clip-rule="evenodd"
					/>
				</svg>
				Script
			</div>
			<div class="overflow-hidden flex flex-wrap h-full">
				{#each script_sample as sample}
					<a href="/{sample.id}" class="w-1/4 p-2 h-36">
						<img src={sample.output_url} alt="" />
					</a>
				{/each}
			</div>
		</TabItem>
	</Tabs>
</div>
