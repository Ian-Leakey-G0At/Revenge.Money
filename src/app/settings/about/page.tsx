/**
 * @file Renders the "About Us" page for the application.
 *
 * This page is a simple, static component that provides information about the company.
 * It uses a `Card` to present the content in a structured and visually appealing way.
 * As a server component, it is rendered on the server and sent to the client as static HTML.
 *
 * @returns {JSX.Element} The rendered "About Us" page.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * The main component for the "About Us" page.
 *
 * It displays a card containing a title and a brief paragraph about the company's mission.
 * This component is purely informational and does not contain any interactive logic.
 */
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold font-headline">About Us</CardTitle>
            <CardDescription className="text-lg">Our Mission and Story</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center text-muted-foreground">
            <p>
              Welcome to our platform! We are dedicated to providing the best service possible,
              driven by a passion for innovation and a commitment to our users. Our mission is to
              create tools that are not only powerful but also intuitive and accessible to everyone.
            </p>
            <p>
              Founded in [Year], our journey began with a simple idea: to make a difference.
              Today, we are proud to serve a global community and continue to push the boundaries
              of what's possible.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
