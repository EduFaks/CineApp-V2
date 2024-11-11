import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function Movies({filme}) {
    return ( 
        <>
                  <img className="mt-4 mb-4" src={`https://image.tmdb.org/t/p/w200/${filme.poster_path}`}/>
                  <h1>{filme.title || filme.name}</h1>
                  <div className="flex items-center">
                  <FaStar /> <span>{filme.vote_average}</span>
                  </div>
                  <Link className="underline" to={`/filmes/${filme.id}`}>Detalhes</Link>
                  
            </>
     );
}

export default Movies;