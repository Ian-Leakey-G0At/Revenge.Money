'use client';
import { useState } from 'react';
import { Star, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { Course } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';

// Helper function to create a biased, positive rating distribution
const generateRatingDistribution = (rating: number, totalReviews: number) => {
  const distribution = [0, 0, 0, 0, 0]; // Index 0=5star, 1=4star, 2=3star, 3=2star, 4=1star
  if (totalReviews === 0) {
    return [1, 2, 3, 4, 5].map(i => ({ stars: i, count: 0, percentage: 0 }));
  }

  // Ensure rating is within a sensible range (4.3 to 5.0)
  const clampedRating = Math.max(4.3, Math.min(5.0, rating));

  // Make it extremely biased. ~98% of reviews are 4 or 5 stars.
  const highRatingsTotalCount = Math.floor(totalReviews * 0.98);
  const lowRatingsTotalCount = totalReviews - highRatingsTotalCount;

  // Determine 5-star vs 4-star split based on the rating.
  // A rating of 4.3 gives a 70% weight to 5-stars.
  // A rating of 5.0 gives a 100% weight to 5-stars.
  const fiveStarBias = (clampedRating - 4.3) / 0.7; // Scale bias from 0 to 1
  let fiveStarCount = Math.floor(highRatingsTotalCount * (0.7 + fiveStarBias * 0.3));
  let fourStarCount = highRatingsTotalCount - fiveStarCount;

  if (fourStarCount < 0) {
    fiveStarCount += fourStarCount;
    fourStarCount = 0;
  }

  // Distribute the 2% of low ratings, mostly on 3 stars.
  const threeStarCount = Math.floor(lowRatingsTotalCount * 0.7);
  const twoStarCount = Math.floor(lowRatingsTotalCount * 0.2);
  const oneStarCount = lowRatingsTotalCount - threeStarCount - twoStarCount;

  // Assign counts to the correct star rating index
  distribution[0] = fiveStarCount;
  distribution[1] = fourStarCount;
  distribution[2] = threeStarCount;
  distribution[3] = twoStarCount;
  distribution[4] = oneStarCount;

  // Distribute rounding remainders to the highest ratings
  const currentTotal = distribution.reduce((a, b) => a + b, 0);
  const remainder = totalReviews - currentTotal;
  distribution[0] += remainder;

  return distribution.map((count, index) => ({
    stars: 5 - index,
    count,
    percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0,
  })).reverse(); // Reverse to get 1-star to 5-star for the rendering loop
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
    <div className="glass-card bg-void/80 backdrop-blur-xl border border-white/10 rounded-xl p-6">
      <div className="mb-6">
        <h3 className="font-headline text-xl text-white">Ratings & Reviews</h3>
        <p className="text-sm text-cyber-mute">See what other students think about this course.</p>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Side: Average Rating */}
          <div className="flex flex-col items-center justify-center text-center p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-5xl font-bold text-white">{course.rating.toFixed(1)}</p>
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
                <Progress value={item.percentage} className="w-full h-2 bg-white/10" indicatorClassName="bg-brand-purple" />
                <span className="text-xs text-cyber-mute w-12 text-right">{item.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Write a Review Section */}
        {accessToken && (
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
        )}
      </div>
    </div>
  );
}
