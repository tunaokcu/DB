export {isSubsetOf, setEquals, union, intersection, setSubtraction};

function isSubsetOf(subset: Set<any>, superset: Set<any>): boolean{
    for (let elem of subset) {
        if (!superset.has(elem)) {
            return false;
        }
    }
    return true;
};

function setEquals(set1: Set<any>, set2: Set<any>){
    if (set1.size !== set2.size){
        return false;
    }

    for (const element of set1){
        if (!set2.has(element)){
            return false;
        }
    }

    return true;
}

function union(set1: Set<any>, set2: Set<any>){
    let res = new Set(set1);

    for (const element of set2){
        res.add(element);
    }   

    return res;
}

function intersection(set1: Set<any>, set2: Set<any>){
    let res: Set<any> = new Set();

    for (const element of set2){
        if (set1.has(element)){
            res.add(element);
        }
    }   

    return res;
}


//set1 - set2
function setSubtraction(set1: Set<any>, set2: Set<any>){
    let res = new Set(set1);

    for (const elem of set2){
        res.delete(elem);
    }

    return res;
}