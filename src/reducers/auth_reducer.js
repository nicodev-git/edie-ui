import { AUTH_USER, INVALIDATE_USER, AUTH_ERROR, FETCH_MESSAGE } from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, error: '', authenticated: true };
        case INVALIDATE_USER:
            return { ...state, error: '', authenticated: false };
        case AUTH_ERROR:
            return { ...state, error: action.msg };
        case FETCH_MESSAGE:
            return { ...state, message: action.payload };
    }
    return state;
}

