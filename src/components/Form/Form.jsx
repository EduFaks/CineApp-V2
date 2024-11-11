import Input from "../Input/Input"
import { useState } from "react"

const Form = ({ onSubmit }) => {

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = event => {
    event.preventDefault()
    event.stopPropagation()

    onSubmit(userName, password)
  }

  return (
    <form className="h-full w-full px-5 pt-52 flex flex-col items-center gap-10" onSubmit={handleSubmit}>
      <Input 
      type="text" 
      placeholder="Informe seu nome"
      onChange={e => setUserName(e.target.value)} />
      <Input 
      type="password" 
      placeholder="Informe sua senha"
      onChange={e => setPassword(e.target.value)} />
      <button type="submit" className="bg-brand-100 px-5 py-2 text-gray-200 uppercase rounded-full hover:animate-pulse outline-none focus:shadow-md focus:shadow-gray-500">Confirmar</button>
    </form>
  )
}

export default Form