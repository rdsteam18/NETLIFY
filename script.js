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
    document.addEventListener("DOMContentLoaded", function () {
        const searchInput = document.querySelector(".search-input");

        searchInput.addEventListener("input", function () {
            const query = searchInput.value.toLowerCase();
            const animeCards = document.querySelectorAll(".anime-card");

            animeCards.forEach(card => {
                const title = card.textContent.toLowerCase();
                if (title.includes(query)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
document.addEventListener("DOMContentLoaded", function () {
    fetch("animeData.json") // JSON file load karna
        .then(response => response.json())
        .then(animeData => {
            const animeContainer = document.getElementById("animeContainer");
            animeContainer.innerHTML = ""; // Pehle se jo bhi data hai use clear karna

            animeData.forEach(anime => {
                const animeCard = document.createElement("a");
                animeCard.href = anime.link;
                animeCard.innerHTML = `
                    <div class="anime-card">
                        <img src="${anime.image}" alt="${anime.title}">
                        <p>${anime.title}</p>
                    </div>
                `;
                animeContainer.appendChild(animeCard);
            });
        })
        .catch(error => console.error("Error loading anime data:", error));
});

document.querySelectorAll('.title').forEach(el => {
    if (el.innerText.length > 17) { 
        el.innerText = el.innerText.substring(0, 17) + '...';
    }
});
