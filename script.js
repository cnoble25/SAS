import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvCDMq7-FjtGDB8-GbftTbo6uJhkG9rXU",
  authDomain: "student-art-show.firebaseapp.com",
  projectId: "student-art-show",
  storageBucket: "student-art-show.appspot.com",
  messagingSenderId: "448958994593",
  appId: "1:448958994593:web:aa904aab9761338e2e78e0",
  measurementId: "G-860F68ZWPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//makes it so you can add csv data to a database
export async function importCSVToDatabase () {
    const studentPeices = await getDocs(collection(db, "Student Art Pieces"));
  
    // try{
     var file = document.getElementById("URL").files[0];
          var reader = new FileReader();
          reader.onload = function(event) {
            var csvData = event.target.result;
            var rows = csvData.split("\n");
            for (var i = 0; i < rows.length; i++) {
              var cells = rows[i].split(",");
              if(cells[7] == "VA"){
              try {
                const docRef = addDoc(collection(db, "Student Art Pieces"), {
                  name: cells[0],
                  year: cells[1],
                  class: cells[2],
                  medium: cells[3],
                  campus: cells[4],
                  building: [5],
                  floor: cells[6],
                  room: cells[7],
                  picture: cells[8],
                  gif: cells[9],
                });
                console.log("Document written with ID: ", docRef.id);
              } 
              catch (e) {
                console.error("Error adding student to database: ", e);
              }
              }
            }
          };
          reader.readAsText(file);
  
    document.getElementsByTagName("body").style.cursor = "auto";
  }
// in progress
  export async function getLocation() {
    var location = []
    
    if (navigator.geolocation) {
       location.push(navigator.geolocation.getCurrentPosition().position.coords.latitude);
       location.push(navigator.geolocation.getCurrentPosition().position.coords.longitude);
    }
      return location;
  }
  console.log("hello");

  //separates a room number into its building, floor and room
  function getBFR(stuff){
    var list = [];
    for(var i = 0; i<stuff.length; i++ ){
      try{ 
        if(stuff.substring(i,i+1) == "-"){
          if(stuff.substring(0, i).toUpperCase() == "SCAS" || stuff.substring(0, i).toUpperCase() == "AS" || stuff.substring(0, i).toUpperCase() == "RH" || stuff.substring(0, i).toUpperCase() == "LLC" || stuff.substring(0, i).toUpperCase() == "GH" || stuff.substring(0, i).toUpperCase() == "LC" || stuff.substring(0, i).toUpperCase() == "LD"){
            list.push(stuff.substring(0,i));
            list.push(stuff.substring(i+1));
            list.push(stuff.substring(i+1, i+2));
            list.push("US");
          }else{
            list.push(stuff.substring(0,i));
            list.push(stuff.substring(i+1));
            list.push(stuff.substring(i+1, i+2));
            list.push("LS");
          }
          
        }
      } catch(e){
        console.log("shit");
      }
    }
    return list;
  }

  console.log(getBFR("AS-100"));


