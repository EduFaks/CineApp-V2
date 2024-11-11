import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/genre/movie/list?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR'
        );
        const data = await response.json();
        setGenres(data.genres);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching genres:', error);
        setLoading(false);
      }
    };

    fetchGenres();
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
      <h1 className="text-3xl font-bold text-white mb-8">Gêneros</h1>

      {/* Only show genres list if we're not in a specific genre route */}
      {location.pathname === '/generos' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {genres.map(genre => (
            <Link
              key={genre.id}
              to={`/generos/${genre.id}`}
              className="card p-4 text-center transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-lg font-medium text-emerald-400">
                {genre.name}
              </h3>
            </Link>
          ))}
        </div>
      )}

      {/* Render nested routes */}
      <Outlet context={{ genres }} />
    </div>
  );
}
