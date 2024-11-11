import { NavLink } from 'react-router-dom';
import { FaFilm, FaList, FaTags, FaInfoCircle, FaEnvelope } from 'react-icons/fa';

export default function NavBar() {
  const navItems = [
    { to: '/', text: 'Home', icon: <FaFilm /> },
    { to: '/filmes', text: 'Filmes', icon: <FaFilm /> },
    { to: '/minhas-listas', text: 'Minhas Listas', icon: <FaList /> },
    { to: '/generos', text: 'Gêneros', icon: <FaTags /> },
    { to: '/contato', text: 'Contato', icon: <FaEnvelope /> }
  ];

  return (
    <nav>
      <ul className="flex items-center gap-2">
        {navItems.map(({ to, text, icon }) => (
          <li key={to}>
            <NavLink 
              to={to} 
              className={({ isActive }) => 
                `nav-link flex items-center gap-2 ${
                  isActive ? 'bg-emerald-500/10 text-emerald-400' : 'text-gray-300'
                }`
              }
            >
              {icon}
              <span className="hidden sm:inline">{text}</span>
            </NavLink>
          </li>
        ))}
      </ul>    
    </nav>
  );
}
