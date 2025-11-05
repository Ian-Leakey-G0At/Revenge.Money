# Integration Points

This project has two key integration points:

1.  **Payment Provider:** We will integrate with a payment provider like Stripe to handle all payment processing. This will involve:
    *   Using their API to create checkout sessions.
    *   Configuring webhooks to receive notifications of successful payments.

2.  **YouTube:** We will use YouTube to host our course videos. The videos will be set to "unlisted" and embedded into our course pages. This will involve:
    *   Uploading the course videos to a YouTube channel.
    *   Getting the video IDs for each video.
    *   Using the video IDs to embed the videos in our application.
