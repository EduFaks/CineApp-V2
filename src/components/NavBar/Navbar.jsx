import {NavLink} from 'react-router-dom';

export default function NavBar(){
    return(
        <>
        <nav className="text-white">
            <ul className='flex justify-between'>
                <li className='p-4'><NavLink to='/' className="hover:border-b-white"> Home</NavLink></li>
                <li className='p-4'><NavLink to='filmes' className="hover:border-b-white"> Filmes</NavLink></li>
                <li className='p-4'><NavLink to='sobre' className="hover:border-b-white"> Sobre</NavLink></li>
                <li className='p-4'><NavLink to='contato' className="hover:border-b-white"> Contato</NavLink></li>
            </ul>    
        </nav>
        </>
    )
}