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
        card.parentElement.style.display = title.includes(input) ? "block" : "none";
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-input");

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        const animeCards = document.querySelectorAll(".anime-card");

        animeCards.forEach(card => {
            const title = card.textContent.toLowerCase();
            card.style.display = title.includes(query) ? "block" : "none";
        });
    });

    fetch("animeData.json")
        .then(response => response.json())
        .then(animeData => {
            const animeContainer = document.getElementById("animeContainer");
            const paginationContainer = document.getElementById("pagination");
            const itemsPerPage = 20;
            let currentPage = 1;

            function displayAnime(page) {
                animeContainer.innerHTML = "";
                let start = (page - 1) * itemsPerPage;
                let end = start + itemsPerPage;
                let paginatedItems = animeData.slice(start, end);

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
            }

            function setupPagination() {
                paginationContainer.innerHTML = "";
                let pageCount = Math.ceil(animeData.length / itemsPerPage);
                for (let i = 1; i <= pageCount; i++) {
                    let btn = document.createElement("button");
                    btn.innerText = i;
                    btn.addEventListener("click", function () {
                        currentPage = i;
                        displayAnime(currentPage);
                    });
                    paginationContainer.appendChild(btn);
                }
            }

            displayAnime(currentPage);
            setupPagination();
        })
        .catch(error => console.error("Error loading anime data:", error));
});
