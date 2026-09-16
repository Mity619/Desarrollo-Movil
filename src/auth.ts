export const AUTH_KEY = "logged";

export const isLoggedIn = (): boolean =>
    localStorage.getItem(AUTH_KEY) === "true";

export const login = (): void => {
    localStorage.setItem(AUTH_KEY, "true");
};

export const logout = (): void => {
    localStorage.removeItem(AUTH_KEY);
};