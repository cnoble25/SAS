// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
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
const analytics = getAnalytics(app);

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
                  nameOfArt: cells[4],
                  campus: cells[5],
                  building: [6],
                  floor: cells[7],
                  room: cells[8],
                  picture: cells[9],
                  gif: cells[10],
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