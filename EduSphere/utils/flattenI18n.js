// utils/flattenI18n.js

export function flattenObject(obj, prefix = '') {
    let result = {};
    for (const key in obj) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null) {
        Object.assign(result, flattenObject(value, newKey));
      } else {
        result[newKey] = value;
      }
    }
    return result;
  }
  
  export function getAllI18nTexts(i18nInstance, lang = 'en') {
    const bundle = i18nInstance.getResourceBundle(lang, 'translation');
    const flat = flattenObject(bundle);
    return Object.values(flat); // Liste de tous les textes traduits
  }
  