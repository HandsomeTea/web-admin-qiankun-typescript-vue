const typeIs = (data: unknown): string => toString.call(data).replace(/object|\[|]|\s/g, '').toLowerCase();

export { typeIs };
export const isString = (data: unknown): boolean => typeIs(data) === 'string';
export const isObject = (data: unknown): boolean => typeIs(data) === 'object';
export const isArray = (data: unknown): boolean => typeIs(data) === 'array';
export const isNumber = (data: unknown): boolean => typeIs(data) === 'number';
export const isBoolean = (data: unknown): boolean => typeIs(data) === 'boolean';
export const isDate = (data: unknown): boolean => typeIs(data) === 'date';
export const isFunction = (data: unknown): boolean => typeIs(data).includes('function');
export const isPromise = (data: unknown): boolean => typeIs(data) === 'promise';
export const isPromiseFn = (data: unknown): boolean => typeIs(data) === 'asyncfunction';
export const isUndefined = (data: unknown): boolean => typeIs(data) === 'undefined';
export const isNull = (data: unknown): boolean => typeIs(data) === 'null';
export const isError = (data: unknown): boolean => typeIs(data) === 'error';
export const isSet = (data: unknown): boolean => typeIs(data) === 'set';
export const isMap = (data: unknown): boolean => typeIs(data) === 'map';
export const isSymbol = (data: unknown): boolean => typeIs(data) === 'symbol';
