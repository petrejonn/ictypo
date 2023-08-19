import { supabase } from '$lib/supabaseClient';

export async function load({ params }) {
	const { data, error } = await supabase
		.from('code_samples')
		.select('*')
		.eq('id', params.id)
		.single();
	if (error) {
		console.error(error);
	}
	return {
		code_sample: data
	};
}
