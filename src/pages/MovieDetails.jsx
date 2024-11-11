import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaBookmark, FaCheck } from 'react-icons/fa';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [isWatched, setIsWatched] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieRes, creditsRes, videosRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=7c572a9f5b3ba776080330d23bb76e1e`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=7c572a9f5b3ba776080330d23bb76e1e`)
        ]);

        const [movieData, creditsData, videosData] = await Promise.all([
          movieRes.json(),
          creditsRes.json(),
          videosRes.json()
        ]);

        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 10));
        const officialTrailer = videosData.results.find(
          video => video.type === "Trailer" && video.official
        );
        setTrailer(officialTrailer);

        // Check localStorage
        const watchedList = JSON.parse(localStorage.getItem('watchedMovies')) || [];
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        
        setIsWatched(watchedList.includes(movieData.id));
        setIsWatchlist(watchlist.includes(movieData.id));
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const toggleWatched = () => {
    const watchedList = JSON.parse(localStorage.getItem('watchedMovies')) || [];
    let newWatchedList;
    
    if (isWatched) {
      newWatchedList = watchedList.filter(movieId => movieId !== movie.id);
    } else {
      newWatchedList = [...watchedList, movie.id];
    }
    
    localStorage.setItem('watchedMovies', JSON.stringify(newWatchedList));
    setIsWatched(!isWatched);
  };

  const toggleWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    let newWatchlist;
    
    if (isWatchlist) {
      newWatchlist = watchlist.filter(movieId => movieId !== movie.id);
    } else {
      newWatchlist = [...watchlist, movie.id];
    }
    
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
    setIsWatchlist(!isWatchlist);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        
        <div className="container-custom h-full flex items-end pb-16 relative z-10">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl sm:text-6xl font-bold text-white">
              {movie.title}
            </h1>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                <span className="text-yellow-500 font-medium">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              
              <span className="text-gray-400">
                {new Date(movie.release_date).toLocaleDateString('pt-BR')}
              </span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={toggleWatched}
                className={`btn flex items-center gap-2 ${
                  isWatched ? 'bg-emerald-600' : 'bg-emerald-500'
                }`}
              >
                <FaCheck />
                {isWatched ? 'Assistido' : 'Marcar como assistido'}
              </button>
              
              <button
                onClick={toggleWatchlist}
                className={`btn flex items-center gap-2 ${
                  isWatchlist ? 'bg-emerald-600' : 'bg-emerald-500'
                }`}
              >
                <FaBookmark />
                {isWatchlist ? 'Na lista' : 'Adicionar à lista'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Sinopse</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </section>

            {trailer && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Trailer Oficial</h2>
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full rounded-xl"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="Trailer Oficial"
                    allowFullScreen
                  />
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Elenco</h2>
              <div className="space-y-4">
                {cast.map(actor => (
                  <div key={actor.id} className="flex items-center gap-4">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x300?text=No+Image';
                      }}
                    />
                    <div>
                      <p className="text-white font-medium">{actor.name}</p>
                      <p className="text-gray-400 text-sm">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
