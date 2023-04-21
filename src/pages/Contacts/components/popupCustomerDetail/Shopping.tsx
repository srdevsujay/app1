import React from "react";
import _ from "lodash";
import venta from "../../../../assets/images/venta.svg";
import { useAppSelector } from "../../../../hooks/appDispatch";
import { formattTimeZone } from "../../../../utilities/FormattTimeZone";
import { FormatNumber } from "../../../../utilities/FormatNumber";
import {
  Recorrido,
  Accordion,
} from "../../styled-components/customerDetail.Styled";

const Shopping = ({ purchase, time_Zone }: any) => {
  const purch = [
    {
      date: "Thu, 26 Jan 2023 18:07:51 GMT",
      funnel_name: "Incubadora BlueHackers",
      price: 7000,
      product: "BLUEHACKERS.COM",
      refaund: null,
    },
    {
      date: "Thu, 26 Jan 2023 18:07:51 GMT",
      funnel_name: "Incubadora BlueHackers",
      price: 7000,
      product: "BLUEHACKERS.COM",
      refaund: null,
    },
  ];
  return (
    <Accordion>
      {_.orderBy(purch, "date", "desc")?.map((purchase, index) => (
        <Recorrido className="recorrido" key={index}>
          <span className="separator-route"></span>
          <div className="back-sale-tag-recorrido img-recorrido">
            <img src={venta} alt="" className="venta" />
          </div>
          <div className="back-sale">
            <div className="d-flex align-items-center content-recorrido">
              <span>{formattTimeZone(purchase?.date, time_Zone)}</span>
              <span>|</span>
              <span>{purchase.product}</span>
            </div>
            <div className="tag-recorrido">
              <div className="back-sale_detail_user">
                <span
                  style={{
                    color: "#000",
                    fontSize: "12px",
                    fontFamily: "Helvetica-NeueL-Title",
                  }}
                >
                  <FormatNumber number={purchase?.price} />
                </span>
              </div>
            </div>
          </div>
        </Recorrido>
      ))}
    </Accordion>
  );
};

export default Shopping;