// utils/flattenI18n.js

/**
 * Recursively flattens a nested object.
 * Example:
 * {
 *   a: { b: { c: 'value' } }
 * } becomes:
 * {
 *   'a.b.c': 'value'
 * }
 */
export function flattenObject(obj, prefix = '') {
  let result = {};
  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, newKey));
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

/**
 * Returns a flat list of all i18n translation values (for search).
 * Example: ['Login', 'Welcome', 'Search Results', ...]
 */
export function getAllI18nTexts(i18nInstance, lang = 'en') {
  const bundle = i18nInstance.getResourceBundle(lang, 'translation');
  const flat = flattenObject(bundle);
  return Object.values(flat);
}

/**
 * Optional: Returns a flat map of key-value pairs of all i18n strings.
 * Example: { 'profile.login': 'Login', 'home.title': 'Welcome' }
 */
export function getAllI18nTextsWithKeys(i18nInstance, lang = 'en') {
  const bundle = i18nInstance.getResourceBundle(lang, 'translation');
  return flattenObject(bundle);
}
