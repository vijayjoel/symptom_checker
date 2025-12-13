import Groq from 'groq-sdk';

let groq = null;

const getGroqClient = () => {
  if (!groq) {
    groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }
  return groq;
};

export const getGroqSuggestions = async (symptoms) => {
  try {
    console.log('getGroqSuggestions called with:', symptoms);
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not set in environment variables');
    }

    const client = getGroqClient();
    console.log('Groq client initialized, calling API...');
    const message = await client.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `You are a helpful medical information assistant. When a user describes their symptoms, provide general health information and suggestions. 
          
          IMPORTANT: Always include a disclaimer that you are not a doctor and they should consult a healthcare professional.
          
          Format your response clearly with:
          1. Possible conditions (brief)
          2. General recommendations
          3. When to seek professional help
          4. A clear disclaimer`,
        },
        {
          role: 'user',
          content: `Based on these symptoms: "${symptoms}", can you provide some general health information and suggestions? Remember to include a medical disclaimer.`,
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    console.log('Groq API response received');
    return message.choices[0].message.content;
  } catch (error) {
    console.error('Groq API Error:', error.message);
    console.error('Full error details:', error);
    throw new Error(`Failed to get suggestions from Groq: ${error.message}`);
  }
};
