import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../components/Home/Home.jsx';
import Root from '../components/Root/Root.jsx'

import Movies from '../components/Movies/Movies.jsx';
import CreateMovie from '../components/Movies/CRUD/Create/CreateMovie.jsx';
import ReadMovie from '../components/Movies/CRUD/Read/ReadMovie.jsx';
import UpdateMovie from '../components/Movies/CRUD/Update/UpdateMovie.jsx';
import UpdateMovieForm from '../components/Movies/CRUD/Update/UpdateMovieForm.jsx';
import DeleteMovie from '../components/Movies/CRUD/Delete/DeleteMovie.jsx';
import MoviesCards from '../components/Movies/MoviesCards.jsx';

import Users from '../components/Users/Users.jsx';
import CreateUser from '../components/Users/CRUD/Create/CreateUser.jsx';
import ReadUser from '../components/Users/CRUD/Read/ReadUser.jsx';
import UpdateUser from '../components/Users/CRUD/Update/UpdateUser.jsx';
import UpdateUserForm from '../components/Users/CRUD/Update/UpdateUserForm.jsx'
import DeleteUser from '../components/Users/CRUD/Delete/DeleteUser.jsx';
import UsersCards from '../components/Users/UsersCards.jsx';

import Rents from '../components/Rents/Rents.jsx';
import CreateRent from '../components/Rents/CRU/Create/CreateRent.jsx';
import ReadRent from '../components/Rents/CRU/Read/ReadRent.jsx';
import UpdateRent from '../components/Rents/CRU/Update/UpdateRent.jsx';
import UpdateRentForm from '../components/Rents/CRU/Update/UpdateRentForm.jsx'

import RentsCards from '../components/Rents/RentsCards.jsx';

import Footer from '../components/Root/Footer.jsx'










function App() {
  const router = createBrowserRouter(
  [
    { 
      path: '/', 
      element: <Root />, 
      children: [
        {path: '/', element: <Home/>},
        {path: 'movies', 
        element: <Movies />,
        children: [
          {path: 'create', element: <CreateMovie/>},
          {path: 'read', element: <ReadMovie/>},
          {path: 'update', element: <UpdateMovie/>},
          {path:'delete', element: <DeleteMovie/>},
          {path:':movieId', element: <UpdateMovieForm/>},
          { path: '', element: <MoviesCards /> }

        ]
       },
        {path: 'users', 
        element: <Users />,
        children: [
          {path: 'create', element: <CreateUser/>},
          {path: 'read', element: <ReadUser/>},
          {path: 'update', element: <UpdateUser/>},
          {path: 'delete', element: <DeleteUser/>},
          {path:':idUser', element: <UpdateUserForm/>},
          { path: '', element: <UsersCards /> }
        ]
      },
        {path: 'rents', 
        element: <Rents />,
        children: [
          {path: "create", element: <CreateRent/>},
          {path: "read", element: <ReadRent/>},
          {path: "update", element: <UpdateRent/>},
          {path:':idRent', element: <UpdateRentForm/>},
          { path: '', element: <RentsCards /> }
        ]
      },
        
        
        
      ]
    },
    
    
  ]
  )
  
  
  return (
          <div className='App'>
            <RouterProvider router={router}/>
            <Footer/>
          </div>);
}

export default App;
