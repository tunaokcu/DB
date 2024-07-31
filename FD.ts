import { isSubsetOf } from "./SetFunctions";

export default class FD{
    alpha: Set<string>;
    beta: Set<string>;

    constructor(alpha: Set<string> | string, beta: Set<string> | string){
        if (typeof alpha === "string"){
            alpha = new Set([alpha]);
        }

        if (typeof beta === "string"){
            beta = new Set([beta]);
        }

        this.alpha = alpha;
        this.beta = beta;
    }

    //Holds if in a -> b, b is a subset of a
    isTrivial(): boolean{
        return isSubsetOf(this.beta, this.alpha);
    }
}