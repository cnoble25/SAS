import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyDDuxw8usHrNnpBSFVG7QL4VQ0Iqwj3W2g",
  authDomain: "softwareengineering-e29f1.firebaseapp.com",
  projectId: "softwareengineering-e29f1",
  storageBucket: "softwareengineering-e29f1.appspot.com",
  messagingSenderId: "232142952313",
  appId: "1:232142952313:web:dff5ac81bad1bce13c81a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//ONLY RUN IF THE DATABASE IS SCREWED
export async function clearDatabase () {
  const studentPieces = await getDocs(collection(db, "student-art-show"));
  studentPieces.forEach((piece) =>{
    deleteDoc(doc(db, "student-art-show", piece.id));
  } );
}


//makes it so you can add csv data to a database
export async function importCSVToDatabase () {
  const studentPieces = await getDocs(collection(db, "student-art-show"));
    studentPieces.forEach((piece) =>{
      deleteDoc(doc(db, "student-art-show", piece.id));
    } );
    // try{
     var file = document.getElementById("URL").files[0];
          var reader = new FileReader();
          var BFCList;
          var img;
          var makeSure = prompt("please enter the name of the file to upload the file to the database");
          if(makeSure != file.innerHTML){
          reader.onload = function(event) {
            var csvData = event.target.result;
            var rows = csvData.split("\n");
            for (var i = 0; i < rows.length; i++) {
              var cells = rows[i].split(",");
             BFCList = getBFC(cells[4]);
              try {
                if(cells[5].toUpperCase() == "Y"){
                  console.log(cells.length);
                if(cells.length === 12){
                  console.log("hi");
                const docRef = addDoc(collection(db, "student-art-show"), {
                  name: cells[2] + " " + cells[1].substring(0,1),
                  year: cells[3],
                  class: cells[4],
                  campus: makeCampus(cells[6].toUpperCase()),
                  building: cells[7].toUpperCase(),
                  floor: cells[8],
                  room: cells[9],
                  picture: cells[11],
                  ArtistStatement: cells[10],
                });
                console.log("Document written with ID: ", docRef.id);
              }else{
                const docRef = addDoc(collection(db, "student-art-show"), {
                  name: cells[2] + " " + cells[1].substring(0,1),
                  year: cells[3],
                  class: cells[4],
                  campus: makeCampus(cells[6].toUpperCase()),
                  building: cells[7].toUpperCase(),
                  floor: cells[8],
                  room: cells[9],
                  ArtistStatement: cells[10],
                });
                console.log("Document written with ID: ", docRef.id);
              }
                // console.log("Document written with ID: ", docRef.id);
              } 
            }
              catch (e) {
                console.error("Error adding student to database: ", e);
                alert("file not uploaded for safety")
              }
              
            }
          };
          reader.readAsText(file);
          file.innerHTML = null;
  
        }else{
          console.log(file.innerHTML);
          alert("file not uploaded for safety")
        }
  }

  //separates a room number into its building, floor and campus
  //NOT USED ANYMORE
  function getBFC(stuff){
    var list = [];
    for(var i = 0; i<stuff.length; i++ ){
      try{ 
        if(stuff.substring(i,i+1) == "-"){
          if(stuff.substring(0, i).toUpperCase() == "SCAS" || stuff.substring(0, i).toUpperCase() == "AS" || stuff.substring(0, i).toUpperCase() == "RH" || stuff.substring(0, i).toUpperCase() == "LLC" || stuff.substring(0, i).toUpperCase() == "GH" || stuff.substring(0, i).toUpperCase() == "LC" || stuff.substring(0, i).toUpperCase() == "LD" || stuff.substring(0, i).toUpperCase() == "GR"){
            list.push(stuff.substring(0));
            list.push(stuff.substring(0,i));
            list.push(stuff.substring(i+1, i+2));
            list.push("Upper School");
          }else{
            list.push(stuff.substring(i+1));
            list.push(stuff.substring(0,i));
            list.push(stuff.substring(i+1, i+2));
            list.push("Lower School");
          }
          
        }
      } catch(e){
        console.log(e);
      }
    }
    return list;
  }

  //doesn't do anything anymore
  function getPaintingCampus(painting){
    if(painting.campus.toUpperCase() == "Upper School"){
      return 2;
    }else if (painting.campus.toUpperCase() == "Lower School"){
      return 1;
    }else {
      return -1;
    }
  }

  //poosition can only be accessed asyncronesly so to find someones position in accordance to the buildings would be 
  //doesn't do anything anymore
 function makeImageUsable(imgURL){
  return imgURL;
 }
//Used to Make the Campuses in the database fit with the Campuses
//used for the geolocation api because the sheet takes in campuses
//as GR and BEL for US and LS respectively
function makeCampus(thing){
  if(thing.toUpperCase() == "BEL"){
    return "Lower School";
  }
  if(thing.toUpperCase() == "GR"){
    return "Upper School";
  }
}