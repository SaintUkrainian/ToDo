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

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    return {
        type: "logout",
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => dispatch(logout()), expirationTime * 1000);
    };
};

export const checkAuth = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
        } else {
            const userId = localStorage.getItem("userId");
            const expirationDate = new Date(
                localStorage.getItem("expirationDate")
            );
            if (expirationDate < new Date()) {
                dispatch(logout());
            } else {
                dispatch(setToken(token));
                dispatch(setUserId(userId));
                dispatch(setAuthenticated());
                // dispatch(
                //     checkAuthTimeout(
                //         (expirationDate.getTime() - new Date().getTime()) / 1000
                //     )
                // );
            }
        }
    }
}