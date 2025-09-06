import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/image-1 logo barbearia.png';
import './Login.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  senha: Yup.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
});

const Login = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Dados do login:', values);
    // Aqui você fará a chamada para a API
    setSubmitting(false);
  };

  return (
    <div className="login-auth-page">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            {/* Botão Voltar */}
            <div className="login-back-button-container">
              <Link to="/" className="login-back-button">
                ← Voltar à Tela Inicial
              </Link>
            </div>
            
            {/* Logo */}
            <div className="login-logo-container">
              <img src={logo} alt="Logo" className="login-auth-logo" />
            </div>
            
            <div className="login-auth-container">

              {/* Formulário */}
              <Formik
                initialValues={{
                  email: '',
                  senha: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="login-auth-form">
                    <div className="login-form-group">
                      <label htmlFor="email" className="login-form-label">
                        EMAIL:
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="login-form-input"
                        placeholder="EX: AUSTIN@GMAIL.COM"
                      />
                      <ErrorMessage name="email" component="div" className="error-message" />
                    </div>

                    <div className="login-form-group">
                      <label htmlFor="senha" className="login-form-label">
                        SENHA:
                      </label>
                      <Field
                        type="password"
                        id="senha"
                        name="senha"
                        className="login-form-input"
                        placeholder="EX: AVELAR123"
                      />
                      <ErrorMessage name="senha" component="div" className="login-error-message" />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="login-auth-button"
                    >
                      LOGIN
                    </button>
                  </Form>
                )}
              </Formik>

              {/* Link para cadastro */}
              <div className="login-auth-link">
                <Link to="/register" className="login-link-text">
                  NÃO TEM CONTA? REGISTRE-SE
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
