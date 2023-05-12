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
room_name=localStorage.getItem("room_name_key");

function logout(){
      localStorage.removeItem("user_name_key");
      localStorage.removeItem("room_name_key");
      window.location="index.html";

}
function send(){
      user_msg=document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message: user_msg,
            like:0
      });
document.getElementById("msg").value="";
}
function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        subfolder_id = childKey;
                        subfolder_data = childData;
                        
                        
                        db_name=subfolder_data["name"];
                        db_msg=subfolder_data["message"];
                        db_like=subfolder_data["like"];
                        console.log(db_name,db_msg,db_like);
                        name_tag='<h4>'+db_name+'<img src="tick.png" class="user_tick"></h4>';
                        message_tag='<h4 class="message_h4">'+db_msg+'</h4>';
                        btn_tag='<button class="btn btn-warning" id="'+subfolder_id+'" onclick="update_likes(this.id)" value="'+db_like+'">';
                        btn_texttag='<span class="glyphicon glyphicon-thumbs-up">like: '+db_like+'</span></button><hr>';
                        document.getElementById("output").innerHTML+=name_tag+message_tag+btn_tag+btn_texttag;

                  }
            });
      });
}
getData();
function update_likes(sub_id){
      likes=document.getElementById(sub_id).value;
      likes=Number(likes)+1;
      firebase.database().ref(room_name).child(sub_id).update({
            like:likes
      });
}