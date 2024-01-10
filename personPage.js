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
  //happens when you do get geo location position and tells you if you are on the right campus
  const successCallback = (position) => {
    var latitude =  position.coords.latitude;
    var longitude =  position.coords.longitude;
    longitude = longitude.toPrecision(5);
    latitude = latitude.toPrecision(5);
    console.log(latitude + ", " + longitude);
  
    //current campus is just to tell which campus the person is on 1 means lower school 2 means highschool
    var currentCampus = null;
    if(latitude > 38.05 && longitude < -78.518){
      currentCampus = "Lower School";
    }else if(latitude < 38.05 && longitude > -78.518){
      currentCampus = "Upper School";
    }
    // console.log(currentCampus + ", " + item.data().campus);
    // console.log(currentCampus == item.data().campus);

    if(currentCampus == item.data().campus){
      NaviCheckCampusButton.innerHTML = "YOU ARE ON THE RIGHT CAMPUS";
    }else if(currentCampus != item.data().campus){
      NaviCheckCampusButton.innerHTML = "YOU ARE NOT ON THE RIGHT CAMPUS";
    }else{
      NaviCheckCampusButton.innerHTML = "Error";
    }
    
  
  };
  //only called when the location of a person isn't given
  const errorCallback = (error) => {
    console.log(error);
  };


  //makes the image for the actual page
  var image = document.createElement("img");
  image.src = item.data().picture;
  image.setAttribute("width", "100%");
  image.setAttribute('height', "auto");
  Picture.appendChild(image);
  image.setAttribute("class", "image");
  //makes info div for name of student
  var descriptionDivName = document.createElement("div");
  descriptionDivName.setAttribute("id", "descriptionDivName");
  var nameTitle = document.createElement("h4");
  nameTitle.innerHTML = "Name: ";
  var name = document.createElement("h5");
  name.innerHTML = item.data().name;
  descriptionDivName.appendChild(nameTitle);
  descriptionDivName.appendChild(name);
  description.appendChild(descriptionDivName);
  // makes info div for year of student
  var descriptionDivYear = document.createElement("div");
  descriptionDivYear.id = "descriptionDivYear";
  var yearTitle = document.createElement("h4");
  yearTitle.innerHTML = "Year: ";
  var year = document.createElement("h5");
  year.innerHTML = item.data().year;
  descriptionDivYear.appendChild(yearTitle);
  descriptionDivYear.appendChild(year);
  description.appendChild(descriptionDivYear);
  //makes info div for building info(in progress)
  var descriptionDivBuilding = document.createElement("div");
  descriptionDivBuilding.id = "descriptionDivBuilding";
  var buildingTitle = document.createElement("h4");
  buildingTitle.innerHTML = "Building: ";
  var building = document.createElement("h5");
 var buildingFullName = ''
//  switch(item.data().building.toLowerCase()){
//   case "rh":
//     buildingFullName = "Randolph Hall";
//   break;

//   case "as":
//     buildingFullName = "";// come back later
//   break;

//   case "gh":
//   buildingFullName = "Grisham Hall";
//   break;

//   case "scas":
//     buildingFullName = "SCAS";
//   break;

//   case "llc":
//     buildingFullName = "Lourie Learning Center";
//   break;

//   case "LD":
//     buildingFullName = "Lee Duval";
//   break;







//  }


//   building.innerHTML =
//   descriptionDivBuilding.appendChild(campusTitle);
//   descriptionDivBuilding.appendChild(campus);
//   description.appendChild(descriptionDivBuilding);
//    makes info div for campus information
  var descriptionDivCampus = document.createElement("div");
  descriptionDivCampus.id = "descriptionDivCampus";
  var campusTitle = document.createElement("h4");
  campusTitle.innerHTML = "Campus: ";
  var campus = document.createElement("h5");
  campus.innerHTML = item.data().campus;
  descriptionDivCampus.appendChild(campusTitle);
  descriptionDivCampus.appendChild(campus);
  description.appendChild(descriptionDivCampus);
 //makes info div for what room the artwork is nearest to
  var descriptionDivRoom = document.createElement("div");
  descriptionDivRoom.id = "descriptionDivRoom";
  var roomTitle = document.createElement("h4");
  roomTitle.innerHTML = "Nearest Room: ";
  var room = document.createElement("h5");
  // if(item.data().room.length > 1){
  room.innerHTML = item.data().building + "-" + item.data().room;
  // }else if(item.data().room.length == 1){
    // room.innerHTML = realLocation
  // }
  descriptionDivYear.appendChild(roomTitle);
  descriptionDivYear.appendChild(room);
  description.appendChild(descriptionDivRoom);
  //makes info div for what medium the art is in
  var descriptionDivMedium = document.createElement("div");
  descriptionDivMedium.id = "descriptionDivMedium";
  var mediumTitle = document.createElement("h4");
  mediumTitle.innerHTML = "Medium: ";
  var medium = document.createElement("h5");
  medium.innerHTML = item.data().medium;
  descriptionDivMedium.appendChild(mediumTitle);
  descriptionDivMedium.appendChild(medium);
  description.appendChild(descriptionDivMedium);
 // makes info div for what course the artwork was made in
  var descriptionDivCourse = document.createElement("div");
  descriptionDivCourse.id = "descriptionDivCourse";
  var courseTitle = document.createElement("h4");
  courseTitle.innerHTML = "Class: ";
  var course = document.createElement("h5");
  course.innerHTML = item.data().class;
  descriptionDivCourse.appendChild(courseTitle);
  descriptionDivCourse.appendChild(course);
  description.appendChild(descriptionDivCourse);
 // makes button for checking whether the person is on the right campus or not.
  var menu = document.getElementById("menu");
  menu.innerHTML = "";
  var NaviCheckCampusButton = document.createElement("button");
  NaviCheckCampusButton.innerHTML = "CLICK HERE TO CHECK IF YOU ARE ON THE CORRECT CAMPUS FOR THIS ARTWORK";
  NaviCheckCampusButton.onclick = async function(){navigator.geolocation.getCurrentPosition(successCallback, errorCallback);};
  menu.appendChild(NaviCheckCampusButton);

} 


//run once to show info
DisplayPersonalPageInfo();
