import Header from "./components/Header/Header"
import { Outlet } from "react-router-dom"

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <div className="nav-container">
        <Header />
      </div>
      <main className="animate-fade-in">
        <Outlet />
      </main>
      <footer className="container-custom py-6 mt-auto border-t border-gray-800">
        <div className="text-center text-gray-400">
          <p>© 2024 CineApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
