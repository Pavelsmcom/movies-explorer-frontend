import { Routes, Route } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Movies from '../Movies/Movies';

function App() {
  return (
    <div className="App">
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header auth={false} />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <Header auth={true} />
                <Movies />
                <Footer />
              </>
            }
          />
          <Route path="/saved-movies" element={<Register />} />
          <Route path="/profile" element={<Register />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

// lang="en" добавить
//aria-label="Секция с фото-карточками"

//  попробовать закрепить хедер

// #4285F4 поииск
// background: #4285F4; кнпока не нажата
// background: #3456F3; кнопка нажата
// transition: 0.2s;
// preloader
