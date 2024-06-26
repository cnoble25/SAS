import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { getFirestore, collection, getDocs, query, where,} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
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
// this function is the search function for the search page it creates displays for each peice of artwork in the database in which it puts them into a dive and then divs the elements for organization



var searchButtonPic = document.getElementById("searchButtonPic");
searchButtonPic.onclick = function () {
    displayStudentSearchData();
    updateSearchHistory()
}

var searchInput = document.getElementById("searchInput");
searchInput.oninput = function () {
    updateRecommendation();
}
//Made to make the keyboard enter and phone eneter work
searchInput.addEventListener("keypress", function(event){
if(event.key == "Enter"){
   displayStudentSearchData();
}
if (event.keyCode === 13) {
    displayStudentSearchData();
}
});
//loadsthe artpieces in session storage to save on bandwidth
export async function loadArtpieces(){
    const studentPieces = await getDocs(collection(db, "student-art-show"));
        
        var temp = []
        studentPieces.forEach(item => {
            temp.push([item.data().name, item.data().room, item.data().class, item.data().picture, item.data().campus, item.data().year, item.data().ArtistStatement, item.data().building]);
        });
        
        sessionStorage.setItem("ArtPieces", JSON.stringify(temp));
        displayStudentSearchData();
}
if(sessionStorage.getItem("ArtPieces") == null){
loadArtpieces();
console.log("hi");
}else{
    displayStudentSearchData();
}
// var clearHistoryButton = document.getElementById("clearHistoryButton");
// clearHistoryButton.onclick = function () {
//     localStorage.removeItem("searchHistory");
//     var listobj = document.getElementById("searchList");
//     listobj.innerHTML = "";
    
