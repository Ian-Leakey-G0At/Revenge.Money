# Architecture: Serverless & Simple

The architecture of this project is designed for simplicity, scalability, and low maintenance. We leverage a serverless approach with Next.js API Routes and Vercel KV.

## Core Components

*   **Frontend:** A Next.js application serves the user interface, including the homepage, course pages, and deals page.
*   **Payment Integration:** We integrate with a third-party payment provider like Stripe. The frontend directs users to the payment provider to complete their purchase.
*   **Serverless Functions:** Next.js API Routes are used to handle backend logic, such as generating access tokens after a successful purchase.
*   **Key-Value Store:** Vercel KV is used as a simple, fast, and cheap database to store a mapping between purchase IDs and access tokens.

## Data Flow

1.  A user initiates a purchase on the frontend.
2.  They are redirected to a payment provider.
3.  Upon successful payment, the payment provider sends a webhook to one of our Next.js API Routes.
4.  The API Route generates a unique access token, stores it in Vercel KV, and (simulates) sending an email to the user with the access link.
5.  The user clicks the access link, which contains the course ID and access token.
6.  A Next.js Server Component on the course page validates the access token against Vercel KV.
7.  If the token is valid, the course content is rendered.
