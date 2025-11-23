import Perplexity from '@perplexity-ai/perplexity_ai';
import fs from 'fs';
import express from 'express';
import '../utils/dotenv_config.js';

const router = express.Router();

router.get('/additional-info', async (req, res) => {
  const client = new Perplexity();

  const filereadstatic = fs.readFileSync('log.json', 'utf-8');
  console.log('Your are at ');

  const completion = await client.chat.completions.create({
    model: 'sonar-pro',
    messages: [
      {
        role: 'user',
        content: `You are an expert market research analyst. Analyze this product and return structured data about competitors and success metrics.

Your previous anylysis data:
${filereadstatic}`,
      },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        schema: {
          type: 'object',
          properties: {
            market_competitors: {
              type: 'object',
              properties: {
                competitor_list: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      company_name: { type: 'string' },
                      product_name: { type: 'string' },
                      market_share: { type: 'string' },
                      price_range: { type: 'string' },
                    },
                    required: ['company_name', 'product_name', 'market_share', 'price_range'],
                  },
                },
                total_competitors: { type: 'number' },
                market_saturation: { type: 'string' },
              },
              required: ['competitor_list', 'total_competitors', 'market_saturation'],
            },

            // changed code: AI Success Prediction Scores
            ai_success_scores: {
              type: 'object',
              properties: {
                market_fit_score: {
                  type: 'number',
                  description: 'Score 0-100 for product-market fit',
                },
                market_fit_reasoning: { type: 'string' },
                pricing_strategy_score: {
                  type: 'number',
                  description: 'Score 0-100 for pricing competitiveness',
                },
                pricing_strategy_reasoning: { type: 'string' },
                adoption_potential_score: {
                  type: 'number',
                  description: 'Score 0-100 for consumer adoption likelihood',
                },
                adoption_potential_reasoning: { type: 'string' },
                overall_success_probability: {
                  type: 'number',
                  description: 'Overall score 0-100',
                },
              },
              required: [
                'market_fit_score',
                'market_fit_reasoning',
                'pricing_strategy_score',
                'pricing_strategy_reasoning',
                'adoption_potential_score',
                'adoption_potential_reasoning',
                'overall_success_probability',
              ],
            },
          },
          required: ['market_competitors', 'ai_success_scores'],
        },
      },
    },
  });
  res.send(completion.choices[0].message.content);
});

export default router;
