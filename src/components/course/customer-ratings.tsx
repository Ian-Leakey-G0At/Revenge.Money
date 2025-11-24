'use client';
import { useState } from 'react';
import { Star, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { Course } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';

// Helper function to create a biased, positive rating distribution
// Helper function to create a realistic rating distribution that matches the average
const generateRatingDistribution = (rating: number, totalReviews: number) => {
  if (totalReviews === 0) {
    return [1, 2, 3, 4, 5].map(i => ({ stars: i, count: 0, percentage: 0 }));
  }

  // 1. Clamp the rating between 4.3 and 4.8 as requested
  const targetRating = Math.max(4.3, Math.min(4.8, rating));

  // 2. Define fixed small percentages for lower ratings to add realism
  // These sum to 5% (0.05)
  const p1 = 0.01; // 1%
  const p2 = 0.01; // 1%
  const p3 = 0.03; // 3%
  const lowStarsWeightedSum = (1 * p1) + (2 * p2) + (3 * p3); // 0.01 + 0.02 + 0.09 = 0.12
  const remainingPercentage = 1 - (p1 + p2 + p3); // 0.95

  // 3. Solve for p5 (percentage of 5 stars) and p4 (percentage of 4 stars)
  // Equation: 5*p5 + 4*p4 + lowStarsWeightedSum = targetRating
  // Constraint: p5 + p4 = remainingPercentage => p4 = remainingPercentage - p5
  // Substitute: 5*p5 + 4*(remainingPercentage - p5) + lowStarsWeightedSum = targetRating
  // 5*p5 + 4*remainingPercentage - 4*p5 + lowStarsWeightedSum = targetRating
  // p5 + 4*remainingPercentage + lowStarsWeightedSum = targetRating
  // p5 = targetRating - 4*remainingPercentage - lowStarsWeightedSum

  let p5 = targetRating - (4 * remainingPercentage) - lowStarsWeightedSum;

  // Clamp p5 to be valid (0 to remainingPercentage) just in case
  p5 = Math.max(0, Math.min(remainingPercentage, p5));

  const p4 = remainingPercentage - p5;

  // 4. Calculate counts
  const count1 = Math.round(totalReviews * p1);
  const count2 = Math.round(totalReviews * p2);
  const count3 = Math.round(totalReviews * p3);
  const count4 = Math.round(totalReviews * p4);
  const count5 = totalReviews - (count1 + count2 + count3 + count4); // Ensure total matches

  const distribution = [
    { stars: 5, count: count5, percentage: (count5 / totalReviews) * 100 },
    { stars: 4, count: count4, percentage: (count4 / totalReviews) * 100 },
    { stars: 3, count: count3, percentage: (count3 / totalReviews) * 100 },
    { stars: 2, count: count2, percentage: (count2 / totalReviews) * 100 },
    { stars: 1, count: count1, percentage: (count1 / totalReviews) * 100 },
  ];

  return distribution;
};


export function CustomerRatings({ course }: { course: Course }) {
  const { toast } = useToast();
  const [hoveredStars, setHoveredStars] = useState(0);
  const [selectedStars, setSelectedStars] = useState(0);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [accessToken] = useLocalStorage<string | null>(`access_token_${course.id}`, null);
  const ratingDistribution = generateRatingDistribution(course.rating, course.studentsCount);

  const handleSubmitReview = () => {
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
    setIsWritingReview(false);
    setSelectedStars(0);
  };

  return (
    <div className="glass-card bg-void/80 backdrop-blur-md border border-white/10 rounded-xl p-6">
      <div className="mb-6">
        <h3 className="font-headline text-xl text-white">Ratings & Reviews</h3>
        <p className="text-sm text-cyber-mute">See what other students think about this course.</p>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Side: Average Rating */}
          <div className="flex flex-col items-center justify-center text-center p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-5xl font-bold text-white">{Math.max(4.3, Math.min(4.8, course.rating)).toFixed(1)}</p>
            <div className="flex my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    'w-5 h-5',
                    course.rating >= star ? 'text-brand-purple fill-brand-purple' : 'text-white/10'
                  )}
                />
              ))}
            </div>
            <p className="text-sm text-cyber-mute">{course.studentsCount.toLocaleString()} Ratings</p>
          </div>

          {/* Right Side: Rating Distribution Bars */}
          <div className="md:col-span-2 flex flex-col justify-center">
            {ratingDistribution.reverse().map((item) => (
              <div key={item.stars} className="flex items-center gap-2 my-1">
                <span className="text-xs font-mono text-white w-3">{item.stars}</span>
                <Star className="w-3 h-3 text-brand-purple fill-brand-purple" />
                <ProgressBar value={item.percentage} className="w-full h-2 bg-white/10" indicatorClassName="bg-brand-purple" />
                <span className="text-xs text-cyber-mute w-12 text-right">{item.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Write a Review Section */}
        <div className="mt-6 pt-6 border-t border-white/10">
          {isWritingReview ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2 text-white">Your Rating</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoveredStars(star)}
                      onMouseLeave={() => setHoveredStars(0)}
                      onClick={() => setSelectedStars(star)}
                      aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                    >
                      <Star
                        className={cn(
                          'w-6 h-6 cursor-pointer transition-colors',
                          (hoveredStars || selectedStars) >= star
                            ? 'text-brand-purple fill-brand-purple'
                            : 'text-white/10'
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2 text-white">Your Review</p>
                <Textarea placeholder="Tell us about your experience..." className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setIsWritingReview(false)} className="text-white hover:bg-white/10 hover:text-white">Cancel</Button>
                <Button onClick={handleSubmitReview} className="bg-brand-purple hover:bg-brand-purple/80 text-white">Submit Review</Button>
              </div>
            </div>
          ) : (
            <Button variant="outline" className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white" onClick={() => setIsWritingReview(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Write a Review
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
