import styled from "styled-components";
import Page from "../../components/Page";
import API_URL from "../../components/apiURL";
import OrangeButton from "../../components/OrangeButton";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SeatsPage = ({createFinalOrder}) => {
  const [sessionSeats, setSessionSeats] = useState(null);
  const [selectedIdSeats, setSelectedIdSeats] = useState([]);
  const { sessionTimeId } = useParams();
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const promise = axios.get(`${API_URL}showtimes/${sessionTimeId}/seats`);
    promise.then((res) => setSessionSeats(res.data));
    promise.catch((err) => console.log(err.response.data));
  }, []);

  function selectSeats(seat) {
    if (!seat.isAvailable) {
      alert("Esse assento não está disponível");
      return;
    }

    seat.selected = !seat.selected;

    if (!seat.selected) {
      const filteredSeats = selectedIdSeats.filter((id) => id !== seat.id);
      setSelectedIdSeats(filteredSeats);
      return;
    }
    setSelectedIdSeats([...selectedIdSeats, seat.id]);
  }

  function finishOrder(e) {
    e.preventDefault();
    const order = {
      ids: selectedIdSeats,
      name,
      cpf
    }
    const promise =  axios.post(`${API_URL}seats/book-many`, order);
    promise.then(res=> navigate('/sucesso'));
    promise.catch(err=> console.log(err.response.data));

  }

  if (!sessionSeats) {
    return <>alala</>;
  }

  return (
    <Page>
      <header>
        <h2>Selecione o(s) assento(s)</h2>
      </header>
      <SeatList>
        {sessionSeats.seats.map((seat) => (
          <Seat
            key={seat.id}
            seat={seat}
            selectSeats={selectSeats}
            isSelected={selectedIdSeats.includes(seat.id)}
          >
            {seat.name}
          </Seat>
        ))}
      </SeatList>
      <SeatInfo>
        <div>
          <div></div>
          <p>Selecionado</p>
        </div>
        <div>
          <div></div>
          <p>Disponível</p>
        </div>
        <div>
          <div></div>
          <p>Indisponível</p>
        </div>
      </SeatInfo>
      <BuyerData
        finishOrder={finishOrder}
        name={name}
        cpf={cpf}
        setName={setName}
        setCpf={setCpf}
      />
      <footer>
        <div>
          <img src={sessionSeats.movie.posterURL} />
        </div>
        <p>
          <span>{sessionSeats.movie.title}</span>
          <span>
            {sessionSeats.day.weekday} - {sessionSeats.name}
          </span>
        </p>
      </footer>
    </Page>
  );
};

const Seat = ({ seat, selectSeats, children, isSelected }) => {
  const { isAvailable } = seat;
  return (
    <>
      <SeatButton
        isSelected={isSelected}
        onClick={() => selectSeats(seat)}
        isAvailable={isAvailable}
      >
        {children}
      </SeatButton>
    </>
  );
};
const BuyerData = ({ finishOrder, name, cpf, setName, setCpf }) => {
  return (
    <Data onSubmit={finishOrder}>
      <h3>Dados do comprador</h3>
      <div>
        <input
          type={`text`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Nome</label>
      </div>
      <div>
        <input
          type={`text`}
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <label>CPF</label>
      </div>
      <section>
        <ConfirmButton type={`submit`}>Reservar assento(s)</ConfirmButton>
      </section>
    </Data>
  );
};

const SeatInfo = styled.section`
  display: flex;
  width: 100%;
  padding: 20px;
  justify-content: center;
  gap: 26px;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    div {
      width: 26px;
      height: 26px;
      border-radius: 12px;
    }
  }
  div:nth-child(1) {
    div {
      background-color: #1aae9e;
      border: 1px solid #0e7d71;
    }
  }
  div:nth-child(2) {
    div {
      background-color: #c3cfd9;
      border: 1px solid #808f9d;
    }
  }
  div:nth-child(3) {
    div {
      border: 1px solid #f7c52b;
      background-color: #fbe192;
    }
  }
`;

const SeatList = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 18px 7px;
  padding: 0px 24px;
`;

const SeatButton = styled.button`
  width: 26px;
  height: 26px;
  background-color: ${({ isSelected, isAvailable }) =>
    isAvailable ? (isSelected ? "#1AAE9E" : "#c3cfd9") : "#fbe192"};
  border: 1px solid
    ${({ isSelected, isAvailable }) =>
      isAvailable ? (isSelected ? "#0E7D71" : "#808f9d") : "#f7c52b"};
  border-radius: 12px;
  cursor: pointer;
`;

const Data = styled.form`
  padding: 0px 24px;
  h3 {
    display: flex;
    width: 100%;
    height: 40px;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 18px;
  }
  div {
    padding-top: 10px;
    position: relative;
    input {
      width: 327px;
      height: 51px;
      padding-left: 16px;
      font-size: 18px;
      border-radius: 3px;
      border: 1px solid #d4d4d4;
      transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
      &:focus {
        outline: none;
        border: 1.5px solid #1a73e8;
        & ~ label {
          transform: translateY(-50%) scale(0.8);
          padding: 0 0.2rem;
          background-color: #fff;
          color: #1a73e8;
        }
      }
    }
    label {
      position: absolute;
      left: 16px;
      color: #afafaf;
      font-size: 18px;
      pointer-events: none;
      transform: translateY(1rem);
      transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
  & > section {
    display: flex;
    justify-content: center;
  }
`;

const ConfirmButton = styled(OrangeButton)`
  width: 225px;
  height: 42px;
  margin-top: 40px;
`;

export default SeatsPage;
