import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import MoviePage from "../pages/MoviePage/MoviePage";
import SeatsPage from "../pages/SeatsPage/SeatsPage";
import SessionPage from "../pages/SessionPage/SessionPage";
import SuccessPage from "../pages/SuccessPage/SuccessPage";
import Header from "./Header";

const MainScreen = () => {
  const [successOrder, setSuccessOrder] = useState({
    ids: [],
    name: "",
    cpf: "",
  });

  function createFinalOrder(finalOrder, sessionTimeId) {
    setSuccessOrder({
      ...setSuccessOrder,
      order: finalOrder,
      sessionId: sessionTimeId,
    });
  }

  return (
    <Router>
      <MainContainer>
        <Header />
        <Routes>
          <Route path="/" element={<MoviePage />} />
          <Route path="/sessoes/:movieId" element={<SessionPage />} />
          <Route
            path="/assentos/:sessionTimeId"
            element={<SeatsPage createFinalOrder={createFinalOrder} />}
          />
          <Route
            path="/sucesso"
            element={<SuccessPage successOrder={successOrder} />}
          />
        </Routes>
      </MainContainer>
    </Router>
  );
};

const MainContainer = styled.div`
  min-height: 90vh;
  & > header {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    margin-bottom: 67px;
    width: 100%;
    height: 67px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #c3cfd9;
    h1 {
      font-size: 34px;
      color: #e8833a;
      font-weight: 400;
    }
    button {
      cursor: pointer;
      background-color: transparent;
      border: none;
        height: 100%;
        position: absolute;
        top: 0;
        left: 10px;
    }
  }
`;

export default MainScreen;
