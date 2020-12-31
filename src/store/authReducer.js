export const setAuthenticated = () => {
    return {
        type: "set_authenticated",
    };
};

export const setUserId = (userId) => {
    return {
        type: "set_userId",
        userId: userId,
    };
};

export const setToken = (token) => {
    return {
        type: "set_token",
        token: token,
    };
}

export const setToLogin = (value) => {
    return {
        type: "set_toLogin",
        value: value,
    };
}