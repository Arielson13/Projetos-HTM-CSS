const { getMovies } = require("./api");
const { showMovies, showLoader, showError, showEmpty } = require("./ui");
const { enableSearch } = require("./search");
const { updatePagination } = require("./pagination");

document.addEventListener("DOMContentLoaded", () => {
  const sectionMovies = document.querySelector(".sectionMovies");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");
  const currentPageSpan = document.getElementById("currentPage");
  const search = document.getElementById("searchMovies");

  let currentPage = 1;
  let totalPages = 1;
  let currentMovies = [];

  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
  currentPageSpan.style.display = "none";

  async function loadMovies(page = 1) {
    showLoader(sectionMovies);

    try {
      const data = await getMovies(page);

      if (data.results && data.results.length > 0) {
        setTimeout(() => {
          currentMovies = data.results;
          showMovies(sectionMovies, currentMovies, addClickEventToMovies);
          enableSearch(search, sectionMovies, currentMovies, showMovies, addClickEventToMovies);

          totalPages = data.total_pages;
          updatePagination(currentPageSpan, prevBtn, nextBtn, currentPage, totalPages);
          prevBtn.style.display = "block";
          nextBtn.style.display = "block";
          currentPageSpan.style.display = "block";
        }, 1000);
      } else {
        showEmpty(sectionMovies);
      }
    } catch {
      showError(sectionMovies, "Erro na conexão com o TMDB.");
    }
  }

  function addClickEventToMovies() {
    const movies = document.querySelectorAll(".movie");

    movies.forEach((movie) => {
      movie.addEventListener("click", () => {
        const movieId = movie.getAttribute("data-id");
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        currentPageSpan.style.display = "none";

        showLoader(sectionMovies);
        setTimeout(() => {
          window.location.href = `movie.html?id=${movieId}`;
        }, 1000);
      });
    });
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      loadMovies(currentPage);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      loadMovies(currentPage);
    }
  });

  loadMovies();
});
