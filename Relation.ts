import {isSubsetOf, setEquals, union, intersection, setSubtraction} from "./SetFunctions";
import FD from "./FD";
import { deepCopy } from "./Utility";

//TODO could we use the strategy pattern for different normalizations?

export default class Relation{
    dependencies: FD[];
    attributes: Set<string>;
    title: string;

    constructor(attributes: Set<string> = new Set(), primaryKey: Set<string> | string | null = null, dependencies: FD[] = [], title: string = ""){
        this.title = title;

        this.attributes = attributes;
        this.dependencies = dependencies;

        //Add PK -> R to the dependencies:
        if (primaryKey){
            if (typeof primaryKey === "string"){
                primaryKey = new Set([primaryKey]);
            }
            this.dependencies.push(new FD(new Set(primaryKey), new Set(attributes)))
        }
    }
    toString(): string{
        let res = this.title;

        res += "("

        let n = this.attributes.size;
        let i = 0;
        for (const element of this.attributes){
            res += element 

            if (i != n - 1){
                res += ", "
            }

            i += 1;
        }

        res += ")"

        return res;
    }

    normalizeIntoBCNF(): Array<Relation>{
        let relations: Array<Relation> = [this];
        
        
        let violatingFD = this.findBCNFViolatingFD();

        if (violatingFD){
            let attributes1: Set<string> = union(violatingFD.alpha, violatingFD.beta);
            let attribtes2: Set<string> = setSubtraction(this.attributes, setSubtraction(violatingFD.beta, violatingFD.alpha))

            let relation1: Relation = this.relationFromAttributeSubset(attributes1);
            let relation2: Relation = this.relationFromAttributeSubset(attribtes2);

            relations = relation1.normalizeIntoBCNF().concat(relation2.normalizeIntoBCNF());
        }

        return relations;
    }

    findBCNFViolatingFD(): FD | null{
        //Check every non-trivial FD in relation
        for (const dependency of this.dependencies){
            //The FD violates BCNF
            if (this.FDViolatesBCNF(dependency)){
                return dependency;
            }
        } 

        return null;
    }

    FDViolatesBCNF(dependency: FD): boolean{
        return !dependency.isTrivial() && !this.isSuperkey(dependency.alpha)
    }   

    //TODO
    FDViolates3NF(dependency: FD): boolean{
        //TODO add third condition
        return this.FDViolatesBCNF(dependency);
    }

    //TODO
    enumerateCandidateKeys(): Array<Set<string>>{
        let candidates: Array<Set<string>> = [];

        return candidates;
    }

    isSuperkey(attribute: Set<string> | string): boolean{
        return setEquals(this.attributeClosure(attribute) ,this.attributes);
    }

    //TODO pg 355 has linear time algorithm. The current algorithm is quadratic(O(n^2))
    //Calculate the closure of an attribute set
    attributeClosure(attributeSet: Set<string> | string): Set<string>{
        if (typeof attributeSet === "string"){
            attributeSet = new Set([attributeSet]);
        }

        let closure: Set<string> = new Set(attributeSet);

        let hasChanged = false;
        //TODO
        do{
            hasChanged = false;
            for (const fd of this.dependencies){
                let alpha: Set<string> = fd.alpha;
                let beta: Set<string> = fd.beta;
                
                //alpha has to be a subset of closure and beta has to have dependencies not already in closure
                if (isSubsetOf(alpha, closure) && !isSubsetOf(beta, closure)){
                    for (const elem of beta){
                        closure.add(elem);
                    }
                    hasChanged = true;
                }
            }
        }while(hasChanged);

        return closure;
    }

    relationFromAttributeSubset(attributeSubset: Set<string>): Relation{
        let res = new Relation();

        //Add attributes
        for (const attribute of attributeSubset){
            res.attributes.add(attribute);
        }

        //Add relevant FDs
        for (const dependency of this.dependencies){
            //If alpha is not a subset of attributes, cannot take that FD
            if (!isSubsetOf(dependency.alpha, attributeSubset)){
                continue;
            }

            //Intersect betta and all attributes and take dependency only if it isn't trivial
            let dependencyCandidate = new FD(new Set(dependency.alpha), intersection(new Set(dependency.beta), attributeSubset));

            if (dependencyCandidate.isTrivial()){
                continue;
            }

            res.dependencies.push(dependencyCandidate);
        }

        return res;
    }

    FDHolds(dependency: FD): boolean{
        let beta: Set<string> = dependency.beta;
        let alpha: Set<string> = dependency.alpha; 

        let alphaClosure: Set<string> = this.attributeClosure(alpha);

        return isSubsetOf(beta, alphaClosure);
    }

    computeCanonicalCover(): Array<FD>{ 
        let canonicalCover: Array<FD> = deepCopy(this.dependencies); 

        let changed: Boolean = false;
        do{
            changed = false;
            
            //Union rule
            //canonicalCover = this.applyUnionRule(canonicalCover);
            //TODO
        }while(changed)

        return canonicalCover;
    }   

    //TODO
    /*
    applyUnionRule(dependencies: Array<FD>): Array<FD>{
        let alphas = {};

        for (const dependency of dependencies){
            if (!alphas.hasOwnProperty(dependency.alpha))
        }
    }*/
    /*
    //Will compute the closure of dependencies and store them in dependencies
    computeFClosure(): void{
        this.applyReflexivity();
        

        let FClosureChanged = true;
        do{

        }while(FClosureChanged)
    }

    //Generates all trivial dependencies
    private applyReflexivity(): void{

    }
    */
}

