import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import Movies from "../components/Movies/Movies";

export default function MovieList() {
  const [filmes, setFilmes] = useState([]);
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch('https://api.themoviedb.org/3/movie/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR&page=1'),
      fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR&page=1')
    ])
      .then(([moviesData, seriesData]) => Promise.all([moviesData.json(), seriesData.json()]))
      .then(([moviesJson, seriesJson]) => {
        setFilmes(moviesJson.results);
        setSeries(seriesJson.results);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const filteredMovies = filmes.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Spinner className="h-12 w-12 text-emerald-500" />
        <p className="text-gray-400 animate-pulse">Carregando filmes e séries...</p>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 space-y-12">
      {/* Search Section */}
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg 
            className="w-5 h-5 text-emerald-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Buscar filmes..."
          className="input pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Movies Grid */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-8">
          {searchTerm ? 'Resultados da Busca' : 'Filmes Populares'}
          <div className="h-1 w-20 bg-emerald-500 mt-2 rounded-full" />
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMovies.map(movie => (
            <div key={movie.id} className="animate-fade-in">
              <Movies filme={movie} />
            </div>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Nenhum filme encontrado para "{searchTerm}" 😔
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
