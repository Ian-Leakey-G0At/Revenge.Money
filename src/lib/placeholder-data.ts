import type { Course } from './types';

export const courses: Course[] = [
  {
    id: 'investing-101',
    title: 'Beginner\'s Investing Guide',
    description: 'Learn the fundamentals of investing in stocks, bonds, and more.',
    longDescription:
      'This course is designed for absolute beginners. We will cover everything from setting up a brokerage account to making your first trade. You will learn about different asset classes, risk management, and how to build a diversified portfolio that aligns with your financial goals.',
    price: 49.99,
    imageId: 'course-investing-101',
    teaserVideoUrl: '/videos/investing-101-teaser.mp4',
    category: 'Investing',
    duration: '4 hours',
    level: 'Beginner',
    instructor: { name: 'Jane Doe', avatarId: 'instructor-avatar-1' },
    rating: 4.8,
    studentsCount: 234,
    modules: [
      {
        id: 'm1',
        title: 'Introduction to Investing',
        lessons: [
          { id: 'l1.1', title: 'What is Investing?', duration: 10, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: true },
          { id: 'l1.2', title: 'Why Should You Invest?', duration: 12, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
          { id: 'l1.3', title: 'Setting Up a Brokerage Account', duration: 15, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
          { id: 'l1.4', title: 'Understanding Asset Classes', duration: 20, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
          { id: 'l1.5', title: 'Building a Diversified Portfolio', duration: 25, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
        ],
      },
    ],
  },
  {
    id: 'debt-free-roadmap',
    title: 'Your Roadmap to Debt-Free',
    description: 'A step-by-step guide to tackling and eliminating debt.',
    longDescription:
      'Debt can be overwhelming, but with the right strategy, you can overcome it. This course provides a clear, actionable roadmap to paying off your debts, from credit cards to student loans. Learn about the debt snowball and avalanche methods, how to negotiate with creditors, and build habits that keep you debt-free for life.',
    price: 79.99,
    imageId: 'course-debt-free',
    teaserVideoUrl: '/videos/debt-free-roadmap-teaser.mp4',
    category: 'Debt',
    duration: '6 hours',
    level: 'Beginner',
    instructor: { name: 'John Smith', avatarId: 'instructor-avatar-2' },
    rating: 4.9,
    studentsCount: 312,
    modules: [
      {
        id: 'm1',
        title: 'Understanding Your Debt',
        lessons: [
          { id: 'l1.1', title: 'Creating a Debt Inventory', duration: 20, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: true },
          { id: 'l1.2', title: 'Good Debt vs. Bad Debt', duration: 10, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
          { id: 'l1.3', title: 'The Debt Snowball Method', duration: 15, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
          { id: 'l1.4', title: 'The Debt Avalanche Method', duration: 15, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
          { id: 'l1.5', title: 'Negotiating with Creditors', duration: 20, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
        ],
      },
    ],
  },
  {
    id: 'budgeting-mastery',
    title: 'Master Your Budget',
    description: 'Master the art of budgeting and unlock financial freedom.',
    longDescription:
      'Budgeting is the cornerstone of financial health. In this comprehensive course, you\'ll learn various budgeting techniques, how to track your expenses effectively, and how to create a budget that works for your lifestyle. Go from feeling stressed about money to being in complete control.',
    price: 39.99,
    imageId: 'course-budgeting-basics',
    teaserVideoUrl: '/videos/budgeting-mastery-teaser.mp4',
    category: 'Budgeting',
    duration: '3 hours',
    level: 'Beginner',
    instructor: { name: 'Jane Doe', avatarId: 'instructor-avatar-1' },
    rating: 4.7,
    studentsCount: 189,
    modules: [
      {
        id: 'm1',
        title: 'The Power of Budgeting',
        lessons: [
          { id: 'l1.1', title: 'Why Budget?', duration: 8, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: true },
          { id: 'l1.2', title: 'Budgeting Techniques', duration: 15, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
          { id: 'l1.3', title: 'Tracking Your Expenses', duration: 12, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
          { id: 'l1.4', title: 'Creating a Personal Budget', duration: 20, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
          { id: 'l1.5', title: 'Sticking to Your Budget', duration: 10, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
        ],
      },
    ],
  },
  {
    id: 'stock-market-advanced',
    title: 'Advanced Stock Market Strategies',
    description: 'Deep dive into technical analysis, options trading, and more.',
    longDescription:
      'Ready to take your investing skills to the next level? This course explores advanced topics like technical analysis, options trading strategies, and sector analysis. Learn how to read charts, identify trends, and use derivatives to hedge your portfolio or generate income. This course is for experienced investors only.',
    price: 199.99,
    imageId: 'course-stock-market',
    teaserVideoUrl: '/videos/stock-market-advanced-teaser.mp4',
    category: 'Advanced',
    duration: '12 hours',
    level: 'Advanced',
    instructor: { name: 'John Smith', avatarId: 'instructor-avatar-2' },
    rating: 4.9,
    studentsCount: 401,
    modules: [
      {
        id: 'm1',
        title: 'Technical Analysis',
        lessons: [
          { id: 'l1.1', title: 'Candlestick Patterns', duration: 45, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: true },
          { id: 'l1.2', title: 'Chart Patterns', duration: 50, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
          { id: 'l1.3', title: 'Technical Indicators', duration: 55, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
          { id: 'l1.4', title: 'Options Trading Strategies', duration: 60, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
          { id: 'l1.5', title: 'Sector Analysis', duration: 40, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
        ],
      },
    ],
  },
  {
    id: 'real-estate-investing',
    title: 'Real Estate Investing Guide',
    description: 'Learn how to find, finance, and manage rental properties.',
    longDescription:
      'Discover the world of real estate investing. This course will guide you through the process of buying your first investment property, from market analysis and deal evaluation to financing options and property management. Build long-term wealth through real estate.',
    price: 129.99,
    imageId: 'course-real-estate',
    teaserVideoUrl: '/videos/real-estate-investing-teaser.mp4',
    category: 'Investing',
    duration: '8 hours',
    level: 'Intermediate',
    instructor: { name: 'Jane Doe', avatarId: 'instructor-avatar-1' },
    rating: 4.8,
    studentsCount: 288,
    modules: [
       {
        id: 'm1',
        title: 'Finding Your First Deal',
        lessons: [
          { id: 'l1.1', title: 'Market Analysis', duration: 30, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: true },
          { id: 'l1.2', title: 'Deal Evaluation', duration: 35, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
          { id: 'l1.3', title: 'Financing Options', duration: 40, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
          { id: 'l1.4', title: 'Property Management', duration: 30, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
          { id: 'l1.5', title: 'Building Your Portfolio', duration: 25, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
        ],
      },
    ],
  },
  {
    id: 'crypto-fundamentals',
    title: 'Crypto Investing Fundamentals',
    description: 'An introduction to Bitcoin, Ethereum, and the world of DeFi.',
    longDescription:
      'Demystify the world of cryptocurrency. This course explains the technology behind blockchain, the difference between major cryptocurrencies like Bitcoin and Ethereum, and introduces the fast-growing ecosystem of Decentralized Finance (DeFi). Understand the risks and opportunities in this exciting new asset class.',
    price: 99.99,
    imageId: 'course-crypto',
    teaserVideoUrl: '/videos/crypto-fundamentals-teaser.mp4',
    category: 'Investing',
    duration: '5 hours',
    level: 'Intermediate',
    instructor: { name: 'John Smith', avatarId: 'instructor-avatar-2' },
    rating: 4.7,
    studentsCount: 357,
    modules: [
       {
        id: 'm1',
        title: 'What is Blockchain?',
        lessons: [
          { id: 'l1.1', title: 'The Technology Explained', duration: 25, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: true },
          { id: 'l1.2', title: 'Bitcoin vs. Ethereum', duration: 30, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
          { id: 'l1.3', title: 'Introduction to DeFi', duration: 35, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
          { id: 'l1.4', title: 'Crypto Wallets', duration: 20, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
          { id: 'l1.5', title: 'Risks and Opportunities', duration: 25, youtubeVideoId: 'jNQXAC9IVRw', content: 'Lesson content here...', isPreview: false },
        ],
      },
    ],
  },
];

export const myCourses = courses.slice(0, 2);
