import styled, { keyframes } from "styled-components";

const loading = keyframes`

    0% {
        background-color: #ffd9aa;
    }
    50%{
        background-color: #ffca95;
    }
    100% {
        background-color: #ffb577;
    }

`;

const SkeletonLoading = ({ width, height, number, children, text }) => {
  return number ? (
    [...Array(number)].map((s, id) => (
      <StyledSkeleton width={width} text={text} height={height} key={id}>{children}</StyledSkeleton>
    ))
  ) : (
    <StyledSkeleton width={width} text={text} height={height} >{children}</StyledSkeleton>
  );
};

const StyledSkeleton = styled.section`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  box-shadow: 0px 2px 4px 2px #0000001a;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  animation: ${loading} 1000ms ease-in-out infinite alternate;
  ${({text})=>text && "margin: 10px"};
    section{
        display: flex;
        gap: 10px;
        padding-left: 10px;
        margin-top: 10px;
    }
`;

export default SkeletonLoading;
