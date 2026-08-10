module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.DASHSCOPE_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Server is missing DASHSCOPE_API_KEY. Set it in your hosting provider\'s environment variables.' });
    return;
  }

  const { system, messages } = req.body || {};
  if (!system || !Array.isArray(messages)) {
    res.status(400).json({ error: 'Request must include "system" (string) and "messages" (array).' });
    return;
  }

  const chatMessages = [{ role: 'system', content: system }, ...messages];

  try {
    const response = await fetch('https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'qwen-plus',
        messages: chatMessages,
        max_tokens: 700,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      res.status(response.status).json({ error: (data.error && data.error.message) || 'DashScope API error' });
      return;
    }

    const text = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '';

    res.status(200).json({ text: text.trim() || "Hmm, I've got nothing — mind trying that again?" });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unexpected server error' });
  }
};
