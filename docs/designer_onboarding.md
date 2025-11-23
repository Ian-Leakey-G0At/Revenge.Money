# REVENGE MONEY: Designer Onboarding & System Architecture
> **Classification**: GOD HEAD SENTINEL OVERSIGHT
> **Status**: ACTIVE
> **Target**: Visual Designer / UI Architect

---

## 1. The Ethos: "Knowledge is a Weapon"

**Revenge Money** is not an educational platform. It is an armory. We do not sell courses; we sell financial sovereignty, anonymity, and the tools to dismantle the systems of control that bind the average citizen.

### The Aesthetic
*   **Vibe**: Cyber-noir, V for Vendetta, Digital Anarchy, High-End FinTech.
*   **Emotion**: Empowerment, Secrecy, Urgency, Exclusivity.
*   **Visual Language**:
    *   **Palette**: Deepest Blacks (`#000000`, `background`), Muted Grays (`muted`), Sharp Accents (Red/Gold/White).
    *   **Typography**:
        *   **Headlines**: Bold, uppercase, aggressive (`font-headline`).
        *   **Body**: Clean, readable, clinical sans-serif.
    *   **Effects**: Glassmorphism (frosted overlays), subtle glows, smooth but snappy transitions.

---

## 2. Global UI Components (The Arsenal)

These are the atomic units of our interface. Every screen is built from these primitives.

### A. Navigation & Layout
*   **Navbar**: A sticky, minimal command strip. It disappears when not needed and reappears to guide.
*   **Footer**: Standard operational links, copyright, and disclaimers. Minimalist.

### B. Interactive Elements

#### `GoodLuckButton` (The Hook)
*   **Location**: Home Page, below Hero.
*   **Visual**: A simple, clickable card/button.
*   **Interaction**:
    1.  **Click**: The user taps the button.
    2.  **Feedback**: A global counter increments immediately (e.g., "19,576 Tapped for Good Luck").
    3.  **Reward**: A random "Wealth/Luck" Toast message appears (e.g., "Money magnet activated! 🧲").
*   **Purpose**: A psychological micro-interaction to build engagement and superstition. It makes the user feel "lucky" before they buy.

#### `AntechamberModal` (The Gate)
*   **Trigger**: Clicking any "Acquire Access" button on an unpurchased course.
*   **Visual**: A Dialog Modal overlay. Dark, serious.
*   **Content**:
    *   **Title**: "A Note on Discretion".
    *   **Image**: A 16:9 placeholder (eventually a digital keycard asset).
    *   **Copy**: Warns the user that the knowledge is dangerous and purchases are handled discreetly via "Vendetta Machine".
*   **Action**: "Proceed to Secure Checkout" button.
*   **Result**: Redirects the user to the external checkout URL (`vendettaMachineUrl`).

### C. Media Components

#### `VideoPlayer` (The Lens)
This is the heart of the content consumption.
*   **Modes**:
    *   **Local**: Plays raw `.mp4` files (used for teasers).
    *   **YouTube**: Embeds YouTube videos (used for course content).
*   **States**:
    1.  **Idle**: Displays the `thumbnailUrl`. Overlaid with a custom **Play Button** (SVG icon).
    2.  **Hover**: The Play Button scales up slightly (1.1x).
    3.  **Playing**: The thumbnail vanishes. The video plays.
        *   **Controls**: We hide native controls and use **Custom Overlay Controls**.
        *   **Overlay**: Appears on mouse move, fades out after 2 seconds.
        *   **Buttons**: Play/Pause, Rewind 10s, Fast Forward 10s, Mute/Unmute, Replay.
*   **Logic**: Auto-plays when a lesson is selected from the playlist.

#### `HeroCarousel` (The Billboard)
*   **Location**: Home Page Top.
*   **Visual**: Full-width, aspect-video slides.
*   **Navigation**: Custom dot indicators at the bottom.
    *   **Active**: A wide bar (`w-8 bg-primary`).
    *   **Inactive**: A small dot (`w-4 bg-muted`).
*   **Behavior**: Auto-advances every 5 seconds. Pauses on user interaction.

---

## 3. Page Anatomy & User Flows

### A. Home Page (`/`)
*The Recruitment Center.*

