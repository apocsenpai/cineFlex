import styled from "styled-components";

const OrangeButton = styled.button`
  width: 83px;
  height: 43px;
  border-radius: 3px;
  background-color: #e8833a;
  color: #fff;
  border: 1px solid transparent;
  transition: 150ms linear;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

export default OrangeButton;