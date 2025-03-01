      function toggleMenu() {
          document.querySelector(".nav-links").classList.toggle("show");
      }
        function toggleTheme() {
            document.body.classList.toggle("light-mode");
        }
        function searchAnime() {
            let input = document.getElementById("search").value.toLowerCase();
            let animeCards = document.querySelectorAll(".anime-card");
            animeCards.forEach(card => {
                let title = card.querySelector("p").innerText.toLowerCase();
                if (title.includes(input)) {
                    card.parentElement.style.display = "block";
                } else {
                    card.parentElement.style.display = "none";
                }
            });
        }
