export {deepCopy};

//!RROR
//ref: https://exploringjs.com/deep-js/ch_copying-objects-and-arrays.html#deep-copying-in-javascript
//https://www.geeksforgeeks.org/how-to-deep-clone-an-object-preserve-its-type-with-typescript/
function deepCopy<T>(obj: T): T{
  if (typeof obj !== 'object' || obj === null) {
    return obj;
}
const res: any = Array
    .isArray(obj) ? [] : {};
for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
        res[key] = deepCopy(obj[key]);
    }
}
return Object.assign(res, obj) as T;
}