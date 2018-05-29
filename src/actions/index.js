export const LOCALE_CHANGED = 'LOCALE_CHANGED';

export function changeLocale(locale) {
    return {
        type: LOCALE_CHANGED,
        payload: locale
    }
}