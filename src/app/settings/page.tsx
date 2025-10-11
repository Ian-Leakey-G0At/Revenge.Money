
import { ProfileSettings } from "@/components/settings/profile-settings";
import { DeleteAccount } from "@/components/settings/delete-account";
import { Button } from "@/components/ui/button";
import { CreditCard, FileText, Info, LifeBuoy } from "lucide-react";
import { Link } from "@lexz451/next-nprogress";


const SettingsItem = ({ href, icon, title, description }: { href: string; icon: React.ReactNode; title: string; description: string }) => (
    <Link href={href}>
        <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 cursor-pointer">
            <div className="flex items-center space-x-4">
                {icon}
                <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
                </div>
            </div>
            <Button variant="outline">View</Button>
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
                <SettingsItem href="/settings/billing" icon={<CreditCard />} title="Billing" description="Manage payment methods and view billing history." />
                <SettingsItem href="/settings/support" icon={<LifeBuoy />} title="Support" description="Get help or send a message to our team." />
                <SettingsItem href="/settings/about" icon={<Info />} title="About Us" description="Learn more about our company and mission." />
                <SettingsItem href="/settings/terms" icon={<FileText />} title="Terms of Service" description="Read our terms of service." />
            </div>
        </main>
    </div>
  );
}
