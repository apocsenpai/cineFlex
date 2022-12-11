import styled from "styled-components";
import Page from "../../components/Page";
import API_URL from "../../components/apiURL";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DataForm from "./DataForm";

const SeatsPage = ({ createFinalOrder }) => {
  const [sessionSeats, setSessionSeats] = useState(null);
  const [selectedIdSeats, setSelectedIdSeats] = useState([]);
  const { sessionTimeId } = useParams();
  const [buyers, setBuyers] = useState([]);
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
      const confirmDelete = window.confirm(
        "Você quer realmente remover o assento?"
      );
      if (confirmDelete) {
        const filteredSeats = selectedIdSeats.filter((id) => id !== seat.id);
        const filteredBuyers = buyers.filter(
          ({ idAssento }) => idAssento !== seat.id
        );
        setBuyers(filteredBuyers);
        setSelectedIdSeats(filteredSeats);
      }
      return;
    }
    setBuyers([...buyers, { idAssento: seat.id, nome: "", cpf: "" }]);
    setSelectedIdSeats([...selectedIdSeats, seat.id]);
  }

  function finishOrder(e) {
    e.preventDefault();
    if (!selectedIdSeats.length) {
      alert("Selecione pelo menos 1 assento!");
      return;
    }
    const order = {
      ids: selectedIdSeats,
      compradores: buyers,
    };
    createFinalOrder(order, sessionTimeId);
    const promise = axios.post(`${API_URL}seats/book-many`, order);
    promise.then(() => navigate("/sucesso"));
    promise.catch((err) => console.log(err.response.data));
  }

  if (!sessionSeats) {
    return <></>;
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
      <DataForm
        finishOrder={finishOrder}
        buyers={buyers}
        setBuyers={setBuyers}
      />
      <footer data-test="footer">
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
        data-test="seat"
        isSelected={isSelected}
        onClick={() => selectSeats(seat)}
        isAvailable={isAvailable}
      >
        {children}
      </SeatButton>
    </>
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
  background-color: ${({ isSelected, isAvailable }) => {
    if (isAvailable) {
      if (isSelected) {
        return "#1AAE9E";
      }
      return "#c3cfd9";
    }
    return "#fbe192";
  }};
  border: 1px solid
    ${({ isSelected, isAvailable }) => {
      if (isAvailable) {
        if (isSelected) {
          return "#0E7D71";
        }
        return "#808f9d";
      }
      return "#f7c52b";
    }};
  border-radius: 12px;
  cursor: pointer;
`;
export default SeatsPage;
