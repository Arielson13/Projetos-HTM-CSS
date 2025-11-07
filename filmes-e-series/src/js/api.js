const apiKey = "9d1c1f083fcc4b5b345c477285200577"; // sua chave TMDB

async function getMovies(page = 1) {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR&sort_by=popularity.desc&page=${page}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    throw error;
  }
}

module.exports = { getMovies };
