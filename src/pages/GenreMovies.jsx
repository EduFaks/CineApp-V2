import { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import Movies from '../components/Movies/Movies';

export default function GenreMovies() {
  const { genreId } = useParams();
  const { genres } = useOutletContext();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const genreName = genres.find(g => g.id === parseInt(genreId))?.name;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR&with_genres=${genreId}&page=${page}`
        );
        const data = await response.json();
        
        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies(prev => [...prev, ...data.results]);
        }
        
        setHasMore(data.page < data.total_pages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genreId, page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  if (loading && page === 1) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Filmes de {genreName}
          <div className="h-1 w-20 bg-emerald-500 mt-2 rounded-full" />
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map(movie => (
          <div key={movie.id} className="animate-fade-in">
            <Movies filme={movie} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-8">
          <button
            onClick={loadMore}
            className="btn"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
            ) : (
              'Carregar Mais'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
