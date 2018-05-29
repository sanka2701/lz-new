import { LOCALE_CHANGED } from '../actions/index';

import skMessages from '../translations/sk';
import enMessages from '../translations/en';
import plMessages from '../translations/pl';

const localizedMessages = {
    en: enMessages,
    sk: skMessages,
    pl: plMessages
};

export default function (state = {}, action) {
    switch (action.type) {
        case LOCALE_CHANGED:
            let tmp = {
                ...state
            };

            tmp.locale = action.payload;
            tmp.messages = localizedMessages[action.payload];

            console.log('locale changed', tmp);

            return tmp;
        default:
            return state
    }
}