//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
      apiKey: "AIzaSyBYphaMec7okI64B8mgWWhqsb0E38eRp6s",
      authDomain: "kwitter-1f4df.firebaseapp.com",
      databaseURL: "https://kwitter-1f4df-default-rtdb.firebaseio.com",
      projectId: "kwitter-1f4df",
      storageBucket: "kwitter-1f4df.appspot.com",
      messagingSenderId: "5628047718",
      appId: "1:5628047718:web:d44df3560fa7a0b3e118a7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
user_name=localStorage.getItem("user_name_key");
document.getElementById("welcome").innerHTML="welcome "+user_name;

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log(Room_names);
                  div_tag='<div class="room_name" onclick="redirect_to_room(this.id)" id="'+Room_names+'" >'+Room_names+'</div><hr>';
                  document.getElementById("output").innerHTML+=div_tag;

                  //Start code

                  //End code
            });
      });
}
getData();
function addroom(){
      room_name=document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose:"room folder"
      });
      localStorage.setItem("room_name_key",room_name);
      window.location="kwitter_page.html";
}
function redirect_to_room(room){
      localStorage.setItem("room_name_key",room);
      window.location="kwitter_page.html";
}
function logout(){
      localStorage.removeItem("user_name_key");
      localStorage.removeItem("room_name_key");
      window.location="index.html";
}