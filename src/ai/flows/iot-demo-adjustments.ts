'use server';
/**
 * @fileOverview An AI agent that dynamically adjusts IoT demo parameters based on contextual clues.
 *
 * - adjustIotDemo - A function that orchestrates the adjustment of IoT demo parameters.
 * - AdjustIotDemoInput - The input type for the adjustIotDemo function.
 * - AdjustIotDemoOutput - The return type for the adjustIotDemo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustIotDemoInputSchema = z.object({
  timeOfDay: z
    .string()
    .describe("The current time of day (e.g., 'morning', 'afternoon', 'evening', 'night')."),
  recentInteractions: z
    .string()
    .describe("A summary of the user's recent interactions with the website."),
});
export type AdjustIotDemoInput = z.infer<typeof AdjustIotDemoInputSchema>;

const AdjustIotDemoOutputSchema = z.object({
  sensorReadingAdjustment: z
    .string()
    .describe('Suggested adjustment to sensor readings for the IoT demo.'),
  ledPatternAdjustment: z
    .string()
    .describe('Suggested adjustment to LED patterns for the IoT demo.'),
  cloudDataAdjustment: z
    .string()
    .describe('Suggested adjustment to cloud data for the IoT demo.'),
});
export type AdjustIotDemoOutput = z.infer<typeof AdjustIotDemoOutputSchema>;

export async function adjustIotDemo(input: AdjustIotDemoInput): Promise<AdjustIotDemoOutput> {
  return adjustIotDemoFlow(input);
}

const adjustIotDemoPrompt = ai.definePrompt({
  name: 'adjustIotDemoPrompt',
  input: {schema: AdjustIotDemoInputSchema},
  output: {schema: AdjustIotDemoOutputSchema},
  prompt: `You are an AI assistant that dynamically adjusts parameters for an IoT demo to create a personalized experience.

  Based on the current time of day and the user's recent interactions with the website, suggest adjustments to the sensor readings, LED patterns, and cloud data.

  Time of Day: {{{timeOfDay}}}
  Recent Interactions: {{{recentInteractions}}}

  Consider these factors when making adjustments:
  - Relevancy: Ensure the adjustments are relevant to the user's interests and the time of day.
  - Engagement: Aim to create a more engaging and informative demo experience.
  - Realism: Maintain a sense of realism in the adjustments.

  Provide the adjustments in a clear and concise manner.

  Sensor Reading Adjustment:
  LED Pattern Adjustment:
  Cloud Data Adjustment:`,
});

const adjustIotDemoFlow = ai.defineFlow(
  {
    name: 'adjustIotDemoFlow',
    inputSchema: AdjustIotDemoInputSchema,
    outputSchema: AdjustIotDemoOutputSchema,
  },
  async input => {
    const {output} = await adjustIotDemoPrompt(input);
    return output!;
  }
);
