import styled from "styled-components";

export const SpanColumnRule = styled.span`
  background: #5d5f600f;
  border-radius: 15px;
  text-align: center;
  width: auto;
  padding: 6px 12px;
  margin: 2px;
  display: inline-block;
  font-size: 12px !important;
  font-family: "Helvetica-NeueL-Title";
  font-weight: 400 !important;
  color: #464646 !important;
  opacity: 0.5;

  span {
    display: flex;
    width: max-content;
  }

  .themeDark {
    color: rgb(221, 221, 221);
  }
`;

export const ExceptionDiv = styled.div`
  display: flex;
  flex-wrap: wrap;

  div {
    width: auto;
    padding: 5px 15px 5px 10px;
    background: #6c757d;
    color: #fff;
    border-radius: 7px;
    font-size: 12px;
    margin-right: 5px;
    margin-bottom: 10px;
  }
`;

export const ContainerScript = styled.div`
  border: ${(props) => props.theme.border};
  /* background: rgba(87, 83, 83, 0.027450980392156862); */
  background-color: ${(props) => props.theme.background};
  border-radius: 10px;
  /* color: #000; */
  color: ${(props) => props.theme.text};
  font-family: "Helvetica-NeueL";
  font-size: 14px;
  padding: 20px 0 20px 10%;
`;

export const SelectScript = styled.select`
  /* background: #f7f7f8; */
  border: 0.4px solid #575353;
  /* color: #030229; */
  color: ${(props) => props.theme.text};
  font-size: 13px !important;
  opacity: 0.5;
  font-family: "Helvetica-NeueL";
  font-style: normal;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  /* background-color: #fafafb !important; */
  background-color: ${(props) => props.theme.background};
  height: 38px !important;
  width: 280px;
`;

export const InputException = styled.input`
  background-color: ${(props) => props.theme.background};
`;
