import { useEffect, useState } from "react";
import styled from "styled-components";
import Page from "../../components/Page";
import API_URL from "../../components/apiURL";
import axios from "axios";
import { Link } from "react-router-dom";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const promise = axios.get(`${API_URL}movies`);
    promise.then((r) => setMovies(r.data));
    promise.catch((err) => console.log(err.reponse.data));
  }, []);

  return (
    <Page>
      <header>
        <h2>Selecione o filme</h2>
      </header>
      <MovieList>
        {movies.map(({ id, posterURL }) => (
          <Movie key={id} id={id} posterURL={posterURL} />
        ))}
      </MovieList>
    </Page>
  );
};

const Movie = ({ id, posterURL }) => {
  return (
    <>
      <li>
        <Link to={`/sessoes/${id}`}>
          <img src={posterURL} />
        </Link>
      </li>
    </>
  );
};

const MovieList = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 11px 30px;
  li {
    width: 145px;
    height: 209px;
    padding: 8px;
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    background-color: #fff;
    transition: 200ms ease;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export default MoviePage;
