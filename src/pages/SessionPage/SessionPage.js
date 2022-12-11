import Page from "../../components/Page";
import styled from "styled-components";
import Session from "./Session";
import { useParams } from "react-router-dom";
import API_URL from "../../components/apiURL";
import { useEffect, useState } from "react";
import axios from "axios";
import SkeletonLoading from "../../components/SkeletonLoading/SkeletonLoading";

const SessionPage = () => {
  const [movieSession, setMovieSession] = useState(null);
  const { movieId } = useParams();
  useEffect(() => {
    const promise = axios.get(`${API_URL}movies/${movieId}/showtimes`);
    promise.then((res) => setMovieSession(res.data));
    promise.catch((err) => console.log(err.response.data));
  }, []);

  return (
    <Page>
      <header>
        <h2>Selecione o horário</h2>
      </header>
      <SessionList>
        {!movieSession ? (
          <SkeletonLoading width={"100%"} height={"100px"} number={10}>
            <SkeletonLoading width={"200px"} height={"20px"} text={true} />
            <section>
              <SkeletonLoading width={"83px"} height={"43px"} number={2} />
            </section>
          </SkeletonLoading>
        ) : (
          movieSession.days.map(({ id, weekday, date, showtimes }) => (
            <Session
              key={id}
              weekday={weekday}
              date={date}
              showtimes={showtimes}
            />
          ))
        )}
      </SessionList>
      <footer data-test="footer">
        {!movieSession ? (
          <>
            <SkeletonLoading width={"64px"} height={"89px"} />
            <SkeletonLoading width={"200px"} height={"20px"} />
          </>
        ) : (
          <>
            <div>
              <img src={movieSession.posterURL} />
            </div>
            <p>
              <span>{movieSession.title}</span>
            </p>
          </>
        )}
      </footer>
    </Page>
  );
};

const SessionList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 24px;
  gap: 23px;
`;

export default SessionPage;
