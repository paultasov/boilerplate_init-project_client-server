import axios from 'axios';
import { setAccessToken } from '../../shared/axiosInstance';
import { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default function SignupPage({ setUser }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const submitHandle = async (e) => {
    e.preventDefault();

    const response = await axios.post('/api/auth/signup', form);
    setUser(response.data.user);
    setAccessToken(response.data.accessToken);
  };

  const changeHandle = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container style={{ width: '500px', marginTop: '20px' }}>
      <h4 style={{ marginBottom: '20px' }}>Форма регистрации нового пользователя</h4>
      <form onSubmit={submitHandle}>
        <label htmlFor="userName" style={{ marginBottom: '10px' }}>
          Введите имя:{' '}
        </label>
        <Form.Control
          id="userName"
          name="name"
          onChange={changeHandle}
          value={form.name}
          size="sm"
          type="text"
          placeholder="Имя"
        />
        <br />

        <label htmlFor="userEmail" style={{ marginBottom: '10px' }}>
          Введите email:{' '}
        </label>
        <Form.Control
          id="userEmail"
          name="email"
          onChange={changeHandle}
          value={form.email}
          size="sm"
          type="email"
          placeholder="Почта: example@example.com"
        />
        <br />

        <label htmlFor="userPassword" style={{ marginBottom: '10px' }}>
          Введите password:{' '}
        </label>
        <Form.Control
          id="userPassword"
          name="password"
          onChange={changeHandle}
          value={form.password}
          size="sm"
          type="password"
          placeholder="Пароль"
        />
        <br />

        <Button variant="success" type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </Container>
  );
}
