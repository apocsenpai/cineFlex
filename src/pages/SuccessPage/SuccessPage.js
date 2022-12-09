import styled from "styled-components";
import OrangeButton from "../../components/OrangeButton";
import Page from "../../components/Page";

const SuccessPage = () => {
  return (
    <Success>
      <header>
        <h2>Pedido feito com sucesso!</h2>
      </header>
      <section>
        <div>
            <h3>Filme e sessão</h3>
            <p>Enola Holmes</p>
            <p>24/06/2021 15:00</p>
        </div>
        <div>
            <h3>Ingressos</h3>
            <p>Assento 15</p>
            <p>Assento 16</p>
        </div>
        <div>
            <h3>Comprador</h3>
            <p>Nome: João da Silva Sauro</p>
            <p>CPF: 123.456.789-10</p>
        </div>
      </section>
      <div>
        <BackToHome>Voltar para Home</BackToHome>
      </div>
    </Success>
  );
};

const Success = styled(Page)`
  & > header {
    h2 {
      color: #247a6b;
      font-weight: 700;
      font-size: 24px;
      text-align: center;
      width: 40%;
      line-height: 28px;
    }
  }
  &>section{
    padding: 0px 29px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    color: #293845;
    h3{
        font-size: 24px;
        margin-bottom: 10px;
    }
    p{
        font-size: 22px;
        margin-bottom: 5px;
    }
  }
`;

const BackToHome = styled(OrangeButton)`
  width: 225px;
  height: 42px;
  margin-top: 70px;
`;
export default SuccessPage;
