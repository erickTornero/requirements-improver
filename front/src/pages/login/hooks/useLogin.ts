import { v4 as uuid } from 'uuid'
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "./useToken";

interface LoginInterface {
  username: string
  password: string
}

const user: LoginInterface = {
  username: 'isa_admin',
  password: 'pass*isac_'
}

const useUnitState: LoginInterface = {
  username: '',
  password: ''
}


export function useLogin () {
  const [formLogin, setFormLogin] = useState<LoginInterface>(useUnitState)
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const {changeToken} = useToken()
  const navigator = useNavigate()
  
  const formHandle = (e : ChangeEvent<HTMLInputElement>) => {
    const temp: any = {...formLogin}
    temp[e.target.name] = e.target.value 
    setFormLogin({...temp})
    setError(false)
  }

  const sendLogin = () => {
    setIsLogin(true)
    const loginTimeout = setTimeout(() => {
      if(JSON.stringify(user) == JSON.stringify(formLogin)){
        localStorage.setItem('user', user.username)
        changeToken(uuid())
        navigator('/')
      }
      else {
        setError(true)
        localStorage.setItem('user', '')
        changeToken('')
      }
      setIsLogin(false)
      clearTimeout(loginTimeout)
    },1000)
  }

  const logout = () => {
    setIsLogin(true)
    const loginTimeout = setTimeout(() => {
      localStorage.setItem('user', '')
      changeToken('')
      clearTimeout(loginTimeout)
      navigator('/login')
      setIsLogin(false)
  },1300)
  }

  return {
    formLogin,
    isLogin,
    sendLogin,
    setFormLogin: formHandle,
    error,
    logout
  }
}