import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './main.css'
import Home from './pages/Home'
import MovieList from './pages/MovieList'
import MovieDetails from './pages/MovieDetails'
import MyLists from './pages/MyLists'
import Genres from './pages/Genres'
import GenreMovies from './pages/GenreMovies'
import Contato from './pages/Contato'
import PageNotFound from './pages/PageNotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/filmes',
        element: <MovieList />
      },
      {
        path: '/filmes/:id',
        element: <MovieDetails />
      },
      {
        path: '/minhas-listas',
        element: <MyLists />
      },
      {
        path: '/generos',
        element: <Genres />,
        children: [
          {
            path: ':genreId',
            element: <GenreMovies />
          }
        ]
      },
      {
        path: '/contato',
        element: <Contato />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
