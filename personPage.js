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

//displays the information of an artwork for and individual page
export async function DisplayPersonalPageInfo(){
  const studentPieces = await getDocs(collection(db, "Student Art Pieces"));
  var Picture = document.getElementById("PersonalPagePicture");
  var description = document.getElementById("PersonalPageDescription");
  var Navi = document.getElementById("PersonalPageNavi");
  var itemId = localStorage.getItem("itemId");
  var  item = await doc(db, "Student Art Pieces", itemId);
  //needed to set the variable because doc does not get the doc as an item that you can find the data of for some god damn reason
  studentPieces.forEach((items) => {
    if(items.id == itemId){
      item = items;
    }
  })
  console.log(item);
  Picture.innerHTML = "";
  description.innerHTML = "";
  Navi.innerHTML = "";

  var image = document.createElement("img");
  image.src = item.data().picture;
  Picture.appendChild(image);

  var descriptionDivName = document.createElement("div");
  descriptionDivName.setAttribute("id", "descriptionDivName");
  var nameTitle = document.createElement("h4");
  nameTitle.innerHTML = "Name: ";
  var name = document.createElement("h5");
  name.innerHTML = item.data().name;
  descriptionDivName.appendChild(nameTitle);
  descriptionDivName.appendChild(name);
  description.appendChild(descriptionDivName);
} 
DisplayPersonalPageInfo();