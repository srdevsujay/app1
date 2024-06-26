import styled from "styled-components";

export const AccordionUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const AccordionLi = styled.li`
  /* border: 1px solid #ccc; */

  &::after {
    transform: rotate(-180deg);
  }
`;

// .accordion-item.active .accordion-item-btn::after {
//   transform: rotate(-180deg);
// }

export const AccordionTitle = styled.div`
  width: 25%;
  margin: 0;
`;

export const AccordionBtn = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
  border: 0;
  padding: 15px 20px;
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;

  &::before {
    content: "";
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-size: 100%;
    transition: transform 0.2s ease-in-out;
  }
`;

export const AccordionContainer = styled.div`
  transition: height 0.2s ease-in-out;
  overflow: hidden;
`;

export const AccordionContent = styled.div`
  border-top: 1px solid #cccccc;
  padding: 15px 20px;
`;

// .accordion-item {
//   border: 1px solid #ccc;
// }

// se debe esta clase
// .accordion-item:not(:first-of-type) {
//   border-top: 0;
// }

// .accordion-item-title {
//   width: 100%;
//   margin: 0;
// }

// .accordion-item-btn {
//   display: flex;
//   align-items: center;
//   width: 100%;
//   background-color: #fff;
//   border: 0;
//   padding: 15px 20px;
//   font-size: 18px;
//   font-weight: 400;
//   cursor: pointer;
// }

// .accordion-item-btn::after {
//   content: '';
//   flex-shrink: 0;
//   width: 18px;
//   height: 18px;
//   margin-left: auto;
//   background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
//   background-repeat: no-repeat;
//   background-size: 100%;
//   transition: transform 0.2s ease-in-out;
// }

// .accordion-item.active .accordion-item-btn::after {
//   transform: rotate(-180deg);
// }

// .accordion-item-container {
//   transition: height 0.2s ease-in-out;
//   overflow: hidden;
// }

// .accordion-item-content {
//   border-top: 1px solid #cccccc;
//   padding: 15px 20px;
// }
