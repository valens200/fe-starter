/**
 * function that takes a key string like 'name' or 'name.first' and returns a function that takes an object and returns the value of the key in the object
 * @param key - the key to get the value of
 * @param obj - the object to get the value from
 */
export const getObjValue = (key: string | number, obj: any) => {
  const keys = key.toString().split(".");
  let result = obj;
  for (const key of keys) {
    if (result && Object.prototype.hasOwnProperty.call(result, key)) {
      result = result[key];
    } else {
      return undefined;
    }
  }
  return result as string;
};

export const generatePageTitle = (title: string) => {
  return "EDS | ".concat(title);
};
