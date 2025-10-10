export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex justify-center items-center min-h-screen bg-background p-4 sm:p-6 lg:p-8">
            {children}
        </main>
    );
}
