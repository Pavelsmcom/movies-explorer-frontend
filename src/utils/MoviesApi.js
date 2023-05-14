class MoviesApi {
  constructor(optionsConnection) {
    this._baseUrl = optionsConnection.baseUrl;
  }

  _isCorrectServerResponse(res, errorMessage) {
    if (!res.ok) {
      throw new Error(`${errorMessage}:\n ${res.status}`);
    }
  }

  // Получаем массив фильмов от сервера
  async getInitialMovies() {
    const res = await fetch(this._baseUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this._isCorrectServerResponse(res, 'Ошибка получения карточек с сервера');
    const data = await res.json();
    return data;
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});
