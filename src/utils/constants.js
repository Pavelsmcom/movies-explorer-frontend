export const errors = {
  loadingMovies: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  notFound: 'Ничего не найдено',
  serverIsEmpty: 'Нет сохранённых фильмов',
  loginSuccess: 'Данные изменены.',
  loginError: 'Вы ввели неправильный логин или пароль.',
  loginTokenIncorrect: 'При авторизации произошла ошибка. Переданный токен некорректен.',
  registerEmail: 'Пользователь с таким email уже существует.',
  registerError: 'При регистрации пользователя произошла ошибка.',
  profileEmail: 'Пользователь с таким email уже существует.',
  profileError: 'При обновлении профиля произошла ошибка.',
  error500: 'На сервере произошла ошибка.',
  error404: 'Страница по указанному маршруту не найдена.',
};

export const maxMovieDuration = 40;

export const moviesRender = {
  bigWidePageResolution: 1280,
  bigWidePageCountToRender: 12,
  bigWidePageDeltaCountToRender: 3,
  middleWidePageResolution: 768,
  middleWidePageCountToRender: 8,
  middleWidePageDeltaCountToRender: 2,
  smallWidePageCountToRender: 5,
  smallWidePageDeltaCountToRender: 2,
};
