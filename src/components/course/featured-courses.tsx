import { courses } from '@/lib/placeholder-data';
import { CourseCard } from './course-card';

export function FeaturedCourses() {
  // Show all courses or a subset
  const featuredCourses = courses;

  return (
    <section className="mb-6">
      <div className="bg-brand-cyan/10 border-y border-brand-cyan/20 py-2 overflow-hidden mb-6 relative">
        <div className="whitespace-nowrap animate-marquee text-[10px] font-mono text-brand-cyan font-bold tracking-widest uppercase">
          THEY BUILD CAGES. WE FORGE KEYS. YOUR FINAL EXIT STRATEGY STARTS HERE. // SECURE COMMUNICATIONS ESTABLISHED //
        </div>
      </div>

      <header className="px-6 mb-6">
        <h1 className="text-2xl font-extrabold uppercase tracking-tight text-white mb-2">Knowledge Base</h1>
        <p className="text-[10px] text-cyber-mute font-mono tracking-widest">FULL ARMORY ACCESS</p>
      </header>

      <div className="px-6 grid grid-cols-2 gap-x-4 gap-y-8">
        {featuredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
