import { Link } from "react-router-dom";
import styled from "styled-components";
import OrangeButton from "../../components/OrangeButton";

const Session = ({ weekday, date, showtimes }) => {
  return (
    <ShowTime data-test="movie-day">
      <p>
        {weekday} - {date}
      </p>
      <ul>
        {showtimes.map((s) => (
          <ButtonTime key={s.id} id={s.id} time={s.name} />
        ))}
      </ul>
    </ShowTime>
  );
};

const ButtonTime = ({ time, id }) => {
  return (
    <li>
      <Link to={`/assentos/${id}`}>
        <OrangeButton data-test="showtime">{time}</OrangeButton>
      </Link>
    </li>
  );
};

const ShowTime = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    font-size: 20px;
    color: #293845;
  }
  & > ul {
    display: flex;
    gap: 8px;
  }
`;

export default Session;
