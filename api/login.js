// api/login.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email_id } = req.body;
    if (!email_id) {
      return res.status(400).json({ error: 'Missing email_id' });
    }

    // ✅ Use your actual table name 'Electra_DB'
    const { data, error } = await supabase
      .from('Electra_DB')
      .select('crmID, email_id')
      .eq('email_id', email_id)
      .single();

    if (error) {
      console.error('Supabase error:', error.message);
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: 'User not found' });
    }

    // ✅ Return consistent JSON structure
    return res.status(200).json({
      success: true,
      Electra_DB: data
    });
  } catch (err) {
    console.error('Unexpected server error:', err.message);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
}
