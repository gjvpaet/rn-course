import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes'

const initialState = {
    places: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,
                places: state.places.concat({
                    key: Math.random(),
                    name: action.placeName,
                    image: {
                        uri: "http://i0.kym-cdn.com/entries/icons/original/000/021/065/gudetama.png"
                    }
                })
            };
            break;
        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => place.key !== action.placeKey)
            };
            break;
        default:
            return state;
            break;
    }
};

export default reducer;