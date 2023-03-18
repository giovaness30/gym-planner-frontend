import { Button, Form, Input } from 'antd'
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
        alert(errorMessage)
      })
  }

  const onFinish = values => {
    handleLogin(values.email, values.password)
  }

  return (
    <Fragment>
      <div className="m-auto w-3/4 flex-col">
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          size={'large'}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Informar Email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Informar a senha' }]}
          >
            <Input.Password
              className="p-2 m-2 md:w-3/4 sm:w-full"
              style={{ width: '98%' }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="bg-green-600 mt-3"
              id="btnSignIn"
              type="primary"
              htmlType="submit"
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  )
}

export default Login
