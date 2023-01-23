import { Configuration, OpenAIApi } from 'openai'

const openAiConfiguration = new Configuration({
  organization: process.env.OPEN_AI_ORGANIZATION,
  apiKey: process.env.OPEN_AI_KEY
});
const openai = new OpenAIApi(openAiConfiguration);
const model = String(process.env.OPEN_AI_MODEL);

export const generateText = async (prompt: string) => {
  try {
    const gptResponse = await openai.createCompletion({
      model,
      prompt,
      max_tokens: Number(process.env.OPEN_AI_MAX_TOKENS)
    }, {
      timeout: 10000
    });

    return gptResponse;
  } catch (error) {
    console.log('openai error:', error)
    throw error;
  }
}