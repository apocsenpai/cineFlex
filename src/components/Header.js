import { useLocation, useNavigate } from "react-router-dom";
import backImg from "../assets/img/arrow.png";

const Header = () => {
    let {pathname} = useLocation();
    const navigate = useNavigate();
    function goBackOnePage(){

        navigate(-1);
    }
  return (
    <header>
      {(pathname === "/" || pathname === "/sucesso") ? "" : <button onClick={goBackOnePage}><img src={backImg}/></button>}
      <h1>CINEFLEX</h1>
    </header>
  );
};

export default Header;
