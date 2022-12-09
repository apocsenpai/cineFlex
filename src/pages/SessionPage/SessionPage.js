import Page from "../../components/Page";
import styled from "styled-components";
import Session from "./Session";
import { useParams } from "react-router-dom";
import API_URL from "../../components/apiURL";
import { useEffect, useState } from "react";
import axios from "axios";

const SessionPage = () => {
  const [movieSession, setMovieSession] = useState(null);
  const {movieId} = useParams();
  useEffect(()=>{
      const promise = axios.get(`${API_URL}movies/${movieId}/showtimes`);
      promise.then(res=>setMovieSession(res.data));
      promise.catch(err=>console.log(err.response.data));
  },[]);

  if(!movieSession){
    return (
      <>alala</>
    );
  }


  return (
    <Page>
      <header>
        <h2>Selecione o horário</h2>
      </header>
      <SessionList>
        {movieSession.days.map(({ id, weekday, date, showtimes }) => (
          <Session
            key={id}
            weekday={weekday}
            date={date}
            showtimes={showtimes}
          />
        ))}
      </SessionList>
      <footer>
        <div><img src={movieSession.posterURL}/></div>
        <p><span>{movieSession.title}</span></p>
      </footer>
    </Page>
  );
};

const SessionList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 24px;
  gap: 23px;
`;

export default SessionPage;
