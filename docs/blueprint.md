# The RevengeLearn Project Bible

**Version:** 1.0
**Last Updated:** Gemini, in the current epoch.

---

## **Foreword: A Guide for Builders**

This document is the single source of truth for the RevengeLearn platform. It is a living encyclopedia, intended for Product Managers, Designers, and Developers (both human and AI) of all skill levels. Its purpose is to eliminate ambiguity and provide a granular, multi-faceted understanding of every aspect of this application, from the grand architectural vision to the logic of a single button.

Read it. Understand it. Contribute to it.

---

## **Table of Contents**

### **Chapter I: The Vision & Core Principles**
- 1.1: Core Mission & Features
- 1.2: User Roles & Permissions
- 1.3: The Design System & Style Guidelines

### **Chapter II: The Application Screens (User Journeys)**
- 2.1: Homepage (`/`)
- 2.2: Admin Course Creation Page (`/admin/courses/new`)
- 2.3: Course Catalog Page (`/courses`)
- 2.4: User Account Page (`/account`)
- 2.5: User Settings Page (`/settings`)

### **Chapter III: The Component Library (`/src/components`)**
- 3.1: `<HeroCarousel>`
- 3.2: `<BottomNav>`

### **Chapter IV: The Hooks & Logic (`/src/hooks`)**
*(To be populated)*

### **Chapter V: The Backend API & Data Models**
- 5.1: `POST /api/admin/courses`

---

## **Chapter I: The Vision & Core Principles**

*(Previously written, preserved for continuity)*

---

## **Chapter II: The Application Screens (User Journeys)**

*(Previously written, preserved for continuity)*

---

## **Chapter III: The Component Library (`/src/components`)**

### **3.1: `<HeroCarousel>`**

*(Previously written, preserved for continuity)*

### **3.2: `<BottomNav>`**

- **File Path:** `src/components/layout/bottom-nav.tsx`
- **Component Type:** **Client Component** (`'use client'`)

- **Purpose:** To provide the primary method of navigation for users on mobile devices. It is a core element of our mobile-first design philosophy, offering persistent, ergonomic access to the application's main sections.

- **Visual Description & Layout:**
    - A navigation bar permanently fixed to the bottom of the viewport.
    - It has a translucent background (`bg-background/95`) with a backdrop blur effect (`backdrop-blur-sm`) to allow content from behind to subtly show through, creating a sense of depth.
    - It contains four equally-spaced navigation items, each consisting of an icon and a text label.
    - It is explicitly hidden on medium-sized screens and larger (`md:hidden`), ensuring it does not appear on tablets or desktops where the top header navigation is used instead.

- **State Management & Logic:**
    - **`pathname [string]`:** This component uses the `usePathname` hook from `next/navigation` to get the current URL path.
    - **Active State Logic:** The active state of each navigation link is determined by a direct comparison: `pathname === item.href`.
        - When a link is active, the icon and text are given the `text-primary` color.
        - When inactive, they are given the `text-muted-foreground` color.
    - This is a very efficient and declarative way to handle active states, relying entirely on the URL as the source of truth, which is a best practice in Next.js applications.

- **Data Contract & Structure:**
    - The navigation items are defined in a local constant array named `navItems`.
    - Each item in the array is an object with the following shape:
        - `href`: The URL path for the link (e.g., `/courses`).
        - `icon`: A reference to a Lucide React icon component (e.g., `BookOpen`).
        - `label`: The text displayed below the icon (e.g., "Courses").

- **For Product Managers:** This component is the anchor of the mobile user experience. The four items chosen (Home, Courses, Account, Settings) represent the highest-level, most critical user journeys. Any proposed changes to these items should be carefully considered, as it directly impacts the core usability of the app on its primary platform.

- **For Junior Developers:** This is a perfect example of a "presentational" client component. Its only job is to display information based on the current application state (the URL path). It doesn't fetch data or handle complex logic. Notice the use of `.map()` to render the list of navigation items from the `navItems` array; this makes the component DRY (Don't Repeat Yourself) and easy to update.

- **For Senior Developers:** The component is clean and efficient. The use of the `usePathname` hook is ideal for this use case. The `cn` utility correctly merges the base classes with the conditional active/inactive classes. The component has no external dependencies beyond Next.js and Lucide, making it highly portable and low-maintenance. A potential future enhancement could be to add a small notification badge to the 'Account' or 'Settings' icons if there are pending actions for the user.

---

## **Chapter IV: The Hooks & Logic (`/src/hooks`)**

*(To be populated)*

---

## **Chapter V: The Backend API & Data Models**

*(Previously written, preserved for continuity)*
