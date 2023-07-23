const hamburgerIcon = document.querySelector(".hamburger-icon");
        const navContent = document.querySelector(".nav-content");

        hamburgerIcon.addEventListener("click", () => {
            navContent.classList.toggle("show");
        });


        function showOverlay(element) {
            const overlay = element.querySelector(".text-overlay");
            overlay.style.opacity = "1";
        }

        function hideOverlay(element) {
            const overlay = element.querySelector(".text-overlay");
            overlay.style.opacity = "0";
        }


        // function chat(){
        //     window.location.href="chat.html"
        // }

        let chat = document.getElementById('chat');

        chat.onclick = () => {
          location = './chat.html';
        };


    