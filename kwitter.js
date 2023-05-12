function login(){
    username=document.getElementById("user_name").value;
    localStorage.setItem("user_name_key",username);
    window.location="kwitter_room.html";
    
}