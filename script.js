import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
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
const db = getFirestore(app);




//makes it so you can add csv data to a database
export async function importCSVToDatabase () {
  const studentPieces = await getDocs(collection(db, "Student Art Pieces"));
    studentPieces.forEach((piece) =>{
      deleteDoc(doc(db, "Student Art Pieces", piece.id));
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
             img = makeImageUsable(cells[5]);

              try {
                const docRef = addDoc(collection(db, "Student Art Pieces"), {
                  name: cells[0],
                  year: cells[1],
                  class: cells[2],
                  medium: cells[3],
                  campus: BFCList[3],
                  building: BFCList[1],
                  floor: BFCList[2],
                  room: BFCList[0],
                  picture: img,
                  gif: cells[6],
                });
                console.log("Document written with ID: ", docRef.id);
              } 
              catch (e) {
                console.error("Error adding student to database: ", e);
              }
              
            }
          };
          reader.readAsText(file);
          file.innerHTML = null;
  
    document.getElementsByTagName("body").style.cursor = "auto";
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
          if(stuff.substring(0, i).toUpperCase() == "SCAS" || stuff.substring(0, i).toUpperCase() == "AS" || stuff.substring(0, i).toUpperCase() == "RH" || stuff.substring(0, i).toUpperCase() == "LLC" || stuff.substring(0, i).toUpperCase() == "GH" || stuff.substring(0, i).toUpperCase() == "LC" || stuff.substring(0, i).toUpperCase() == "LD"){
            list.push(stuff.substring(i+1));
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
  var latitude;
  var longitude;
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
  return "https://drive.google.com/uc?export=view&id=" + imgURL.substring(32, 65);
 }