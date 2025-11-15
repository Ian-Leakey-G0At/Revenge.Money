'use client';

const marqueeText = "THEY BUILD CAGES. WE FORGE KEYS. YOUR FINANCIAL SOVEREIGNTY BEGINS NOW.";

const MarqueeItem = () => (
  <span className="text-sm font-bold uppercase tracking-wider px-8 font-mono text-[#00B8FF]">
    {marqueeText}
  </span>
);

export function SearchAndFilter() {
  return (
    <>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
      <div className="relative flex overflow-x-hidden bg-black h-12 items-center rounded-lg">
        <div className="whitespace-nowrap animate-marquee flex">
          <MarqueeItem />
          <MarqueeItem />
          <MarqueeItem />
          <MarqueeItem />
        </div>
      </div>
    </>
  );
}
