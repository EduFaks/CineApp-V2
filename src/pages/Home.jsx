import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import Carousel from "../components/Carousel/Carousel";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topSeries, setTopSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popularRes, upcomingRes, seriesRes] = await Promise.all([
          fetch('https://api.themoviedb.org/3/movie/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR&page=1'),
          fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR&page=1'),
          fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR&page=1')
        ]);

        const [popularData, upcomingData, seriesData] = await Promise.all([
          popularRes.json(),
          upcomingRes.json(),
          seriesRes.json()
        ]);

        setPopularMovies(popularData.results);
        setUpcomingMovies(upcomingData.results);
        setTopSeries(seriesData.results);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Spinner className="h-12 w-12 text-emerald-500" />
        <p className="text-gray-400 animate-pulse">Carregando conteúdo...</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      {popularMovies[0] && (
        <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-10000 animate-slow-zoom"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${popularMovies[0].backdrop_path})`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
          
          <div className="absolute inset-0 container-custom h-full flex items-end pb-16">
            <div className="max-w-3xl space-y-6">
              <span className="text-emerald-400 font-medium">Em Destaque</span>
              <h1 className="text-4xl sm:text-6xl font-bold text-white">
                {popularMovies[0].title}
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl">
                {popularMovies[0].overview}
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">★</span>
                  <span className="text-white font-medium">
                    {popularMovies[0].vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Carousels */}
      <div className="container-custom py-8">
        <div className="space-y-16">
          <Carousel 
            title="Filmes Populares" 
            items={popularMovies} 
          />

          <Carousel 
            title="Próximos Lançamentos" 
            items={upcomingMovies} 
          />

          <Carousel 
            title="Séries em Destaque" 
            items={topSeries} 
          />
        </div>
      </div>
    </div>
  );
}
