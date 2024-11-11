import { useEffect, useState } from 'react';
import Movies from '../components/Movies/Movies';
import { Tab } from '@headlessui/react';

export default function MyLists() {
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const watchedIds = JSON.parse(localStorage.getItem('watchedMovies')) || [];
        const watchlistIds = JSON.parse(localStorage.getItem('watchlist')) || [];

        const fetchMovieDetails = async (id) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
          );
          return res.json();
        };

        const watchedDetails = await Promise.all(watchedIds.map(fetchMovieDetails));
        const watchlistDetails = await Promise.all(watchlistIds.map(fetchMovieDetails));

        setWatchedMovies(watchedDetails);
        setWatchlist(watchlistDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Minhas Listas</h1>

      <Tab.Group>
        <Tab.List className="flex space-x-4 border-b border-gray-700 mb-8">
          <Tab className={({ selected }) =>
            `px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none ${
              selected
                ? 'text-emerald-400 border-b-2 border-emerald-400'
                : 'text-gray-400 hover:text-white'
            }`
          }>
            Filmes Assistidos ({watchedMovies.length})
          </Tab>
          <Tab className={({ selected }) =>
            `px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none ${
              selected
                ? 'text-emerald-400 border-b-2 border-emerald-400'
                : 'text-gray-400 hover:text-white'
            }`
          }>
            Para Ver Depois ({watchlist.length})
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            {watchedMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {watchedMovies.map(movie => (
                  <div key={movie.id} className="animate-fade-in">
                    <Movies filme={movie} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  Você ainda não marcou nenhum filme como assistido.
                </p>
              </div>
            )}
          </Tab.Panel>

          <Tab.Panel>
            {watchlist.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {watchlist.map(movie => (
                  <div key={movie.id} className="animate-fade-in">
                    <Movies filme={movie} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  Sua lista de filmes para ver depois está vazia.
                </p>
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
