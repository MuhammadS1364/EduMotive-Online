export const SESSION_KEY = 'edumotive-admin-key';
export const k = () => sessionStorage.getItem(SESSION_KEY) ?? '';
