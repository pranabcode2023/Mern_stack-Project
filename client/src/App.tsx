import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthorNavBar from './components/AuthorNavBar';
import AuthorHomepage from './Pages/AuthorHomepage';
import AuthorLogin from './Pages/AuthorLogin';
import AuthorRegister from './Pages/AuthorRegister';
import { AuthorAuthContextProvider } from './contexts/AuthorAuthContext';

import Books from './Pages/Books';
import AddBook from './Pages/AddBook';
import BookDetails from './components/BookDetails';


// import NavBar from './components/NavBar';

// import Register from './Pages/Register';
// import Homepage from './Pages/Homepage';

// import Homepage2 from './Pages/Homepage2';
// import Login from './Pages/Login';
// import {AuthContextProvider } from './contexts/AuthContext';



import './styles.css';

function App() {
  // const { user } = useContext(AuthContext);
  // console.log("active user from app",user);
  
  return (
    <AuthorAuthContextProvider>
      <BrowserRouter>
       {/* <div>{author? <p> User logged in!</p> : <p> User logged out!</p>} </div> */}
        {/* <NavBar /> */}
        <AuthorNavBar/>
        <Routes>
          <Route path='/' element={<AuthorHomepage/>} />
          <Route path='/books' element={<Books />} />
          <Route path='/addbook' element={ <AddBook/>} />
          <Route path='/register' element={ <AuthorRegister /> } />
          <Route path='/login' element={<AuthorLogin />} />
          <Route path='/books/:id' element={ <BookDetails /> } />
        </Routes>
      </BrowserRouter>
    </AuthorAuthContextProvider>
  );
}

export default App;


