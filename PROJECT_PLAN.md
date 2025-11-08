# Project: Secure Access via Email Code Verification

**Objective:** Implement a two-factor authentication system where users receive a temporary code via email to access their purchased courses, preventing casual sharing of access links.

---

## **Phase 1: Foundation & Planning**

*   [x] **Task 1.0: Define Project Plan & Task Manager**
    *   **Status:** Completed
    *   **Description:** Create this document to track all stages of the project, ensuring alignment with `RULES.md`.
*   [x] **Task 1.1: Establish Backup & Rollback Protocol**
    *   **Status:** Completed
    *   **Description:** Created the `/backups` and `/scripts` directories. Implemented `backup.sh` and `restore.sh` scripts to ensure a safe rollback is possible for all future file modifications.
*   [x] **Task 1.2: Modify Data Structure for Purchases**
    *   **Status:** Completed
    *   **File(s) to be Modified:** `src/app/api/generate-access/route.ts`
    *   **Description:** Updated the `generate-access` endpoint to accept an `email` in the request body and store `{ courseId, email }` against the generated access token in Vercel KV. This change is fundamental for tying access to a specific user.

---

## **Phase 2: Backend API Development**

*   [x] **Task 2.1: Create "Request Access Code" API Endpoint**
    *   **Status:** Completed
    *   **File(s) to be Created:** `src/app/api/request-code/route.ts`
    *   **Description:** Built the new `POST` endpoint that takes an access `token`, looks up the user's email, generates a 6-digit code, stores it in KV with a 3-hour TTL, and simulates sending an email (logged to console).
*   [x] **Task 2.2: Create "Verify Access Code" API Endpoint**
    *   **Status:** Completed
    *   **File(s) to be Created:** `src/app/api/verify-code/route.ts`
    *   **Description:** Built the new `POST` endpoint that takes an access `token` and a `code`. It compares the submitted code with the one stored in KV, returns a success/failure status, and deletes the code upon successful verification to prevent reuse.

---

## **Phase 3: Frontend Implementation**

*   [x] **Task 3.1: Build Verification Modal Component**
    *   **Status:** Completed
    *   **File(s) to be Created:** `src/components/course/verification-modal.tsx`
    *   **Description:** Created the new client-side React component for the verification popup. It includes a form for the code, a submit button, state management for loading and errors, and the user warning message.
*   [x] **Task 3.2: Integrate Verification Flow into Course Page**
    *   **Status:** Completed
    *   **File(s) to be Modified:** `src/app/my-courses/[courseId]/page.tsx`
    *   **Description:** Overhauled the course access page to manage the verification state. On load, it now calls the `/api/request-code` endpoint and displays the `VerificationModal`. Only after successful verification via `/api/verify-code` does it render the `CoursePlayer`, completing the secure access flow.

---

## **Phase 4: Testing & Finalization**

*   [x] **Task 4.1: End-to-End System Testing**
    *   **Status:** Completed
    *   **Description:** Perform a full workflow test: simulate a purchase, use the access link, trigger the code request, enter the code, and verify access. Test all failure cases (wrong code, expired code, invalid token).
*   [ ] **Task 4.2: Final Review and Deployment Approval**
    *   **Status:** Not Started
    *   **Description:** Generate a final report summarizing all changes, test results, and compliance with the `RULES.md` protocol. Request final approval for deployment.
---

## **Phase 5: Dynamic Video Content Delivery**

**Objective:** Evolve the existing video playback system into a dual-source component serving local teasers to guests and unlisted YouTube videos to customers, without altering the UI.

*   [x] **Task 5.1: Dependency Integration**
    *   **Status:** Completed
    *   **Description:** Install the `react-youtube` npm package to enable robust YouTube video embedding and control.

*   [x] **Task 5.2: Create Dedicated VideoPlayer Component**
    *   **Status:** Completed
    *   **File(s) to be Created:** `src/components/course/video-player.tsx`
    *   **Description:** Refactor the video player JSX and logic from the course layout into a new, dedicated, reusable component for scalability.

*   [x] **Task 5.3: Implement Dual-Source Logic**
    *   **Status:** Completed
    *   **File(s) to be Modified:** `src/components/course/video-player.tsx`
    *   **Description:** Add conditional rendering logic to the `VideoPlayer` to display either an HTML5 `<video>` for local teasers or the `<YouTube>` component, based on the provided data source.

*   [x] **Task 5.4: Evolve Data Schema**
    *   **Status:** Completed
    *   **File(s) to be Modified:** `src/lib/types.ts`
    *   **Description:** Update the `Course` and `Lesson` types to support both `teaserVideoUrl` (for local teasers) and `youtubeVideoId` (for unlisted YouTube lessons).

*   [x] **Task 5.5: Integrate Smart Player into Layout**
    *   **Status:** Completed
    *   **File(s) to be Modified:** `src/components/course/course-page-layout.tsx`
    *   **Description:** Replace the old video logic with the new `<VideoPlayer />` component and implement the top-level logic to pass the correct video source based on the user's purchase status.

*   [x] **Task 5.6: Update Placeholder Data**
    *   **Status:** Completed
    *   **File(s) to be Modified:** `src/lib/placeholder-data.ts`
    *   **Description:** Align the placeholder data with the new schema, adding placeholder values for `teaserVideoUrl` and `youtubeVideoId` to ensure the application remains functional during development.
