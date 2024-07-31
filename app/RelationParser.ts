import Relation from "../Relation"

//TODO breaks when input is broken into lines ex:
/*
    table(r1, 
        r2,
        r3)
*/
/*
Example input
        table1(key1, key2, key3, key4)
            key1: FK to table2
        PK: (key1, key2) 
        FD: {(key1, key3) -> (key2), (key2) -> (key4)}  
*/
enum ParseState {
    parsingTableName,
    parsingTableKeys,
    
    finished
}
function parseRelations(input: string): Array<Relation>{
    let relations: Array<Relation> = [];

    let state: ParseState = ParseState.finished;

    for (const char of input){

    }

    return relations;
}