'use server';

/**
 * @fileOverview A personalized course recommendation AI agent.
 *
 * - getPersonalizedCourseRecommendations - A function that retrieves personalized course recommendations for a user.
 * - PersonalizedCourseRecommendationsInput - The input type for the getPersonalizedCourseRecommendations function.
 * - PersonalizedCourseRecommendationsOutput - The return type for the getPersonalizedCourseRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCourseRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user for whom to retrieve course recommendations.'),
  learningHistory: z
    .array(z.string())
    .describe('The user historical purchase course Ids.'),
  interests: z.string().describe('The interests of the user'),
  profileData: z
    .string()
    .describe('The user profile data.'),
});
export type PersonalizedCourseRecommendationsInput = z.infer<
  typeof PersonalizedCourseRecommendationsInputSchema
>;

const PersonalizedCourseRecommendationsOutputSchema = z.object({
  recommendedCourses: z
    .array(z.string())
    .describe('A list of course IDs recommended for the user.'),
});
export type PersonalizedCourseRecommendationsOutput = z.infer<
  typeof PersonalizedCourseRecommendationsOutputSchema
>;

export async function getPersonalizedCourseRecommendations(
  input: PersonalizedCourseRecommendationsInput
): Promise<PersonalizedCourseRecommendationsOutput> {
  return personalizedCourseRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCourseRecommendationsPrompt',
  input: {schema: PersonalizedCourseRecommendationsInputSchema},
  output: {schema: PersonalizedCourseRecommendationsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized course recommendations to users of an online learning platform.

  Based on the user's learning history, interests, and profile data, identify courses that would be most relevant and engaging for them.

  Provide the recommendations as a list of course IDs.

  User ID: {{{userId}}}
  Learning History: {{#if learningHistory}}{{#each learningHistory}}{{{this}}}, {{/each}}{{else}}No Learning History{{/if}}
  Interests: {{{interests}}}
  Profile Data: {{{profileData}}}`,
});

const personalizedCourseRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCourseRecommendationsFlow',
    inputSchema: PersonalizedCourseRecommendationsInputSchema,
    outputSchema: PersonalizedCourseRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
