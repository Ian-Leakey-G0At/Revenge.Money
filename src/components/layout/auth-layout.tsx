/**
 * @file Defines the layout for authentication pages, such as login and signup.
 *
 * This layout centers its content both vertically and horizontally, providing a clean
 * and focused view for user authentication forms.
 */

/**
 * The layout component for authentication pages.
 *
 * It creates a full-height container and centers the children content, making it
 * suitable for forms or other focused UI elements.
 *
 * @param {{ children: React.ReactNode }} props - The props for the component.
 * @returns {JSX.Element} The rendered authentication layout.
 * @example
 * <AuthLayout>
 *   <LoginForm />
 * </AuthLayout>
 */
export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            {children}
        </div>
    );
};
