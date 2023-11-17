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
const db = getFirestore(app);

export async function DisplayStudentSearchData(){
    const studentPieces = await getDocs(collection(db, "Student Art Pieces"));
    var content = document.getElementById("content");
    content.innerHTML = "";
    studentPieces.forEach((item) => {
        if(item.data().name.toLocaleUpperCase().includes(document.getElementById("searchInput").value.toUpperCase())){
         
  
          var newPara = document.createElement("label");
          newPara.innerHTML = item.data().name + ", " + item.data().class + ", " + item.data().campus +  ", " + item.data().building + ", " + item.data().floor + ", "+ item.data().room;
          content.appendChild(document.createElement("br"));
          content.appendChild(document.createElement("br"));
          content.appendChild(newPara);
          content.appendChild(document.createElement("br"));
          content.appendChild(document.createElement("br"));
        }
    });
   }
   DisplayStudentSearchData();
   