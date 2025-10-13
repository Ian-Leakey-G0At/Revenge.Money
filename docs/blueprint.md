# **App Name**: RevengeLearn

## Core Features:

- Secure Authentication: Use Firebase ID Token to create a secure, server-authoritative `__Host-session` cookie, ensuring user sessions are protected and managed server-side.
- Course Catalog Browsing: Enable users to browse available courses with details such as title, description, and price, facilitating easy discovery of learning content.
- Admin Course Management: Provide administrators with CRUD (Create, Read, Update, Delete) capabilities for managing the course catalog, including validation and audit logging for all actions.
- Checkout and Payments (Mock): Implement a checkout process that validates user input and returns a redirect URL for payment processing, initially mocked pre-deployment and integrated with IntaSend webhooks.
- Webhook-Driven Fulfillment: Utilize IntaSend webhooks to update Firestore on payment events, ensuring consistent fulfillment through idempotency and replay guards.
- Access Control: Control user access to learning content based on their purchased courses, verifying `purchasedCourses` to grant access and generating signed URLs for secure video delivery.
- Personalized Course Recommendations: Employ a tool to suggest relevant courses to users based on their learning history, purchase behavior, and profile data.

## User Roles and Permissions:

### 1. Guest User (Unauthenticated)

- **Access Rights:**
    - Can browse the **Homescreen** to see featured courses and promotional content.
    - Can explore the **Course Catalog** to view all available courses. Courses will appear as "unpurchased."
- **Restrictions:**
    - **Account Access:** Cannot access any user-specific pages like the profile, settings, or my courses. If a guest attempts to access these areas (e.g., by clicking the account tab in the bottom navigation or the profile icon in the header), they will be prompted with a modal or redirected to a page that requires them to either **Log In** or **Create an Account**.
    - **Purchasing:** Guests can initiate the purchase of a course. The checkout process will serve as a registration funnel, requiring them to create an account to complete the purchase.

### 2. Regular User (Authenticated)

- **Access Rights:**
    - Has full access to all non-administrative features of the website.
    - Can view and purchase courses from the **Course Catalog**.
    - Can access their **purchased courses**, view video content, and track their progress.
    - Can manage their **profile and settings**.
- **Restrictions:**
    - **Admin Privileges:** No access to the admin dashboard or any administrative functionalities. They cannot create, edit, or delete courses, view site-wide analytics, or manage other users.

### 3. Admin (Authenticated with Admin Privileges)

- **Access Rights:**
    - **Full Privileges:** Holds all access rights of a Regular User and has complete administrative control over the platform.
    - **Admin Dashboard:** Full access to the admin dashboard, which includes site statistics, user management, and course management functionalities.
    - **Course Management:** Can perform all CRUD (Create, Read, Update, Delete) operations on courses.
    - **Content Management:** Can manage featured content on the homepage, such as the hero carousel.
- **Implementation Note:**
    - Admin status is determined by a custom claim (`isAdmin: true`) in the user's Firebase ID Token, which is validated on the server-side to grant access to admin-protected routes and APIs.

## Style Guidelines:

- Primary color: A sophisticated blue (#4682B4) evokes trust and knowledge, crucial for a learning platform.
- Background color: A desaturated light blue (#E6F0FF) provides a clean and calming backdrop.
- Accent color: A complementary orange (#FF8C00) highlights calls to action and important information, enhancing user engagement.
- Body and headline font: 'Inter' (sans-serif) offers a modern and readable experience.
- Use a set of simple, consistent icons to represent course categories, progress, and account settings.
- Maintain a mobile-first, responsive design that adapts to different screen sizes, ensuring a seamless experience across devices. Navigation adapts: bottom nav (mobile) maps to top/header nav (web). Modals and drawers degrade to dialogs and sidebars on desktop.
- Subtle animations and transitions to provide feedback and guide users through the learning process.