1.  **Hero Section**: `HeroCarousel`. High-impact visuals. No text overlay, just pure imagery.
2.  **Engagement**: `GoodLuckButton`. The first "yes" from the user.
3.  **Discovery**: `FeaturedCourses`. A grid of `CourseCard` components.
    *   **`CourseCard` Anatomy**:
        *   **Thumbnail**: 3:4 Portrait Aspect Ratio (or Video Aspect Ratio depending on design iteration).
        *   **Overlay**: Price Tag (e.g., "$62") or "Purchased" badge.
        *   **Title**: Bold, truncated if necessary.
        *   **Meta**: Video Count icon, Student Count icon.
        *   **Interaction (Desktop)**: **Hold-to-Preview**. Holding the mouse down for 1.5s triggers a video preview.
        *   **Interaction (Mobile)**: Tap to navigate to Course Details.
4.  **Social Proof**: `StudentTestimonials`.
    *   **Visual**: A carousel of glassmorphic cards.
    *   **Content**: Star rating, Quote, Student Name, Location.
    *   **Behavior**: Autoplays slowly.

### B. Course Details Page (`/courses/[id]`)
*The Conversion Engine.*

**State 1: Unpurchased (The Pitch)**
*   **Header**:
    *   **Video**: `VideoPlayer` loads the `teaserVideoUrl`.
    *   **Title**: Large, H1.
    *   **Instructor**: Avatar + Name ("The Commander").
    *   **Rating**: Star Icon + Rating (e.g., 5.0) + Purchase Count.
*   **Details**:
    *   **Description**: A compelling, long-form sales copy explaining *why* this knowledge is vital.
*   **Curriculum (Locked)**: `LockedVideoPlaylist`.
    *   **Visual**: An Accordion list of modules/lessons.
    *   **State**: All items have a **Lock Icon**.
    *   **Interaction**: Clicking an item expands it to show the description, but **does not** play video.
*   **Social Proof**:
    *   **`TestimonialCarousel`**: More reviews specific to this course.
    *   **`CustomerRatings`**: A breakdown of 5-star to 1-star ratings with progress bars.
*   **Call to Action (Sticky)**:
    *   **Mobile**: A fixed bar at the bottom of the screen (`bottom-0`).
    *   **Desktop**: A prominent button or sidebar.
    *   **Component**: "Acquire Access" Button.
    *   **Content**: Price ("$62") + Label ("Acquire Access").
    *   **Action**: Opens `AntechamberModal`.

**State 2: Purchased (The Product)**
*   **Header**:
    *   **Video**: `VideoPlayer` loads the **First Lesson** (or currently selected lesson).
*   **Curriculum (Unlocked)**: `VideoPlaylist`.
    *   **Visual**: A scrollable list of lessons.
    *   **State**:
        *   **Active**: Highlighted background.
        *   **Completed**: Checkmark icon (future state).
    *   **Interaction**: Clicking a lesson updates the main `VideoPlayer` and scrolls the page to the top.
*   **Progress**:
    *   **`ProgressBar`**: A visual indicator of course completion (e.g., "30% Complete").
*   **Bonus**:
    *   **AI Access**: If the course has a `notebookLmUrl`, a specialized button appears: "Access AI Financial Brain". This opens the NotebookLM tool in a new tab.

---

## 4. Data & Logic Architecture

*   **Source of Truth**: `src/lib/placeholder-data.ts`.
    *   This file contains the hardcoded "database" of courses, modules, lessons, and instructors.
*   **Key Types** (`src/lib/types.ts`):
    *   `Course`: The top-level object. Contains `isPurchased` flag (simulated).
    *   `Module`: Grouping of lessons.
    *   `Lesson`: Individual video content (`youtubeVideoId`, `duration`, `content`).
*   **Gating Logic**:
    *   The `CoursePageLayout` component receives an `isPurchased` prop.
    *   **If `true`**: Renders `VideoPlaylist` (clickable) and `VideoPlayer` (YouTube).
    *   **If `false`**: Renders `LockedVideoPlaylist` (read-only) and `VideoPlayer` (Teaser).

---

## 5. Interaction States Reference

| Component | State | Visual Cue | Interaction |
| :--- | :--- | :--- | :--- |
| **Course Card** | Default | Image + Price | Link to Details |
| | Hover (Desktop) | Scale Up | - |
| | Hold (Desktop) | Video Plays | Preview Content |
| **Video Player** | Idle | Thumbnail + Play Icon | - |
| | Playing | Video Content | Show Controls on Hover |
| **Accordion** | Collapsed | Title + Icon | Expand |
| | Expanded | Description Visible | Collapse |
| **CTA Button** | Default | Solid Color | Open Modal |
| | Hover | Opacity 90% | - |

---

**End of Brief.**
*Construct the interface accordingly.*
