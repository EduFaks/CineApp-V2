import NavBar from "../NavBar/Navbar"
import ToggleTheme from "../ToggleTheme/ToggleTheme"

const Header = () => {
  return (
    <div className="p-5 w-full bg-black dark:bg-dark-200 flex justify-between items-center">
      <span className="text-gray-100">Olá, Visitante </span>
      <h1 className="text-gray-100 text-2xl sm:text-4xl">Bem vindo ao CineApp!</h1>
      <NavBar/>
      <ToggleTheme />
    </div>
  )
}

export default Header