import { useState } from 'react';
import axiosInstance from '../../shared/axiosInstance';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default function SigninPage({ setUser }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const submitHandle = async (e) => {
    e.preventDefault();

    const response = await axiosInstance.post('/auth/signin', form);
    setUser(response.data.user);
  };

  const changeHandle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container style={{ width: '500px', marginTop: '20px' }}>
      <h4 style={{ marginBottom: '20px' }}>Форма входа на сайт</h4>

      <form onSubmit={submitHandle}>
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
          Войти
        </Button>
      </form>
    </Container>
  );
}
