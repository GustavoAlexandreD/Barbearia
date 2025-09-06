import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/image-1 logo barbearia.png';
import './Register.css';

const RegisterSchema = Yup.object().shape({
  nome: Yup.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .required('Nome é obrigatório'),
  email: Yup.string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  senha: Yup.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref('senha'), null], 'Senhas devem ser iguais')
    .required('Confirmação de senha é obrigatória'),
});

const Register = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Dados do cadastro:', values);
    // Aqui você fará a chamada para a API
    setSubmitting(false);
  };

  return (
    <div className="auth-page">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            {/* Botão Voltar */}
            <div className="back-button-container">
              <Link to="/" className="back-button">
                ← Voltar à Tela Inicial
              </Link>
            </div>
            
            {/* Logo */}
            <div className="logo-container">
              <img src={logo} alt="Logo" className="auth-logo" />
            </div>
            
            <div className="auth-container">

              {/* Formulário */}
              <Formik
                initialValues={{
                  nome: '',
                  email: '',
                  senha: '',
                  confirmarSenha: '',
                }}
                validationSchema={RegisterSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="auth-form">
                    <div className="form-group">
                      <label htmlFor="nome" className="form-label">
                        NOME:
                      </label>
                      <Field
                        type="text"
                        id="nome"
                        name="nome"
                        className="form-input"
                        placeholder="EX: AUSTIN"
                      />
                      <ErrorMessage name="nome" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        EMAIL:
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        placeholder="EX: AUSTIN@GMAIL.COM"
                      />
                      <ErrorMessage name="email" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="senha" className="form-label">
                        SENHA:
                      </label>
                      <Field
                        type="password"
                        id="senha"
                        name="senha"
                        className="form-input"
                        placeholder="EX: AVELAR123"
                      />
                      <ErrorMessage name="senha" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmarSenha" className="form-label">
                        CONFIRMAR SENHA:
                      </label>
                      <Field
                        type="password"
                        id="confirmarSenha"
                        name="confirmarSenha"
                        className="form-input"
                        placeholder="EX: AVELAR123"
                      />
                      <ErrorMessage name="confirmarSenha" component="div" className="error-message" />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="auth-button"
                    >
                      REGISTRAR
                    </button>
                  </Form>
                )}
              </Formik>

              {/* Link para login */}
              <div className="auth-link">
                <Link to="/login" className="link-text">
                  JÁ TEM UMA CONTA? FAÇA O LOGIN
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
