import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function Movies({ filme }) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gray-800/50 shadow-xl">
      <div className="aspect-[2/3] overflow-hidden">
        <img 
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110" 
          src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`}
          alt={filme.title || filme.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <div className="bg-gray-900/95 rounded-xl p-4 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
            {filme.title || filme.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-500" />
              <span className="text-yellow-500 font-medium">
                {filme.vote_average?.toFixed(1)}
              </span>
            </div>
            
            <Link 
              to={`/filmes/${filme.id}`}
              className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              Detalhes
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions Overlay */}
      <Link 
        to={`/filmes/${filme.id}`}
        className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div className="transform scale-95 group-hover:scale-100 transition-transform duration-300">
          <button className="btn bg-emerald-500/90 hover:bg-emerald-500">
            Ver Detalhes
          </button>
        </div>
      </Link>
    </div>
  );
}

export default Movies;
