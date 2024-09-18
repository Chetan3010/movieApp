const useSession = () => {
    const getSession = () => {
        const session = sessionStorage.getItem("session");
        return session ? JSON.parse(session) : null;
    };

    const isAuthenticated = () => {
        const session = getSession();
        return session && session.status === "authenticated";
    };

    const setSession = (sessionData) => {
        const session = {
            ...sessionData,
            status: "authenticated",
        };
        sessionStorage.setItem("session", JSON.stringify(session));
    };

    const clearSession = () => {
        sessionStorage.setItem(
            "session",
            JSON.stringify({ status: "unauthenticated" })
        );
    };

    return { getSession, isAuthenticated, setSession, clearSession };
};

export default useSession;