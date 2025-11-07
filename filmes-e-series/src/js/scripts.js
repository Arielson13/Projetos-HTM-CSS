document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "9d1c1f083fcc4b5b345c477285200577";
  const sectionMovies = document.querySelector(".sectionMovies");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");
  const currentPageSpan = document.getElementById("currentPage");
  const search = document.getElementById("searchMovies");

  let currentPage = 1;
  let totalPages = 1;
  let currentQuery = ""; // guarda o termo pesquisado

  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
  currentPageSpan.style.display = "none";

    //  FUNÇÃO PRINCIPAL (FILMES POPULARES)
    async function getMovies(page = 1) {
    sectionMovies.innerHTML = `<span class="loader"></span>`;

    try {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR&sort_by=popularity.desc&page=${page}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.results?.length) {
        setTimeout(() => {
          showMovies(data.results);
          totalPages = data.total_pages;
          updatePagination();
        }, 800);
      } else {
        sectionMovies.innerHTML = `<p style="text-align:center;color:#888;">Nenhum resultado encontrado.</p>`;
      }
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      sectionMovies.innerHTML = `<p style="text-align:center;color:#f55;">Erro na conexão com o TMDB.</p>`;
    }
  }

    //  FUNÇÃO DE BUSCA GLOBAL
    async function searchMoviesAPI(query, page = 1) {
    if (!query.trim()) {
      currentQuery = "";
      getMovies(); // volta pra a listagem principal
      return;
    }

    sectionMovies.innerHTML = `<span class="loader"></span>`;

    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(
        query
      )}&page=${page}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.results?.length) {
        showMovies(data.results);
        totalPages = data.total_pages;
        currentQuery = query;
        updatePagination();
      } else {
        sectionMovies.innerHTML = `<p style="text-align:center;color:#888;">Nenhum resultado encontrado para "${query}".</p>`;
      }
    } catch (error) {
      console.error("Erro na busca:", error);
      sectionMovies.innerHTML = `<p style="text-align:center;color:#f55;">Erro ao buscar filmes.</p>`;
    }
  }

    //  DETECTA A DIGITAÇÃO
    let searchTimeout;
  search.addEventListener("keyup", (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value;

    // adiciona um delay para evitar múltiplas requisições
    searchTimeout = setTimeout(() => {
      searchMoviesAPI(query);
    }, 500);
  });

    //  EXIBIR FILMES
    function showMovies(movies) {
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
    currentPageSpan.style.display = "block";

    sectionMovies.innerHTML = movies
      .map(
        (m) => `
        <div class="movie" data-id="${m.id}">
          <img src="${
            m.poster_path
              ? `https://image.tmdb.org/t/p/original${m.poster_path}`
              : "assets/placeholder.jpg"
          }" loading="lazy" />
          <div class="info">
            <h3>${m.title}</h3>
            <div class="rating">
              ⭐ ${m.vote_average?.toFixed(1) ?? "N/A"}
            </div>
          </div>
        </div>
      `
      )
      .join("");

    addClickEventToMovies();
  }

    //  EVENTO AO CLICAR NO FILME
    function addClickEventToMovies() {
    const movies = document.querySelectorAll(".movie");

    movies.forEach((movie) => {
      movie.addEventListener("click", () => {
        const movieId = movie.getAttribute("data-id");
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        currentPageSpan.style.display = "none";
        sectionMovies.innerHTML = `<span class="loader"></span>`;

        setTimeout(() => {
          window.location.href = `src/movie.html?id=${movieId}`;
        }, 1500);
      });
    });
  }

    //  PAGINAÇÃO
    function updatePagination() {
    currentPageSpan.textContent = currentPage;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      if (currentQuery) searchMoviesAPI(currentQuery, currentPage);
      else getMovies(currentPage);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      if (currentQuery) searchMoviesAPI(currentQuery, currentPage);
      else getMovies(currentPage);
    }
  });

    //  INICIALIZAÇÃO
    getMovies();
});
