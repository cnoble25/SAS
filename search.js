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
// this function is the search function for the search page it creates displays for each peice of artwork in the database in which it puts them into a dive and then divs the elements for organization
export async function DisplayStudentSearchData(){
    const studentPieces = await getDocs(collection(db, "Student Art Pieces"));
    var content = document.getElementById("content");
    content.innerHTML = "";
    studentPieces.forEach((item) => {
        if(item.data().name.toLocaleUpperCase().includes(document.getElementById("searchInput").value.toUpperCase())){
          var row = document.createElement("div");
          row.setAttribute('class', "row");
          //make div for image and adds image to div
          var left = document.createElement("div");
          left.setAttribute("class", "profileleft");
          var image = document.createElement("img")
          image.setAttribute("src", item.data().picture);
          left.appendChild(image);
          // makes div for info for each artwork
          var right = document.createElement("div");
          right.setAttribute("class", "profileright");
          //make title for each person's artwork (is just their name)
          var title = document.createElement("h1");
          title.innerHTML = item.data().name;
          right.appendChild(title);
          //creates the class part of the div
          var classTitle = document.createElement("h3");
          classTitle.innerHTML = "Class: ";
          right.appendChild(classTitle);
          var group = document.createElement("h4");
          group.innerHTML = item.data().class;
          right.appendChild(group);
          //creates the year part of the div
          var roomTitle = document.createElement("h3");
          roomTitle.innerHTML = "Room: ";
          right.appendChild(roomTitle);
          var rgroup = document.createElement("h4");
          rgroup.innerHTML = item.data().room;
          right.appendChild(rgroup);
          var goToPage = document.createElement('button');
          goToPage.innerHTML = 'click here to get more info';
          goToPage.setAttribute('onclick', function(){
            localStorage.setItem("itemId", item);
            location.replace("");
          });
          





          //appending the stuff into the row area
          content.appendChild(document.createElement("br"));
          content.appendChild(document.createElement("br"));
          row.appendChild(left);
          row.appendChild(right);
          content.appendChild(row);
          content.appendChild(document.createElement("br"));
          content.appendChild(document.createElement("br"));
         
        }
    });
   }
   //run it once so it shows by default when the page is opened
   DisplayStudentSearchData();
   