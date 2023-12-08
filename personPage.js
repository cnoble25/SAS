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

  var descriptionDivYear = document.createElement("div");
  descriptionDivYear.id = "descriptionDivYear";
  var yearTitle = document.createElement("h4");
  yearTitle.innerHTML = "Year: ";
  var year = document.createElement("h5");
  year.innerHTML = item.data().year;
  descriptionDivYear.appendChild(yearTitle);
  descriptionDivYear.appendChild(year);
  description.appendChild(descriptionDivYear);

  var descriptionDivCampus = document.createElement("div");
  descriptionDivCampus.id = "descriptionDivCampus";
  var campusTitle = document.createElement("h4");
  campusTitle.innerHTML = "Campus: ";
  var campus = document.createElement("h5");
  campus.innerHTML = item.data().campus;
  descriptionDivYear.appendChild(campusTitle);
  descriptionDivYear.appendChild(campus);
  description.appendChild(descriptionDivCampus);

  var descriptionDivRoom = document.createElement("div");
  descriptionDivRoom.id = "descriptionDivRoom";
  var roomTitle = document.createElement("h4");
  roomTitle.innerHTML = "Room: ";
  var room = document.createElement("h5");
  room.innerHTML = item.data().building + "-" + item.data().room;
  descriptionDivYear.appendChild(roomTitle);
  descriptionDivYear.appendChild(room);
  description.appendChild(descriptionDivRoom);

  var descriptionDivYear = document.createElement("div");
  descriptionDivYear.id = "descriptionDivYear";
  var yearTitle = document.createElement("h4");
  yearTitle.innerHTML = "Year: ";
  var year = document.createElement("h5");
  year.innerHTML = item.data().year;
  descriptionDivYear.appendChild(yearTitle);
  descriptionDivYear.appendChild(year);
  description.appendChild(descriptionDivYear);

  var descriptionDivMedium = document.createElement("div");
  descriptionDivMedium.id = "descriptionDivMedium";
  var mediumTitle = document.createElement("h4");
  mediumTitle.innerHTML = "Medium: ";
  var medium = document.createElement("h5");
  medium.innerHTML = item.data().medium;
  descriptionDivMedium.appendChild(mediumTitle);
  descriptionDivMedium.appendChild(medium);
  description.appendChild(descriptionDivMedium);

  var descriptionDivCourse = document.createElement("div");
  descriptionDivCourse.id = "descriptionDivCourse";
  var courseTitle = document.createElement("h4");
  courseTitle.innerHTML = "medium: ";
  var course = document.createElement("h5");
  course.innerHTML = item.data().class;
  descriptionDivCourse.appendChild(courseTitle);
  descriptionDivCourse.appendChild(course);
  description.appendChild(descriptionDivCourse);

  

} 
DisplayPersonalPageInfo();