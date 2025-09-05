import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeContainer = styled.div`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  min-height: 100vh;
  color: white;
`;

const HeroSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 30px;
  color: #f8f9fa;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #d4af37, #f4d03f);
  border: none;
  padding: 15px 40px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #1a1a1a;
  border-radius: 50px;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(45deg, #f4d03f, #d4af37);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
  }
`;

const ServicesSection = styled.section`
  padding: 80px 0;
  background: #2d2d2d;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 60px;
  color: #d4af37;
  font-weight: bold;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 40px;
  }
`;

const ServiceCard = styled(Card)`
  background: #1a1a1a;
  border: 2px solid #d4af37;
  border-radius: 15px;
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(212, 175, 55, 0.2);
    border-color: #f4d03f;
  }
`;

const ServiceImage = styled.div`
  height: 200px;
  background: #333;
  border-radius: 15px 15px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: #d4af37;
`;

const ServiceTitle = styled.h4`
  color: #d4af37;
  font-weight: bold;
  margin-bottom: 15px;
`;

const ServiceDescription = styled.p`
  color: #f8f9fa;
  line-height: 1.6;
`;

const ServicePrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #d4af37;
  text-align: center;
  margin-top: 15px;
`;

const AboutSection = styled.section`
  padding: 80px 0;
  background: #1a1a1a;
`;

const AboutImage = styled.div`
  height: 400px;
  background: #333;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 6rem;
  color: #d4af37;
  
  @media (max-width: 768px) {
    height: 300px;
    font-size: 4rem;
  }
`;

const AboutText = styled.div`
  padding-left: 40px;
  
  @media (max-width: 768px) {
    padding-left: 0;
    margin-top: 30px;
  }
`;

const AboutTitle = styled.h3`
  color: #d4af37;
  font-size: 2.5rem;
  margin-bottom: 25px;
  font-weight: bold;
`;

const AboutDescription = styled.p`
  color: #f8f9fa;
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 20px;
`;

const ContactSection = styled.section`
  padding: 80px 0;
  background: #2d2d2d;
`;

const ContactCard = styled(Card)`
  background: #1a1a1a;
  border: 2px solid #d4af37;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  height: 100%;
`;

const ContactIcon = styled.div`
  font-size: 3rem;
  color: #d4af37;
  margin-bottom: 20px;
`;

const ContactTitle = styled.h5`
  color: #d4af37;
  font-weight: bold;
  margin-bottom: 15px;
`;

const ContactInfo = styled.p`
  color: #f8f9fa;
  font-size: 1.1rem;
  margin: 0;
`;

const Home = () => {
  return (
    <HomeContainer>
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <Row>
            <Col>
              <HeroTitle>Barbearia Premium</HeroTitle>
              <HeroSubtitle>Estilo, Tradição e Excelência</HeroSubtitle>
              <StyledButton size="lg">
                Agendar Horário
              </StyledButton>
            </Col>
          </Row>
        </Container>
      </HeroSection>

      {/* Services Section */}
      <ServicesSection>
        <Container>
          <SectionTitle>Nossos Serviços</SectionTitle>
          <Row className="g-4">
            <Col lg={4} md={6}>
              <ServiceCard>
                <ServiceImage>✂️</ServiceImage>
                <Card.Body>
                  <ServiceTitle>Corte Tradicional</ServiceTitle>
                  <ServiceDescription>
                    Corte clássico com técnicas tradicionais, 
                    proporcionando um visual elegante e atemporal.
                  </ServiceDescription>
                  <ServicePrice>R$ 35,00</ServicePrice>
                </Card.Body>
              </ServiceCard>
            </Col>
            
            <Col lg={4} md={6}>
              <ServiceCard>
                <ServiceImage>🪒</ServiceImage>
                <Card.Body>
                  <ServiceTitle>Barba & Bigode</ServiceTitle>
                  <ServiceDescription>
                    Aparar e modelar barba e bigode com precisão, 
                    usando produtos premium para o melhor resultado.
                  </ServiceDescription>
                  <ServicePrice>R$ 25,00</ServicePrice>
                </Card.Body>
              </ServiceCard>
            </Col>
            
            <Col lg={4} md={6}>
              <ServiceCard>
                <ServiceImage>💆‍♂️</ServiceImage>
                <Card.Body>
                  <ServiceTitle>Tratamento Completo</ServiceTitle>
                  <ServiceDescription>
                    Corte + barba + tratamentos especiais. 
                    A experiência completa de cuidado masculino.
                  </ServiceDescription>
                  <ServicePrice>R$ 55,00</ServicePrice>
                </Card.Body>
              </ServiceCard>
            </Col>
          </Row>
        </Container>
      </ServicesSection>

      {/* About Section */}
      <AboutSection>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <AboutImage>🏪</AboutImage>
            </Col>
            <Col lg={6}>
              <AboutText>
                <AboutTitle>Sobre Nós</AboutTitle>
                <AboutDescription>
                  Com mais de 20 anos de experiência, nossa barbearia combina 
                  tradição e modernidade para oferecer o melhor em cuidados masculinos.
                </AboutDescription>
                <AboutDescription>
                  Nossos profissionais são especializados em técnicas clássicas 
                  e tendências contemporâneas, garantindo sempre o melhor resultado 
                  para nossos clientes.
                </AboutDescription>
                <AboutDescription>
                  Venha conhecer nosso ambiente acolhedor e desfrute de uma 
                  experiência única de cuidado e estilo.
                </AboutDescription>
              </AboutText>
            </Col>
          </Row>
        </Container>
      </AboutSection>

      {/* Contact Section */}
      <ContactSection>
        <Container>
          <SectionTitle>Entre em Contato</SectionTitle>
          <Row className="g-4">
            <Col lg={4} md={6}>
              <ContactCard>
                <ContactIcon>📍</ContactIcon>
                <ContactTitle>Endereço</ContactTitle>
                <ContactInfo>
                  Rua das Flores, 123<br/>
                  Centro - São Paulo/SP<br/>
                  CEP: 01234-567
                </ContactInfo>
              </ContactCard>
            </Col>
            
            <Col lg={4} md={6}>
              <ContactCard>
                <ContactIcon>📞</ContactIcon>
                <ContactTitle>Telefone</ContactTitle>
                <ContactInfo>
                  (11) 99999-9999<br/>
                  (11) 3333-3333
                </ContactInfo>
              </ContactCard>
            </Col>
            
            <Col lg={4} md={6}>
              <ContactCard>
                <ContactIcon>🕒</ContactIcon>
                <ContactTitle>Horário de Funcionamento</ContactTitle>
                <ContactInfo>
                  Segunda à Sexta: 8h às 19h<br/>
                  Sábado: 8h às 17h<br/>
                  Domingo: Fechado
                </ContactInfo>
              </ContactCard>
            </Col>
          </Row>
        </Container>
      </ContactSection>
    </HomeContainer>
  );
};

export default Home;