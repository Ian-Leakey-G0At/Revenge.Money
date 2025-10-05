# **App Name**: RevengeLearn

## Core Features:

- Secure Authentication: Use Firebase ID Token to create a secure, server-authoritative `__Host-session` cookie, ensuring user sessions are protected and managed server-side.
- Course Catalog Browsing: Enable users to browse available courses with details such as title, description, and price, facilitating easy discovery of learning content.
- Admin Course Management: Provide administrators with CRUD (Create, Read, Update, Delete) capabilities for managing the course catalog, including validation and audit logging for all actions.
- Checkout and Payments (Mock): Implement a checkout process that validates user input and returns a redirect URL for payment processing, initially mocked pre-deployment and integrated with IntaSend webhooks.
- Webhook-Driven Fulfillment: Utilize IntaSend webhooks to update Firestore on payment events, ensuring consistent fulfillment through idempotency and replay guards.
- Access Control: Control user access to learning content based on their purchased courses, verifying `purchasedCourses` to grant access and generating signed URLs for secure video delivery.
- Personalized Course Recommendations: Employ a tool to suggest relevant courses to users based on their learning history, purchase behavior, and profile data.

## Style Guidelines:

- Primary color: A sophisticated blue (#4682B4) evokes trust and knowledge, crucial for a learning platform.
- Background color: A desaturated light blue (#E6F0FF) provides a clean and calming backdrop.
- Accent color: A complementary orange (#FF8C00) highlights calls to action and important information, enhancing user engagement.
- Body and headline font: 'Inter' (sans-serif) offers a modern and readable experience.
- Use a set of simple, consistent icons to represent course categories, progress, and account settings.
- Maintain a mobile-first, responsive design that adapts to different screen sizes, ensuring a seamless experience across devices. Navigation adapts: bottom nav (mobile) maps to top/header nav (web). Modals and drawers degrade to dialogs and sidebars on desktop.
- Subtle animations and transitions to provide feedback and guide users through the learning process.