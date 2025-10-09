const placeholderUser = {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    avatarUrl: "/avatars/01.png",
};

export const useUser = () => {
    // For development, hardcode the user and admin status.
    return {
         user: placeholderUser,
         isAdmin: true // As requested, keep admin access true
    };
};
