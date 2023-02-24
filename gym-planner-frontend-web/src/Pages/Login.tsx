import { Button, Input } from 'antd'
import { Fragment, useState } from 'react'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import RoutesUrlPath from '../assets/RoutesUrlPath'

const Login = () => {
  const auth = getAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        navigate(RoutesUrlPath.home)
        localStorage.setItem('token', JSON.stringify(userCredential.user))
        // ...
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorMessage)
      })
  }

  return (
    <Fragment>
      <Input
        placeholder="Email"
        style={{ width: 'calc(100% - 200px)' }}
        defaultValue=""
        onChange={(e: any) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Senha"
        style={{ width: 'calc(100% - 200px)' }}
        defaultValue=""
        onChange={(e: any) => setPassword(e.target.value)}
      />
      <Button
        className="bg-green-600"
        onClick={() => handleLogin(email, password)}
        type="primary"
      >
        Entrar
      </Button>
    </Fragment>
  )
}

export default Login
