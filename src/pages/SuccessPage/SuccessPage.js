import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import OrangeButton from "../../components/OrangeButton";
import Page from "../../components/Page";
import API_URL from "../../components/apiURL";
import { Link } from "react-router-dom";

const SuccessPage = ({successOrder}) => {

  const {sessionId, order} = successOrder;
  const {name, cpf, ids} = order;
  const [session, setSession] = useState(null);

  useEffect(()=>{
    const promise = axios.get(`${API_URL}showtimes/${sessionId}/seats`);
    promise.then(res=>setSession(res.data));
  },[]);
  console.log(session)
  if(!session){
    return <>lalala</>;
  }

  const filteredSeats = session.seats.filter(({id})=> ids.includes(id));

  return (
    <Success>
      <header>
        <h2>Pedido feito com sucesso!</h2>
      </header>
      <section>
        <div data-test="movie-info">
            <h3>Filme e sessão</h3>
            <p>{session.movie.title}</p>
            <p>{session.day.date} {session.name}</p>
        </div>
        <div data-test="seats-info">
            <h3>Ingressos</h3>
            {filteredSeats.map(({name})=><p key={name}>Assento {name}</p>)}
        </div>
        <div data-test="client-info">
            <h3>Comprador</h3>
            <p>Nome: {name}</p>
            <p>CPF: {cpf}</p>
        </div>
      </section>
      <div>

        <BackToHome><Link to="/" data-test="go-home-btn">Voltar para Home</Link></BackToHome>

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
  a{
    text-decoration: none;
    color: #fff;
  }
`;
export default SuccessPage;
