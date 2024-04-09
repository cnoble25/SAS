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
          if(makeSure != file.innerHTML || file.innerHTML.subtring(file.innerHTML.length-1) == "v"){
          reader.onload = function(event) {
            var csvData = event.target.result;
            var rows = csvData.split("\n");
            for (var i = 0; i < rows.length; i++) {
              var cells = rows[i].split(",");
             BFCList = getBFC(cells[4]);
              try {
                if(cells[5].toUpperCase() == "Y"){
                const docRef = addDoc(collection(db, "student-art-show"), {
                  name: cells[2] + " " + cells[1].substring(0,1),
                  year: cells[3],
                  class: cells[4],
                  campus: cells[6],
                  building: cells[7],
                  floor: cells[8],
                  room: cells[9],
                  picture: cells[11],
                  ArtistStatement: cells[10],
                });
                console.log("Document written with ID: ", docRef.id);
              } 
            }
              catch (e) {
                console.error("Error adding student to database: ", e);
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
 // made tp get which campus a painting is on when asked through the firebase doesn't need to be asyncronys because it will work only in async functions in the first place so its redudant
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
 
//converts the personal copied share link for google drive into links that work universally so that anyone can see the photos
 function makeImageUsable(imgURL){
  return imgURL;
 }