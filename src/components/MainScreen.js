import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import MoviePage from "../pages/MoviePage/MoviePage";
import SeatsPage from "../pages/SeatsPage/SeatsPage";
import SessionPage from "../pages/SessionPage/SessionPage";
import SuccessPage from "../pages/SuccessPage/SuccessPage";


const MainScreen = ()=>{
    return (
        <Router>
        <MainContainer>
        <header>
            <h1>CINEFLEX</h1>
        </header>
        <Routes>
            <Route path="/" element={<MoviePage/>}/>
            <Route path="/sessoes/:movieId" element={<SessionPage/>}/>
            <Route path="/assentos/:sessionTimeId" element={<SeatsPage/> }/>
            <Route path="/sucesso" element={<SuccessPage/> }/>
        </Routes>
        </MainContainer>
        </Router>
    );
};

const MainContainer = styled.div`
    min-height: 90vh;
    &>header{
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
        background-color: #C3CFD9;
        h1{
            font-size: 34px;
            color: #E8833A;
            font-weight: 400;
        }
    }
`;

export default MainScreen;