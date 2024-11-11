import { useState } from "react";
import emailjs from '@emailjs/browser';

function Contato() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');

    function sendEmail(e) {
        e.preventDefault();
        if(nome === '' || email === '' || mensagem === '') {
            alert("Preencha todos os campos!");
            return;
        }

        const templateParams = {
            from_name: nome,
            message: mensagem,
            email: email
        }
        emailjs.send("service_wnnigsh", "template_8gfroqv", templateParams,"pqbkPJYR1NxJTqy-q")
        .then((response) => {
            console.log('Enviado com sucesso', response.status, response.text);
            setNome('');
            setEmail('');
            setMensagem('');
        }, (error) => {
            console.log('Erro ao enviar', error);
        })
    }

    return ( 
        <div className="flex justify-center m-5">
            <form className="flex flex-col w-2/4 dark:text-white" onSubmit={sendEmail}>
                <label htmlFor="nome">Nome:</label>
                <input 
                    className="card p-4 text-center transition-all duration-300 hover:scale-101" 
                    type="text" 
                    name="Nome" 
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    />
                <label htmlFor="email">E-mail:</label>
                <input 
                    className="card p-4 text-center transition-all duration-300 hover:scale-101" 
                    type="text" 
                    name="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email" />
                <label htmlFor="mensagem">Mensagem:</label>
                <textarea 
                    name="Mensagem" 
                    id="mensagem"
                    value={mensagem}
                    className="card p-4 text-center transition-all duration-300 hover:scale-101"
                    onChange={(e) => setMensagem(e.target.value)}
                    />
                <div className="flex justify-center">
                <button 
                    style={{marginTop: '20px'}}
                    className="card p-2 text-center transition-all duration-300 hover:scale-101" 
                    value="Enviar"
                    type="submit">Enviar</button>
                </div>
            </form>
        </div>
    );
}

export default Contato;