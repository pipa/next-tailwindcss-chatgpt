import { generateText } from '@/services/openai';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const gptResponse = await generateText(req.body.prompt);

      return res.status(200).json({ gptMessage: gptResponse?.data.choices[0].text });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}