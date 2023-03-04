const ironArray = (item, joiner = '') =>
    item === null || item === undefined
        ? ''
        : Array.isArray(item)
        ? item.join(joiner)
        : item;

const capeArray = (item) =>
    item === null || item === undefined
        ? []
        : Array.isArray(item)
        ? item
        : [item];

const objectifyArray = (array, key = 'id') =>
    array.reduce((obj, item) => {
        if (key in item) obj[item[key]] = item;
        return obj;
    }, {});

const bucketArray = (array, byKey = 'id', defaultKey = 'item') =>
    array.reduce((obj, item) => {
        try {
            const key = item[byKey] || defaultKey || 'ukn';
            if (key in obj) obj[key].push(item);
            else obj[key] = [item];
            return obj;
        } catch (e) {
            console.error(e, array);
        }
    }, {});

const isSubset = (primeArray, subArray) => {
    if (!Array.isArray(primeArray) || !Array.isArray(subArray)) return false;
    // console.log(`Looking for ${subArray} in ${primeArray}`);
    for (const sub of subArray) {
        if (!primeArray.includes(sub)) return false;
    }
    return true;
};

const notSubset = (primeArray, subArray) => {
    if (!Array.isArray(primeArray) || !Array.isArray(subArray)) return false;
    for (const sub of subArray) {
        if (primeArray.includes(sub)) return false;
    }
    return true;
};

const filterUnique = (v, i, a) => a.indexOf(v) === i;

const filterUniqueByObjectKey =
    (key = 'id') =>
    (curr, i, array) =>
        array.findIndex((e) => e[key] === curr[key]) === i;

exports.arrayUtil = {
    iron: ironArray,
    cape: capeArray,
    objectify: objectifyArray,
    bucket: bucketArray,
    isSubset,
    notSubset,

    filter: {
        unique: filterUnique,
        uniqueByKeyFn: filterUniqueByObjectKey,
    },
};