// }
//the function just shows the data for the students
// NOTE: THE CHAR CODE 160 IS THE UNINTERRUPTABLE SPACE WHICH MAKES IT SO THAT THE SPACE IS NOT DELETED IF AT THE END
//displays the data in the Artpieces session storage thing
export async function displayStudentSearchData() {
    var input = document.getElementById("searchInput").value;
    var content = document.getElementById("content");
    
    content.innerHTML = "";

        const studentPieces = JSON.parse(sessionStorage.getItem("ArtPieces"))
        var flag = false;
        studentPieces.forEach(item => {
            if (item[0].toLocaleUpperCase().includes(input.toUpperCase())) {
                flag = true;
                var row = document.createElement("div");
                row.setAttribute('class', "row");
                //make div for image and adds image to div
                var left = document.createElement("div");
                left.setAttribute("class", "profileleft");
                var image = document.createElement("img");
                var noPhoto = false;
                var setNoPhoto = () =>{
                    noPhoto = true;
                }
               image.setAttribute("onerror", "this.onerror=null; this.remove();");
                image.setAttribute("src", item[3]);
                image.setAttribute("class", "imagesForSearch");
                left.appendChild(image);
                image.addEventListener('error', () =>{
                    console.log("hi");
                    document.getElementsByClassName("profileright")[0].style.width = '85vw';
                });
                // makes div for info for each artwork
                var right = document.createElement("div");
                right.setAttribute("class", "profileright");
                //make title for each person's artwork (is just their name)
                var title = document.createElement("h1");
                title.innerHTML = item[0].substring(0,1).toLocaleUpperCase() + item[0].substring(1);
                title.setAttribute("class", "titleForArtwork");
                right.appendChild(title);
                //creates the class part of the div
                var classTitleDiv = document.createElement("div");
                classTitleDiv.setAttribute("class", "classTitleDiv");
                var classTitle = document.createElement("h3");
                classTitle.setAttribute("class", "classTitle");
                classTitle.innerHTML = "Course:" + String.fromCharCode(160);
                classTitleDiv.appendChild(classTitle);
                var group = document.createElement("h4");
                group.innerHTML = item[2].substring(0,1).toLocaleUpperCase() + item[2].substring(1);
                classTitleDiv.appendChild(group);
                right.appendChild(classTitleDiv);
                //creates the year part of the div
                var roomDiv = document.createElement("div");
                roomDiv.setAttribute("class", "roomDiv");
                var roomTitle = document.createElement("h3");
                roomTitle.innerHTML = "Nearby-Room:" + String.fromCharCode(160);
                roomTitle.setAttribute("class", "roomTitle");
                roomDiv.appendChild(roomTitle);
                var rgroup = document.createElement("h4");
                rgroup.innerHTML = item[1];
                roomDiv.appendChild(rgroup);
                right.appendChild(roomDiv);
                //this is the go to page thing for the artiststatment page
                //has conditional because only some people have artist
                //statements
                var goToPage = document.createElement('div');
                goToPage.setAttribute("class", "personPageButton");

                if (item[6]){
                var goToPageButton = document.createElement('button');
                goToPageButton.setAttribute("id", "personPageButtonActualButton")
                goToPageButton.innerHTML = 'click here to get more info';
                //locale storage stuff for people's personal page
                goToPageButton.onclick = function () {
                    sessionStorage.setItem("itemId", JSON.stringify(item));
                    //just makes url so that the thing goes to person page properly cause i dont knwo what the url will be called in the end
                    var uRL = location.href;
                    uRL = uRL.substring(0, uRL.length - 6);
                    console.log(sessionStorage.getItem("itemId"));
                    location.replace(uRL + "personPage.html");
                };
                goToPage.appendChild(goToPageButton);
                }
                //location shower to see which paintings are on the campus
                //you are on
                    var locationShower = document.createElement('p');
                    locationShower.setAttribute("class", "personPageButton");
                    locationShower.setAttribute("id", "personPageButtonlocation");
                
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
                        
                        if(currentCampus == item[4]){
                            locationShower.innerHTML = "YOU ARE ON THE RIGHT CAMPUS";
                            locationShower.style.background = "Green";
                        }else if(currentCampus != item[4]){
                            locationShower.innerHTML = "YOU ARE NOT ON THE RIGHT CAMPUS";
                            locationShower.style.background = "Red";
                        }else{
                            locationShower.innerHTML = "Error";
                            locationShower.style.background = "Orange";
                        }
                      };
                      //only called when the location of a person isn't given
                      const errorCallback = (error) => {
                        console.log(error);
                      };
                      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
                      goToPage.appendChild(locationShower);
                right.appendChild(goToPage);
                //appending the stuff into the row area
                content.appendChild(document.createElement("hr"));
                content.appendChild(document.createElement("br"));
                row.appendChild(left);
                row.appendChild(right);
                content.appendChild(row);
                content.appendChild(document.createElement("br"));
            }

        });
        // when the user search for a unexist result, the canvas will show no resource
        if (!flag) {
            var row = document.createElement("h1");
            row.innerHTML = "No Results Found Servers May be Down";
           
            content.appendChild(document.createElement("br"));
            content.appendChild(row);
            content.appendChild(document.createElement("br"));
           
        }
    
    else {
        displaySearchHistory();
    }
}
// when users click the search bar, the img of searching will change to img of go
function startInput() {
    var btnPic = document.getElementById("searchButtonPic");
    btnPic.src = "gobutton.png";
}
// when users click any places except the search bar, the img of go will change to img of searching
function leaveInput() {
    var btnPic = document.getElementById("searchButtonPic");
    btnPic.src = "search.png";
}
//this function gives the most relative results of what users put into the search bar
async function updateRecommendation() {
    var input = document.getElementById("searchInput").value;
    if (input.length > 0) {
        const studentPieces = JSON.parse(sessionStorage.getItem("ArtPieces"))
        var listobj = document.getElementById("searchList");
        listobj.innerHTML = "";
        if (input.length > 0) {
            studentPieces.forEach(item => {
                if (item[0].toLocaleUpperCase().includes(input.toUpperCase())) {
                    var obj = document.createElement("option");
                    obj.innerHTML = item[0]
                    listobj.appendChild(obj);
                }
            });
        }
    }
    else {
        displaySearchHistory();
    }
}
//this function stores the searching history to users' local memery
function updateSearchHistory() {
    let input = document.getElementById("searchInput").value;
    // according to the input, update the search history list in local storage
    let searchHistory = sessionStorage.getItem("searchHistory") ? JSON.parse(sessionStorage.getItem("searchHistory")) : [];
    if (!searchHistory.includes(input)) {
        searchHistory.push(input);
    }
    sessionStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}
//this function allows users to clear their local searching history
function displaySearchHistory() {
    let input = document.getElementById("searchInput").value;
    if (input.length == 0) {
        var listobj = document.getElementById("searchList");
        listobj.innerHTML = "";
        // according to the input, update the search history list in local storage
        let searchHistory = sessionStorage.getItem("searchHistory") ? JSON.parse(sessionStorage.getItem("searchHistory")) : [];
        searchHistory.forEach(str => {
            var obj = document.createElement("option");
            obj.innerHTML = str
            listobj.appendChild(obj);
        });
    }
}
//run once to make sure working
