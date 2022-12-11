import styled from "styled-components";

const Page = styled.main`
  margin-top: 67px;
  margin-bottom: 200px;
  & > header {
    height: 110px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    h2 {
      font-weight: 400;
      font-size: 24px;
      color: #293845;
    }
  }
  &>div{
    display: flex;
    justify-content: center;
  }
  footer{
    height: 117px;
    position: fixed;
    z-index: 1;
    bottom: 0;
    right: 0;
    width: 100%;
    background-color: #DFE6ED;
    border-top: 1px solid #9EADBA;
    display: flex;
    align-items: center;
    padding-left: 10px;
    gap: 14px;
    &>div{
      width: 64px;
      height: 89px;
      border-radius: 2;
      box-shadow: 0px 2px 4px 0px #0000001A;
      background-color: #FFFFFF;
      padding: 8px;
      img{
        width: 100%;
        height: 100%;
      }

    }
    &>p{
      color: #293845;
      font-size: 26px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
  }
`;

export default Page;