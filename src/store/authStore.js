const initialState = {
    authenticated: false,
    userId: null,
    token: null,
    toLogin: false,
}

const authStore = (state = initialState, action) => {
    switch (action.type) {
        case "set_authenticated": return {
            ...state,
            authenticated: true,
        };
        case "set_token": return {
            ...state,
            token: action.token,
        };
        case "set_userId": return {
            ...state,
            userId: action.userId,
        };
        case "set_toLogin": return {
            ...state,
            toLogin: action.value,
        };
        case "logout": return initialState;
        default: return state;
    }
}

export default authStore;