// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, image) {
   // Here is the HTML formatting for our mission target div.
   let output = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${image}">`
    ;
    document.getElementById("missionTarget").innerHTML = output;
   
}

function validateInput(testInput) {
    if (testInput == "") {
        return "Empty";
    } else if (testInput == null) {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else if (!isNaN(testInput)) {
        return "Is a Number";
    };
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
   if ((validateInput(pilot)=== "Empty") || (validateInput(copilot)==="Empty") || (validateInput(fuelLevel)==="Empty") || (validateInput(cargoMass)==="Empty")) {
       alert("All fields are required!");
   }

   if ((validateInput(pilot)==="Is a Number") || (validateInput(copilot)==="Is a Number") || (validateInput(fuelLevel)==="Not a Number") || (validateInput(cargoMass)==="Not a Number")) {
       alert("Make sure to enter valid information for each field!");
   }

   document.getElementById("pilotStatus").innerHTML=`Pilot ${pilot} is ready for launch`;
   document.getElementById("copilotStatus").innerHTML=`Co-pilot ${copilot} is ready for launch`;

   if (fuelLevel < 10000 && cargoMass <= 10000) {
       list.style.visibility = "visible";
       document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
       document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
       document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
       document.getElementById("launchStatus").style.color = "red";
   }

   if (fuelLevel >= 10000 && cargoMass > 10000) {
    list.style.visibility = "visible";
    document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
    document.getElementById("cargoStatus").innerHTML = "Cargo mass too heavy for launch";
    document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
    document.getElementById("launchStatus").style.color = "red";
}

if (fuelLevel < 10000 && cargoMass > 10000) {
    list.style.visibility = "visible";
    document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
    document.getElementById("cargoStatus").innerHTML = "Cargo mass too heavy for launch";
    document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
    document.getElementById("launchStatus").style.color = "red";
}

if (fuelLevel >= 10000 && cargoMass <= 10000) {
    list.style.visibility = "visible";
    document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
    document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
    document.getElementById("launchStatus").innerHTML = "Shuttle is Ready for Launch";
    document.getElementById("launchStatus").style.color = "green";
}
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
