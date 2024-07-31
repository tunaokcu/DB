export {}

const KEY = "AIzaSyCibiPLqQl8e6-Yuw81zNRSJZt2bsTyCT0";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI = new GoogleGenerativeAI(KEY);
const TEXT_MODEL = GEMINI.getGenerativeModel({ model: "gemini-pro"});

export async function sendPrompt(prompt: string): Promise<string>{
    const result = await TEXT_MODEL.generateContent(prompt);
    const response = await result.response;
    return response.text();
}

export async function decompositionToName(beforeDecomposition: string, decompositions: Array<string>): Promise<Array<string>>{
    //Base
    let query: string = "A database table in relational form, " + beforeDecomposition + " is decomposed into the following tables with temporary names: "

    //Tables and \n
    query = query.concat(...decompositions.map((s) => s + "\n"));


    //Request
    query = query.concat("Find suitable names for these tables. Just state their names in order, do not mention anything else. Do not mention their old names or their attributes. Seperate them with commas with no space in between.");
    const response = await sendPrompt(query);

    //Parse response
    let tables = response.split(",").map((s) => s.trim());
    return tables;
}

export async function descriptionToTables(description: string): Promise<string>{
    //Base
    let query: string = "A description is provided:\n" + description + "\nProvide a list of database tables in the relational model. Remember that EVERY table must have a PK(primary key), but FKs(foreign keys) are optional.\n" 
    let format: string = "For the description, " + "'Design a database for an ecommerce system'" + "your response should look like this:" + `\n 
    FLIGHTS(flight_number, departure_airport, arrival_airport)
      departure_airport: FK to AIRPORTS(airport_code)
      arrival_airport: FK to AIRPORTS(airport_code)
      PK: (flight_number)

    AIRPORTS(airport_code, airport_name, city, country)
        PK: (airport_code)

    PASSENGERS(passenger_id, name, email, phone_number)
        PK: (passenger_id)

    RESERVATIONS(reservation_id, flight_number, passenger_id, seat_number)
        flight_number: FK to FLIGHTS(flight_number)
        passenger_id: FK to PASSENGERS(passenger_id)
        PK: (reservation_id)
    ` 
    query = query + format;
    const response = await sendPrompt(query);

    let confirmation: string = "Does your response fit the format? If it does, just paste the response. Else, reformulate your response. Format: " + format + "\nYour response: " + response

    const finalResponse = await sendPrompt(confirmation);

    return finalResponse
}


export async function tableAndFeedbackToNewTable(description: string){

}

/*
let before = "in_dep(ID, name, salary, dept name, building, budget)"
let after = ["R1(dept name, building, budget)", "R2(ID, name, dept name, salary)"]

decompositionToName(before, after).then((res) => console.log(res));
*/

/*
let testStr = "Design a database for a fitness app";

descriptionToTables(testStr).then((val) => console.log(val))
*/

let newTableTest =     `FLIGHTS(flight_number, departure_airport, arrival_airport)
departure_airport: FK to AIRPORTS(airport_code)
arrival_airport: FK to AIRPORTS(airport_code)
PK: (flight_number)

AIRPORTS(airport_code, airport_name, city, country)
  PK: (airport_code)

PASSENGERS(passenger_id, name, email, phone_number)
  PK: (passenger_id)

RESERVATIONS(reservation_id, flight_number, passenger_id, seat_number)
  flight_number: FK to FLIGHTS(flight_number)
  passenger_id: FK to PASSENGERS(passenger_id)
  PK: (reservation_id)
` ;

sendPrompt("You provided the following tables:\n" + newTableTest + "\nHowever, they are not enough. Airports also have staff. Revise based on this feedback. Feel free to make other additions as well.").then((val) => sendPrompt("Please make more additions: \n" + val).then((v) => console.log(v)))