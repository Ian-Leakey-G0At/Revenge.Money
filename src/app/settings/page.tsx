/**
 * @file Renders the main settings page for the application.
 *
 * This page serves as a central hub for various user settings and information.
 * It is composed of several distinct sections, including profile management,
 * account deletion, and links to other settings-related pages.
 * This component is a server component and renders its layout on the server.
 *
 * @returns {JSX.Element} The rendered settings page.
 */

/**
 * ### Backend Contract
 *
 * The components rendered on this page require the following backend endpoints:
 *
 * 1.  **Profile Settings (`ProfileSettings` component):**
 *     - **Fetch Profile:** `GET /api/user/profile` - To get the user's current data.
 *     - **Update Profile:** `PATCH /api/user/profile` - To update the user's data.
 *
 * 2.  **Delete Account (`DeleteAccount` component):**
 *     - **Delete:** `DELETE /api/user/account` - To permanently delete the user's account.
 */

import { ProfileSettings } from "@/components/settings/profile-settings";
import { DeleteAccount } from "@/components/settings/delete-account";
import { CreditCard, FileText, Info, LifeBuoy } from "lucide-react";
import { Link } from "@lexz451/next-nprogress";

const SettingsItem = ({ href, icon, title, description }: { href: string; icon: React.ReactNode; title: string; description: string }) => (
    <Link href={href}>
        <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 cursor-pointer h-full border">
            <div className="flex items-center space-x-4">
                {icon}
                <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
        </div>
    </Link>
);

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
                 <ProfileSettings />
                 <DeleteAccount />
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <SettingsItem href="/settings/billing" icon={<CreditCard className="h-6 w-6" />} title="Billing" description="Manage payment methods and view billing history." />
                <SettingsItem href="/settings/support" icon={<LifeBuoy className="h-6 w-6" />} title="Support" description="Get help or send a message to our team." />
                <SettingsItem href="/settings/about" icon={<Info className="h-6 w-6" />} title="About Us" description="Learn more about our company and mission." />
                <SettingsItem href="/settings/terms" icon={<FileText className="h-6 w-6" />} title="Terms of Service" description="Read our terms of service." />
            </div>
        </main>
    </div>
  );
}
