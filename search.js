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
            var row = document.createElement("div");
            row.setAttribute('class', "row");
            //for image
            var left = document.createElement("div");
            left.setAttribute("class", "profileleft");
            //for description
            var right = document.createElement("div");
            right.setAttribute("class", "profileright");

            var title = document.createElement("h1");
            title.innerHTML = item.data().name;
            right.appendChild(title);

            var classTitle = document.createElement("h3");
          classTitle.innerHTML = "Class: ";
          right.appendChild(classTitle);
          var group = document.createElement("h4");
          group.innerHTML = item.data().class;
          right.appendChild(group);

          var yearTitle = document.createElement("h3");
          yearTitle.innerHTML = "year: ";
          right.appendChild(yearTitle);
          var ygroup = document.createElement("h4");
          ygroup.innerHTML = item.data().year;
          right.appendChild(ygroup);





  
          content.appendChild(document.createElement("br"));
          content.appendChild(document.createElement("br"));
            row.appendChild(left);
            row.appendChild(right);
          content.appendChild(document.createElement("br"));
          content.appendChild(document.createElement("br"));
          content.appendChild(row);
        }
    });
   }
   DisplayStudentSearchData();
   