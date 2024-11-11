import NavBar from "../NavBar/Navbar"
import ToggleTheme from "../ToggleTheme/ToggleTheme"

const Header = () => {
  return (
    <div className="container-custom">
      <div className="py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <img src="/icon-film.png" alt="CineApp Logo" className="w-10 h-10" />
          <div className="flex flex-col">
            <span className="text-sm text-emerald-400 font-medium">Olá, Visitante</span>
            <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              CineApp
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <NavBar />
          <div className="w-px h-8 bg-gray-700"></div>
          <ToggleTheme />
        </div>
      </div>
    </div>
  )
}

export default Header
