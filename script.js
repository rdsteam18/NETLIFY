function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("show");
}

function toggleTheme() {
    document.body.classList.toggle("light-mode");
}

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-input");
    const animeContainer = document.getElementById("animeContainer");
    const paginationContainer = document.getElementById("pagination");
    const itemsPerPage = 20;
    let currentPage = 1;
    let animeData = [];

    function displayAnime(page, data) {
        animeContainer.innerHTML = "";
        paginationContainer.innerHTML = "";
        let start = (page - 1) * itemsPerPage;
        let end = start + itemsPerPage;
        let paginatedItems = data.slice(start, end);

        paginatedItems.forEach(anime => {
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

        if (data.length > itemsPerPage) {
            let pageCount = Math.ceil(data.length / itemsPerPage);
            for (let i = 1; i <= pageCount; i++) {
                let btn = document.createElement("button");
                btn.innerText = i;
                btn.addEventListener("click", function () {
                    currentPage = i;
                    displayAnime(currentPage, animeData);
                });
                paginationContainer.appendChild(btn);
            }
        }
    }

    function searchAnime() {
        let query = searchInput.value.toLowerCase();
        if (query === "") {
            displayAnime(currentPage, animeData);
        } else {
            let filteredData = animeData.filter(anime => anime.title.toLowerCase().includes(query));
            displayAnime(1, filteredData);
        }
    }

    searchInput.addEventListener("input", searchAnime);

    fetch("animeData.json")
        .then(response => response.json())
        .then(data => {
            animeData = data;
            displayAnime(currentPage, animeData);
        })
        .catch(error => console.error("Error loading anime data:", error));
});
