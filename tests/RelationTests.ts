import Relation from "../Relation";
import FD from "../FD";

//https://www.geeksforgeeks.org/functional-dependency-and-attribute-closure/
//Passes tests
function test(): void{
    let STUD_NO = "STUD_NO"
    let STUD_NAME = "STUD_NAME"
    let STUD_PHONE = "STUD_PHONE"
    let STUD_STATE = "STUD_STATE"
    let STUD_COUNTRY = "STUD_COUNTRY"
    let STUD_AGE = "STUD_AGE" 
    
    let attributes: Set<string> = new Set([STUD_NO, STUD_NAME, STUD_PHONE, STUD_STATE, STUD_COUNTRY, STUD_AGE])
    let FDs: Array<FD> = [
        new FD(STUD_NO, STUD_NAME),
        new FD(STUD_NO, STUD_PHONE),
        new FD(STUD_NO, STUD_STATE),
        new FD(STUD_NO, STUD_COUNTRY),
        new FD(STUD_NO, STUD_AGE),
        new FD(STUD_STATE, STUD_COUNTRY)
    ];

    let relation = new Relation(attributes, null, FDs);

    /*
    console.log(relation.attributeClosure(STUD_NO))
    console.log(relation.attributeClosure(STUD_STATE))
    console.log(relation.attributeClosure(new Set([STUD_NO, STUD_NAME])))
    console.log(relation.isSuperkey(STUD_STATE));
    */
   
    let normalized: Array<Relation> =  relation.normalizeIntoBCNF()

    for (const rel of normalized){
        console.log(rel.attributes);
    }
}

function normalizationTest(): void{
    const [A, B, C, D, E, F, G] = ["A", "B", "C", "D", "E", "F", "G"]; 

    
    let attributes: Set<string> = new Set([A, B, C, D, E, F, G])
    let FDs: Array<FD> = [
        new FD(new Set([C, E]), A),
        new FD(new Set([B, D]), E),
        new FD(C, B)
    ];

    let relation = new Relation(attributes, A, FDs);

    let normalized: Array<Relation> =  relation.normalizeIntoBCNF()

    for (const rel of normalized){
        console.log(rel.attributes);
    }
}

function stringifyTest(): void{
    let STUD_NO = "STUD_NO"
    let STUD_NAME = "STUD_NAME"
    let STUD_PHONE = "STUD_PHONE"
    let STUD_STATE = "STUD_STATE"
    let STUD_COUNTRY = "STUD_COUNTRY"
    let STUD_AGE = "STUD_AGE" 
    
    let attributes: Set<string> = new Set([STUD_NO, STUD_NAME, STUD_PHONE, STUD_STATE, STUD_COUNTRY, STUD_AGE])
    let FDs: Array<FD> = [
        new FD(STUD_NO, STUD_NAME),
        new FD(STUD_NO, STUD_PHONE),
        new FD(STUD_NO, STUD_STATE),
        new FD(STUD_NO, STUD_COUNTRY),
        new FD(STUD_NO, STUD_AGE),
        new FD(STUD_STATE, STUD_COUNTRY)
    ];

    let relation = new Relation(attributes, null, FDs);

    console.log(relation.toString())
}

function Q2Test(): void{
    let attributes: Set<string> = new Set(["A", "B", "C", "D"])
    let FDs: Array<FD> = [
        new FD(new Set(["A"]), new Set(["B", "C"])),
        new FD(new Set(["B"]), new Set(["D"])),
        new FD(new Set(["C"]), new Set(["D"]))
    ];

    let relation = new Relation(attributes, null, FDs);

    console.log(relation.normalizeIntoBCNF())
}

function Q4Test(): void{
    let attributes: Set<string> = new Set(["A", "B", "C", "D", "E", "F"])
    let FDs: Array<FD> = [
        new FD("A", new Set(["B", "C"])),
        new FD(new Set(["A", "D"]), "F"),
        new FD(new Set(["A", "F"]), "E")
    ];

    let relation = new Relation(attributes, null, FDs);

    console.log(relation.normalizeIntoBCNF())
}

//!BUG slides 7 pg 55
function isBCNFTest(): void{
    let attributes: Set<string> = new Set(["A", "B", "C", "D", "E"])
    let FDs: Array<FD> = [
        new FD("A", new Set(["B"])),
        new FD(new Set(["B", "C"]), "D")
    ];

    let relation = new Relation(attributes, null, FDs);

    console.log(relation.normalizeIntoBCNF())}

    isBCNFTest();