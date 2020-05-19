import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comment';
import { PROMOTIONS } from '../shared/promotion';
import { LEADERS } from '../shared/leader';

export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    promotion: PROMOTIONS,
    leader: LEADERS
}

export const Reducer = (state = initialState, action) => {
    return state;
}