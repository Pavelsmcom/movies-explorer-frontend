import Footer from '../Footer/Footer';
import Header from '../Header/Header';
// import Main from "../Main/Main";
import Movies from '../Movies/Movies';

function App() {
  return (
    <div className="App">
      <div className="page">
        {/* <Header/>
          <Main/>
        <Footer/> */}

        <Header />
        <Movies />
        <Footer />
      </div>
    </div>
  );
}

export default App;

// lang="en" добавить
//aria-label="Секция с фото-карточками"
//переписать медиазапросы
//вынести logo в отдельный компонент
