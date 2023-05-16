class MainApi {
  constructor(optionsConnectionAuth) {
    this._baseUrl = optionsConnectionAuth.baseUrl;
    this._headers = optionsConnectionAuth.headers;
  }

  _isCorrectServerResponse(res, message) {
    if (!res.ok) {
      throw new Error(`${message}:${res.status}`);
    }
  }

  _getAuthHeader() {
    return `Bearer ${localStorage.getItem('jwt')}`;
  }

  // Регистрация пользователя
  async register({ name, password, email }) {
    const res = await fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name: name, email: email, password: password }),
    });
    this._isCorrectServerResponse(res, 'register');
    const data = await res.json();
    return data;
  }

  // Авторизация  пользователя
  async login({ password, email }) {
    const res = await fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ password: password, email: email }),
    });
    this._isCorrectServerResponse(res, 'login');
    const data = await res.json();
    return data;
  }

  // Получаем данные пользователя от сервера
  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me `, {
      headers: {
        authorization: this._getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });
    this._isCorrectServerResponse(res, 'getUserInfo');
    const data = await res.json();
    return data;
  }

  // Изменяем данные пользователя
  async setUserInfo(userInfo) {
    const res = await fetch(`${this._baseUrl}/users/me `, {
      method: 'PATCH',
      headers: {
        authorization: this._getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userInfo.name,
        email: userInfo.email,
      }),
    });
    this._isCorrectServerResponse(res, 'updateUser');
    const data = await res.json();
    return data;
  }

  // Загружаем фильм на сервер
  async addMovie(movie) {
    const res = await fetch(`${this._baseUrl}/movies `, {
      method: 'POST',
      headers: {
        authorization: this._getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${movie.image.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    });
    this._isCorrectServerResponse(res, 'addMovie');
    const data = await res.json();
    return data;
  }

  // Удаляем фильм с сервера
  async deleteMovie(movieId) {
    const res = await fetch(`${this._baseUrl}/movies/${movieId} `, {
      method: 'DELETE',
      headers: {
        authorization: this._getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });
    this._isCorrectServerResponse(res, 'deleteMovie');
  }

  // Получаем массив фильмов от сервера
  async getSavedMovie() {
    const res = await fetch(`${this._baseUrl}/movies`, {
      headers: {
        authorization: this._getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });
    this._isCorrectServerResponse(res, 'getSavedMovie');
    const data = await res.json();
    return data;
  }
}

export const mainApi = new MainApi({
  baseUrl: 'https://api.movies.pavelsm.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json',
  },
});
