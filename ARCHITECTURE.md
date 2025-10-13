# RevengeLearn: Architectural Blueprint

## 1. Project Overview and Purpose

**What:** "RevengeLearn is a mobile-first web application designed to provide users with a comprehensive catalog of courses on financial topics such as investing, debt management, and budgeting."

**Why:** "The application aims to enhance financial literacy by offering expert-led, accessible educational content, empowering users to master their finances and achieve their personal economic goals."

## 2. Frontend Architecture & Technology Stack

- **Core Framework:** The application is built using **Next.js** with the **App Router**. This provides significant advantages, including the performance benefits of React Server Components (RSC), efficient client-side navigation, automatic code-splitting by route, and built-in prefetching capabilities.

- **Styling Solution:** The UI is built with **Tailwind CSS**, a utility-first CSS framework for rapid and consistent development.

- **State Management:** Global state management is handled by modern React Hooks, primarily `useState` and `useContext`.

## 3. Project Structure and File Conventions

To ensure the codebase is scalable, maintainable, and easy to navigate, the following conventions are enforced.

### Route Structure

The application follows the Next.js App Router conventions. Key routes include:

- **Authentication:** `/login`, `/signup` (grouped under `(auth)`)
- **Main App:**
    - `/` (home)
    - `/account`
    - `/admin`
    - `/courses`
    - `/settings`
- **Dynamic Routes:**
    - `/courses/[id]`
    - `/my-courses/[courseId]`

### File Naming Conventions

- **Directories and Non-Component Files:** `kebab-case` (e.g., `course-catalog`, `auth-utils.ts`).
- **Component Files:** `kebab-case.tsx` (e.g., `course-card.tsx`).
- **Component Definitions:** `PascalCase` (e.g., `const CourseCard = ...`).

## 4. Rendering and Data Flow

The application leverages the hybrid rendering model of the Next.js App Router, combining Server Components and Client Components to optimize performance and developer experience.

- **Server Components:** By default, components within the `app` directory are React Server Components (RSCs). They are used for fetching data directly from the server and rendering static content. This reduces the amount of JavaScript sent to the client.

- **Client Components:** Components that require interactivity (e.g., handling user input, using hooks like `useState` or `useEffect`) are explicitly marked with the `'use client'` directive.

- **Data Flow:** Data is fetched in Server Components and passed down as props to Client Components. This ensures that sensitive data and logic remain on the server, while the client-side receives the necessary data for rendering and interactivity.

## 5. Styling Philosophy

The application's styling is governed by a design system defined in `tailwind.config.ts`.

- **Theme:** The theme is configured with custom colors, fonts, and border radiuses, ensuring a consistent visual identity.
- **Colors:** The color palette is based on a set of CSS variables, allowing for easy theming (e.g., light and dark modes).
- **Fonts:** The application uses 'Open Sans' for the body and headline text.
- **Spacing:** The configuration includes a `safe-bottom` utility for handling safe area insets on mobile devices.
- **Plugins:** The `tailwindcss-animate` plugin is used for animations.

## 6. Change Log

*(This section will be populated as changes are made to the application.)*
