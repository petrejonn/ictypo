import { supabase } from '$lib/supabaseClient';

export async function load() {
	const { data, error } = await supabase.from('code_samples').select(`
    *,
    code_sample_tags (
      *,
      tags (
        *
      )
    )
  `);
	if (error) {
		console.error(error);
	}
	return {
		code_samples: data ?? []
	};
}
