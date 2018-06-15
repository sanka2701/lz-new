export const required = value => (value ? undefined : 'error.field.required');
export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'error.email.invalid'
        : undefined;