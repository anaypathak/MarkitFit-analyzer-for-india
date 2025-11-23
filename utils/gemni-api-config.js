import Perplexity from '@perplexity-ai/perplexity_ai';
import './dotenv_config.js';

async function main(value) {
  const client = new Perplexity();
  const fval = JSON.stringify(value);

  const completion = await client.chat.completions.create({
    model: 'sonar-pro',
    messages: [
      {
        role: 'user',
        content: `You are an expert market research analyst. Your goal is to provide a comprehensive product-market fit analysis for the specified product. Product info is in json format in string only down
      ${fval}
      `,
      },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        schema: {
          type: 'object',
          properties: {
            product_overview: {
              type: 'object',
              properties: {
                description: { type: 'string' },
                problem_solved: { type: 'string' },
                target_users: { type: 'string' },
              },
              required: ['description', 'problem_solved', 'target_users'],
            },
            target_class_fit: {
              type: 'object',
              properties: {
                best_fit: { type: 'string' },
                secondary_fit: { type: 'string' },
                not_suitable_for: { type: 'string' },
                reasoning: { type: 'string' },
              },
              required: ['best_fit', 'secondary_fit', 'not_suitable_for', 'reasoning'],
            },
            price_analysis: {
              type: 'object',
              properties: {
                price_in_inr: { type: 'number' },
                price_fit: { type: 'string' },
                ideal_price_range: { type: 'string' },
                reasoning: { type: 'string' },
              },
              required: ['price_in_inr', 'price_fit', 'ideal_price_range', 'reasoning'],
            },
            cultural_fit: {
              type: 'object',
              properties: {
                score: { type: 'number' },
                reasoning: { type: 'string' },
              },
              required: ['score', 'reasoning'],
            },
            adoption_barriers: {
              type: 'array',
              items: { type: 'string' },
            },
            competition_gap: {
              type: 'object',
              properties: {
                competitor_intensity: { type: 'string' },
                market_gap_identified: { type: 'string' },
                why_this_product_can_win: { type: 'string' },
              },
              required: [
                'competitor_intensity',
                'market_gap_identified',
                'why_this_product_can_win',
              ],
            },
            tier_suitability: {
              type: 'object',
              properties: {
                tier_1_score: { type: 'number' },
                tier_1_reason: { type: 'string' },
                tier_2_score: { type: 'number' },
                tier_2_reason: { type: 'string' },
                tier_3_score: { type: 'number' },
                tier_3_reason: { type: 'string' },
              },
              required: [
                'tier_1_score',
                'tier_1_reason',
                'tier_2_score',
                'tier_2_reason',
                'tier_3_score',
                'tier_3_reason',
              ],
            },
            market_fit_score: { type: 'number' },
            summary: { type: 'string' },
            recommendations: {
              type: 'object',
              properties: {
                product_improvements: { type: 'string' },
                pricing_recommendations: { type: 'string' },
                launch_strategy: { type: 'string' },
                other_products_to_sell: { type: 'string' },
                expansion_opportunities: { type: 'string' },
              },
              required: [
                'product_improvements',
                'pricing_recommendations',
                'launch_strategy',
                'other_products_to_sell',
                'expansion_opportunities',
              ],
            },
          },
          required: [
            'product_overview',
            'target_class_fit',
            'price_analysis',
            'cultural_fit',
            'adoption_barriers',
            'competition_gap',
            'tier_suitability',
            'market_fit_score',
            'summary',
            'recommendations',
          ],
        },
      },
    },
  });

  return completion.choices[0].message.content;
}

export default main;
