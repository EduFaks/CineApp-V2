import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
import App from './App'
import './main.css'
import Sobre from './pages/Sobre'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import Contato from './pages/Contato'
import MovieList from './pages/MovieList'
import Movie from './components/Movie/Movie'
//import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter([
{
  path: '/',
  element: <App />,
  children: [
    {index: true, element: <Home/>},
    {path: 'filmes', element: <MovieList/>},
    {path: '/filmes/:id', element: <Movie/>},
    {path: 'sobre', element: <Sobre/>},
    {path: 'contato', element: <Contato/>},
    {path: '*', element: <PageNotFound/>},
  ]
}

])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId="926189645590-kn7p3g6rv5nh461docfscomsk1b9n7q5.apps.googleusercontent.com"> */}
      <RouterProvider router={router} />
    {/* </GoogleOAuthProvider> */}
  </React.StrictMode>
)
