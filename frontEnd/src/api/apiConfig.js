const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "12f3a5b30597718ac323a755f4a647a9",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

export default apiConfig
