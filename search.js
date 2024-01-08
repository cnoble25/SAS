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
var fixOnclick = false;
var searchButtonPic = document.getElementById("searchButtonPic");
searchButtonPic.onclick = function () {
    displayStudentSearchData();
    updateSearchHistory()
}
var searchInput = document.getElementById("searchInput");
searchInput.oninput = function () {
    updateRecommendation();
}
searchInput.onblur = function () {
    leaveInput();
}
searchInput.onclick = function () {
    startInput();
}
var clearHistoryButton = document.getElementById("clearHistoryButton");
clearHistoryButton.onclick = function () {
    localStorage.removeItem("searchHistory");
    var listobj = document.getElementById("searchList");
    listobj.innerHTML = "";
    
}
async function displayStudentSearchData() {
    var input = document.getElementById("searchInput").value;
    var content = document.getElementById("content");
    // ������������
    content.innerHTML = "";
    // �����Ϊ��ʱ,��ʾ�������
    if (input.length > 0) {
        const studentPieces = await getDocs(collection(db, "Student Art Pieces"));
        var flag = false;// ƥ�����Ŀ���
        studentPieces.forEach(item => {
            if (item.data().name.toLocaleUpperCase().includes(input.toUpperCase())) {
                flag = true;
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
                goToPage.onclick = function () {
                    localStorage.setItem("itemId", item.id);
                    //change later it wont work
                    var uRL = location.href;
                    uRL = uRL.substring(0, uRL.length - 11);
                    console.log(localStorage.getItem("itemId"));
                    location.replace(uRL + "/personPage.html");
                };
                right.appendChild(goToPage);
                //appending the stuff into the row area
                content.appendChild(document.createElement("br"));
                content.appendChild(document.createElement("br"));
                row.appendChild(left);
                row.appendChild(right);
                content.appendChild(row);
                content.appendChild(document.createElement("br"));
                content.appendChild(document.createElement("br"));
          content.appendChild(document.createElement("hr"));

            }

        });
        // û��ƥ�䵽��Ŀ,��ʾ��ʾ��Ϣ
        if (!flag) {
            var row = document.createElement("h1");
            row.innerHTML = "no resource";
            content.appendChild(document.createElement("br"));
            content.appendChild(document.createElement("br"));
            content.appendChild(row);
            content.appendChild(document.createElement("br"));
            content.appendChild(document.createElement("br"));
        }
    }
    else {
        // �����Ϊ��ʱ,��ʾ������ʷ
        displaySearchHistory();
    }
}
// ��������ʱ,������������ťͼƬ
function startInput() {
    var btnPic = document.getElementById("searchButtonPic");
    btnPic.src = "111.png";
}
// �����뿪�����ʱ,������������ťͼƬ
function leaveInput() {
    var btnPic = document.getElementById("searchButtonPic");
    btnPic.src = "wow.png";
}
async function updateRecommendation() {
    var input = document.getElementById("searchInput").value;
    if (input.length > 0) {
        const studentPieces = await getDocs(collection(db, "Student Art Pieces"));
        var listobj = document.getElementById("searchList");
        listobj.innerHTML = "";
        if (input.length > 0) {
            studentPieces.forEach(item => {
                if (item.data().name.toLocaleUpperCase().includes(input.toUpperCase())) {
                    var obj = document.createElement("option");
                    obj.innerHTML = item.data().name
                    listobj.appendChild(obj);
                }
            });
        }
    }
    else {
        displaySearchHistory();
    }
}
function updateSearchHistory() {
    let input = document.getElementById("searchInput").value;
    // according to the input, update the search history list in local storage
    let searchHistory = localStorage.getItem("searchHistory") ? JSON.parse(localStorage.getItem("searchHistory")) : [];
    if (!searchHistory.includes(input)) {
        searchHistory.push(input);
    }
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}
function displaySearchHistory() {
    let input = document.getElementById("searchInput").value;
    if (input.length == 0) {
        var listobj = document.getElementById("searchList");
        listobj.innerHTML = "";
        // according to the input, update the search history list in local storage
        let searchHistory = localStorage.getItem("searchHistory") ? JSON.parse(localStorage.getItem("searchHistory")) : [];
        searchHistory.forEach(str => {
            var obj = document.createElement("option");
            obj.innerHTML = str
            listobj.appendChild(obj);
        });
    }
}
displayStudentSearchData();
