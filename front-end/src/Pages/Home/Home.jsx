import { Container, Row, Col, Button, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "../../assets/image-1 logo barbearia.png";
import barbearia from "../../assets/Imagem_Barbearia.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Navbar */}
      <Navbar expand="lg" className="custom-navbar" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" className="navbar-logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="menu" className="custom-toggler" />
          <Navbar.Collapse id="menu">
            <Nav className="ms-auto">
              <Nav.Link href="#about">Conheça-nos</Nav.Link>
              <Nav.Link href="#services">Serviços</Nav.Link>
              <Nav.Link href="#contact">Contato</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero */}
      <section className="hero d-flex flex-column align-items-center justify-content-center text-center">
        <Container>
          <Row>
            <Col>
              <h1>Seu momento de cuidado com estilo.</h1>
              <p>Atendimento especializado para um visual impecável.</p>
              <Button
                className="cta-btn"
                onClick={() => navigate("/login")}
              >
                Agende Agora
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Conheça-nos */}
      <section id="about" className="about">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} lg={6}>
              <img src={barbearia} alt="Barbearia" className="img-fluid barbearia-image mb-3 mb-lg-0" />
            </Col>
            <Col xs={12} lg={6}>
              <h2>Conheça-nos</h2>
              <p>
                Nascida no coração do bairro Sapiranga, em Fortaleza, a Dias's
                Barbershop foi fundada em 2020 com um propósito simples: resgatar
                a tradição das barbearias clássicas, mas com um olhar
                contemporâneo e um atendimento de excelência.
              </p>
              <p>
                Nosso time é formado por barbeiros especializados que dominam as
                técnicas tradicionais e as tendências atuais. Utilizamos os
                melhores produtos e seguimos rígidos protocolos de higiene para
                garantir sua satisfação e segurança.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Serviços */}
      <section id="services" className="services text-center">
        <Container>
          <h2>Serviços:</h2>
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={4}>
              <div className="service-box">Corte - 40 R$</div>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <div className="service-box">Barba - 30 R$</div>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <div className="service-box">Corte e Barba - 60 R$</div>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <div className="service-box">Sobrancelha - 10 R$</div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Localização */}
      <section id="contact" className="location text-center">
        <Container>
          <h2>Localização e contato:</h2>
          <p>Rua Edmundo Gomes 323 - Sapiranga</p>
          <p>Fortaleza - Ceará</p>
          <p>Telefone: 991919232</p>
          <p>Email: DiasBarbershop@gmail.com</p>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer text-center">
        <p>Dias's Barbershop - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
