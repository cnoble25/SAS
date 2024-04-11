import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
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

//displays the information of an artwork for and individual page
export async function DisplayPersonalPageInfo(){
  var Picture = document.getElementById("PersonalPagePicture");
  var description = document.getElementById("PersonalPageDescription");
  var Navi = document.getElementById("PersonalPageNavi");
  var item = JSON.parse(sessionStorage.getItem("itemId"));
  //needed to set the variable because doc does not get the doc as an item that you can find the data of for some god damn reason
  
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

    if(currentCampus == item[4]){
      NaviCheckCampusButton.innerHTML = "YOU ARE ON THE RIGHT CAMPUS";
    }else if(currentCampus != item[4]){
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
  image.src = item[3];
  image.setAttribute("width", "100%");
  image.setAttribute('height', "auto");
  Picture.appendChild(image);
  image.setAttribute("class", "image");
  //makes info div for name of student
  var descriptionDivArtistStatement = document.createElement("div");
  descriptionDivArtistStatement.setAttribute("id", "descriptionDivArtistStatement");
  var ASTitle = document.createElement("h4");
  ASTitle.innerHTML = "Artist Statement: ";
  var AS = document.createElement("h5");
  AS.innerHTML = item[6];
  descriptionDivArtistStatement.appendChild(ASTitle);
  descriptionDivArtistStatement.appendChild(AS);
  description.appendChild(descriptionDivArtistStatement);
  var descriptionDivName = document.createElement("div");
  descriptionDivName.setAttribute("id", "descriptionDivName");
  var nameTitle = document.createElement("h4");
  nameTitle.innerHTML = "Name:" + String.fromCharCode(160);
  var name = document.createElement("h5");
  name.innerHTML = item[0];
  descriptionDivName.appendChild(nameTitle);
  descriptionDivName.appendChild(name);
  description.appendChild(descriptionDivName);
  // makes info div for year of student
  var descriptionDivYear = document.createElement("div");
  descriptionDivYear.id = "descriptionDivYear";
  var yearTitle = document.createElement("h4");
  yearTitle.innerHTML = "Year:" + String.fromCharCode(160);
  var year = document.createElement("h5");
  year.innerHTML = item[5];
  descriptionDivYear.appendChild(yearTitle);
  descriptionDivYear.appendChild(year);
  description.appendChild(descriptionDivYear);
  //makes info div for building info(in progress)
  var descriptionDivBuilding = document.createElement("div");
  descriptionDivBuilding.id = "descriptionDivBuilding";
  var buildingTitle = document.createElement("h4");
  buildingTitle.innerHTML = "Building:" + String.fromCharCode(160);
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
  campusTitle.innerHTML = "Campus:" + String.fromCharCode(160);
  var campus = document.createElement("h5");
  campus.innerHTML = item[4];
  descriptionDivCampus.appendChild(campusTitle);
  descriptionDivCampus.appendChild(campus);
  description.appendChild(descriptionDivCampus);
 //makes info div for what room the artwork is nearest to
  var descriptionDivRoom = document.createElement("div");
  descriptionDivRoom.id = "descriptionDivRoom";
  var roomTitle = document.createElement("h4");
  roomTitle.innerHTML = "Nearest Room:" + String.fromCharCode(160);
  var room = document.createElement("h5");
  // if(item.data().room.length > 1){
  room.innerHTML = item[1];
  // }else if(item.data().room.length == 1){
    // room.innerHTML = realLocation
  // }
  descriptionDivYear.appendChild(roomTitle);
  descriptionDivYear.appendChild(room);
  description.appendChild(descriptionDivRoom);
 // makes info div for what course the artwork was made in
  var descriptionDivCourse = document.createElement("div");
  descriptionDivCourse.id = "descriptionDivCourse";
  var courseTitle = document.createElement("h4");
  courseTitle.innerHTML = "Course:" + String.fromCharCode(160);
  var course = document.createElement("h5");
  course.innerHTML = item[2];
  descriptionDivCourse.appendChild(courseTitle);
  descriptionDivCourse.appendChild(course);
  description.appendChild(descriptionDivCourse);
 // makes button for checking whether the person is on the right campus or not.
  var menu = document.getElementById("headerID");
  
  var NaviCheckCampusButton = document.createElement("button");
  NaviCheckCampusButton.innerHTML = "Check Campus";
  NaviCheckCampusButton.onclick = async function(){navigator.geolocation.getCurrentPosition(successCallback, errorCallback);};
  menu.appendChild(NaviCheckCampusButton);

} 


//run once to show info
DisplayPersonalPageInfo();
