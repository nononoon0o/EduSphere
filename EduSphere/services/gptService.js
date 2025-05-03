// gptService.js
import { AppConfig } from '../constants/config';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const askGpt = async (prompt) => {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AppConfig.openAI.apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || 'No response from GPT.';
  } catch (error) {
    console.error('❌ GPT API Error:', error);
    return 'Error communicating with OpenAI.';
  }
};

export const explainMolecule = async (molecule) => {
  const prompt = `Explain the molecule ${molecule} simply for students. What elements make it up? Include one fun fact.`;
  return await askGpt(prompt);
};

export const suggestReactions = async (inventory) => {
  const prompt = `Given the elements: ${inventory.join(', ')}, what chemical reactions are possible? Respond with bullet points.`;
  return await askGpt(prompt);
};
