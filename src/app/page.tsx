/**
 * @file The main homepage of the application.
 *
 * This component serves as the landing page, showcasing featured courses, student testimonials,
 * and interactive elements to engage users. It is built using a combination of custom
 * components and UI primitives.
 */

import * as React from 'react';

import { HeroCarousel } from '@/components/course/hero-carousel';
import { GoodLuckButton } from '@/components/course/good-luck-button';
import { FeaturedCourses } from '@/components/course/featured-courses';
import { StudentTestimonials } from '@/components/course/student-testimonials';

/**
 * The main homepage component.
 *
 * This component renders the entire homepage, which is composed of several sections:
 * - A `HeroCarousel` to display featured content.
 * - A `GoodLuckButton` for a fun, interactive user experience.
 * - A `FeaturedCourses` section to highlight a selection of courses.
 * - A `StudentTestimonials` section with an autoplaying carousel of testimonials.
 */
export default function Home() {
  return (
    <div className="flex flex-col">
      {/* The hero section with a full-width carousel. */}
      <section className="w-full">
        <HeroCarousel />
      </section>
      
      {/* A fun, interactive button to wish users good luck. */}
      <section className="container mx-auto px-4 mt-2 mb-4">
        <GoodLuckButton />
      </section>

      <main className="container mx-auto px-4">
        {/* The featured courses section. */}
        <FeaturedCourses />
        
        {/* The student testimonials section. */}
        <StudentTestimonials />
      </main>
    </div>
  );
}
