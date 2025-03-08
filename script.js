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


        let animeData = [];
        let currentPage = 1;
        const itemsPerPage = 20;

        function displayAnime() {
            let animeContainer = document.getElementById("animeContainer");
            animeContainer.innerHTML = "";

            let start = (currentPage - 1) * itemsPerPage;
            let end = start + itemsPerPage;
            let paginatedItems = animeData.slice(start, end);

            paginatedItems.forEach(anime => {
                let animeItem = document.createElement("div");
                animeItem.className = "anime-item";
                animeItem.innerHTML = `
                    <h3>${anime.title}</h3>
                    <img src="${anime.image}" alt="${anime.title}" width="150">
                    <p>${anime.description}</p>
                `;
                animeContainer.appendChild(animeItem);
            });

            displayPagination();
        }

        function displayPagination() {
            let paginationContainer = document.getElementById("pagination");
            paginationContainer.innerHTML = "";
            let totalPages = Math.ceil(animeData.length / itemsPerPage);

            let prevButton = document.createElement("button");
            prevButton.innerText = "Previous";
            prevButton.disabled = currentPage === 1;
            prevButton.onclick = () => { currentPage--; displayAnime(); };
            paginationContainer.appendChild(prevButton);

            for (let i = 1; i <= totalPages; i++) {
                let pageButton = document.createElement("button");
                pageButton.innerText = i;
                pageButton.disabled = i === currentPage;
                pageButton.onclick = () => { currentPage = i; displayAnime(); };
                paginationContainer.appendChild(pageButton);
            }

            let nextButton = document.createElement("button");
            nextButton.innerText = "Next";
            nextButton.disabled = currentPage === totalPages;
            nextButton.onclick = () => { currentPage++; displayAnime(); };
            paginationContainer.appendChild(nextButton);
        }

        document.addEventListener("DOMContentLoaded", function() {
            fetch("animeData.json")
                .then(response => response.json())
                .then(data => {
                    animeData = data;
                    displayAnime();
                })
                .catch(error => console.error("Error loading anime data:", error));
        });
