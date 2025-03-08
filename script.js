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
document.addEventListener("DOMContentLoaded", () => {
    let currentPage = 1;
    const itemsPerPage = 20;
    let animeData = [];

    async function fetchAnimeData() {
        try {
            const response = await fetch("animeData.json");
            animeData = await response.json();
            displayAnime();
            setupPagination();
        } catch (error) {
            console.error("Error loading anime data:", error);
        }
    }

    function displayAnime() {
        const animeContainer = document.getElementById("animeContainer");
        animeContainer.innerHTML = "";
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = animeData.slice(start, end);

        paginatedItems.forEach(anime => {
            const animeElement = document.createElement("div");
            animeElement.classList.add("anime-item");
            animeElement.innerHTML = `<h3>${anime.title}</h3><p>${anime.description}</p>`;
            animeContainer.appendChild(animeElement);
        });
    }

    function setupPagination() {
        const paginationContainer = document.getElementById("pagination");
        paginationContainer.innerHTML = "";
        const totalPages = Math.ceil(animeData.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.innerText = i;
            pageButton.addEventListener("click", () => {
                currentPage = i;
                displayAnime();
            });
            paginationContainer.appendChild(pageButton);
        }
    }

    fetchAnimeData();
});
