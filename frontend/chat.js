


const socket=io("http://localhost:8000",{transports:["websocket"]})



  


openFormBtn.addEventListener("click", () => {
  popupForm.style.display = "block";
});

function closeForm() {
  popupForm.style.display = "none";
}

document.getElementById("myForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  // Do something with the form data (e.g., send it to the server)
  console.log("Name:", name);
  console.log("Email:", email);

  // Close the popup form
  closeForm();
});





// Create button 

let Create=document.getElementById("create")
let groupname=document.getElementById("name")

create.addEventListener("click",(e)=>{
  
   let ragex=/^[A-Z][a-z]+$/
   let value=groupname.value

   
  e.preventDefault()
  if(ragex.test(value))
  {
    let token=localStorage.getItem("token")
    let obj={groupname:`${value}`}
    fetch("http://localhost:8000/group/addgroup",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body:JSON.stringify(obj)
    })
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      option()
      
    })

  }
  else{
    alert("there should be no gap and first letter should be capital")
  }
 


})



let group=document.getElementById("group")

function option()
{

  let token=localStorage.getItem("token")
  fetch("http://localhost:8000/group/groupget",{
    method:"GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    },
   
  })
  .then((res)=>{
    return res.json()
  })
  .then((data)=>{
    console.log(data)
    appendgroup(data)
  
  })

}

option()


function appendgroup(data)
{
  console.log(data)
  console.log("groupcalled")
  group.innerHTML=""
  data.forEach((data)=>{
    let option=document.createElement("option")
    let button=document.createElement("button")

    option.setAttribute("value",data.groupname)
    option.innerText=data.groupname
 

    group.append(option)
  })
}





// join button
let join=document.getElementById("join")

join.addEventListener("click",(e)=>{
  e.preventDefault()
  let name=localStorage.getItem("name")

  console.log(group.value)

  socket.emit("join",[group.value,name])

})





// message

let message=document.getElementById("message")
let inputmessage=document.getElementById("messageinput")

message.addEventListener("click",(e)=>{
  e.preventDefault()

  if(inputmessage.value!="")
  {
    let token=localStorage.getItem("token")
  let obj={group:group.value,message:inputmessage.value}
  console.log(obj)
  fetch("http://localhost:8000/message/addmessage",{
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    },
    body:JSON.stringify(obj)
  })
  .then((res)=>{
    return res.json()
  })
  .then((data)=>{
  
     console.log(data)
     
  
  })
  socket.emit("newmessage",[group.value,inputmessage.value])
  
}
else{
  alert("Please write something")
}

  
  
})

socket.on("response",(msg)=>{
  
  console.log(123)
  dataappend(msg[0])

 
})


 let messageappend=document.getElementById("messageappend")

 socket.on("default",(msg)=>{



  dataappend(msg)

 })

 

 function dataappend(msg)
 {
  let token=localStorage.getItem("token")
  fetch(`http://localhost:8000/message/messageget/${msg}`,{
    method:"GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    },
   
  })
  .then((res)=>{
    return res.json()
  })
  .then((data)=>{
    let user=localStorage.getItem("name")
    messagedata(data,user)
  
  })

  
 

 }

   socket.on("group",(msg)=>{

   })

   function messagedata(messages, currentUser) {
    console.log(messages);
    var messageappend = document.getElementById("messageappend");
    messageappend.innerHTML = "";
  
    messages.forEach((data) => {
      const isMyMessage = data.user === currentUser;
  
      let div = document.createElement("div");
      let p = document.createElement("p");
      let p1 = document.createElement("p");
      let p2 = document.createElement("p");
  
      p.innerText = data.message;
      const formattedDate = formatDate(data.time); // Use your own date formatting function here
      p1.innerText = formattedDate;
      p2.innerText = data.user;
  
      div.append(p2, p, p1);
      messageappend.append(div);
  
      // Add a class to the message container based on whether it's your message or not
      div.classList.add(isMyMessage ? "my-message" : "other-message");
  
      // Add inline styles for the container based on whether it's your message or not
      div.style.textAlign = isMyMessage ? "right" : "left";
      div.style.backgroundColor = isMyMessage ? "#cce6ff" : "#f0f0f0";
      div.style.borderRadius = "10px";
      div.style.padding = "8px";
    });
  
    // Scroll to the bottom when a new message is added
    messageappend.scrollTop = messageappend.scrollHeight;
  }
  
  










  //  time stamp

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  }








  // Group joiners
  let onlineusers=document.getElementById("Onlineusers")

  socket.on("group",(msg)=>{
    console.log(msg)
    groupjoiners(msg)
  })

  function groupjoiners(data)
  {
    onlineusers.innerHTML=""
    console.log(data)
    
    data.forEach((data)=>{
      let div=document.createElement("div")
    let p=document.createElement("p")
      p.innerText=data.name
      div.append(p)
      onlineusers.append(div)
    })

  }
  document.getElementById("home").addEventListener("click", function() {
    // Replace "your_dashboard_url" with the actual URL you want to redirect to
    window.location.href = "./index.html";
  });

  document.getElementById("dashboard").addEventListener("click", function() {
    // Replace "your_dashboard_url" with the actual URL you want to redirect to
    window.location.href = "./dashboard.html";
  });
