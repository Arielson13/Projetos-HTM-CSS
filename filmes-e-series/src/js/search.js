const { showMovies } = require("./ui");

function enableSearch(input, sectionMovies, movies, addClickEventToMovies) {
  input.addEventListener("keyup", (e) => {
    const filter = movies.filter((i) =>
      i.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    );
    showMovies(sectionMovies, filter, addClickEventToMovies);
  });
}

module.exports = { enableSearch };
