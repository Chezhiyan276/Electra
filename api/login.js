// api/login.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email_id } = req.body;

    const { data, error } = await supabase
      .from('customers')
      .select('id, crmID, email_id')
      .eq('email_id', email_id)
      .single();

    if (error || !data) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ success: true, customer: data });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
