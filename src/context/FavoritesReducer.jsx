export const initialState = [];

export const favoritesReducer = (state, action) => {
    switch (action.type) {
        case "ADD_FAVORITE":
            return [...state, action.payload];

        case "REMOVE_FAVORITE":
            return state.filter((pet) => pet.id !== action.payload.id);

        case "TOGGLE_FAVORITE": 
        const exists = state.some((pet) => pet.id === action.payload.id);
        return exists
        ? state.filter((pet) => pet.id !== action.payload.id)
        : [...state, action.payload];

        case "SET_FAVORITES":
         return action.payload;

        default:
         return state;
    }
};