/**
 * @file Renders the "Terms of Service" page for the application.
 *
 * This is a static server component that displays the company's terms and conditions.
 * It uses a `Card` component to present the legal text in a clean and readable format.
 * The content is intended to be informational and is rendered on the server.
 *
 * @returns {JSX.Element} The rendered "Terms of Service" page.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * The main component for the "Terms of Service" page.
 *
 * It displays a card containing a title and placeholder paragraphs for the legal text.
 * This component is purely for informational purposes.
 */
export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold font-headline">Terms of Service</CardTitle>
            <CardDescription>Last Updated: [Date]</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground prose prose-neutral dark:prose-invert">
            <p>
              Welcome to our service. By accessing or using our service, you agree to be bound by
              these terms. If you disagree with any part of the terms, then you do not have permission
              to access the service.
            </p>

            <h3 className="text-xl font-semibold font-headline text-foreground">1. Accounts</h3>
            <p>
              When you create an account with us, you must provide us with information that is accurate,
              complete, and current at all times. Failure to do so constitutes a breach of the Terms,
              which may result in immediate termination of your account on our service.
            </p>

            <h3 className="text-xl font-semibold font-headline text-foreground">2. Intellectual Property</h3>
            <p>
              The service and its original content, features, and functionality are and will remain
              the exclusive property of [Company Name] and its licensors. The service is protected by
              copyright, trademark, and other laws of both the [Country] and foreign countries.
            </p>

            <h3 className="text-xl font-semibold font-headline text-foreground">3. Termination</h3>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability,
              for any reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <h3 className="text-xl font-semibold font-headline text-foreground">4. Governing Law</h3>
            <p>
              These Terms shall be governed and construed in accordance with the laws of [Jurisdiction],
              without regard to its conflict of law provisions.
            </p>

            <h3 className="text-xl font-semibold font-headline text-foreground">5. Changes</h3>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
              If a revision is material, we will provide at least 30 days' notice prior to any new terms
              taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>

            <h3 className="text-xl font-semibold font-headline text-foreground">Contact Us</h3>
            <p>
              If you have any questions about these Terms, please contact us.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
