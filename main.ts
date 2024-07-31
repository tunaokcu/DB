import Relation from "./Relation";
import FD from "./FD";
import { decompositionToName } from "./Gemini";

//Decompose tables into BCNF and suggest names for them 
//Returns a 2D array of relations, where each array is the original relation decomposed into BCNF form
//Of course if a table is already in BCNF form it's array of tables is going to contain just one table, itself.
async function decomposeTablesBCNF(tables: Array<Relation>): Promise<Relation[][]>{
    let decomposedRelations: Relation[][] = tables.map(() => []);

    //Locks
    let locks = []

    for (let i = 0; i < tables.length; i++){
        let table = tables[i]

        let tableNormalized: Relation[] = table.normalizeIntoBCNF();
        decomposedRelations[i] = tableNormalized;



        //If tables weren't already normalized, we must have decomposed them into more than 1+ tables
        if (tableNormalized.length > 1){
            locks.push(
                decompositionToName(table.toString(), tableNormalized.map((t) => t.toString())).then((returnedNames) => {
                    returnedNames.map((suggestedName, j) => {
                        decomposedRelations[i][j].title = suggestedName;
                    }) //Take returned names and set them
                }
            ));
        }
    }

    //Syncronize before returning: make sure every promise is back
    await Promise.all(locks);

    return decomposedRelations;
}

//Will also name the tables.
function parseTables(input: string): Array<Relation>{
    let relations: Array<Relation> = [];

    //TODO

    return relations;
}

//Driver function
async function main(input: string): Promise<string>{
    let tables: Array<Relation> = parseTables(input);
    
    let decomposedTables: Relation[][] = await decomposeTablesBCNF(tables);

    return "";
}

//TODO NEXT: also mention candidate keys

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

async function test(){
    await decomposeTablesBCNF([relation]).then((res) => console.log(res));
}

test()