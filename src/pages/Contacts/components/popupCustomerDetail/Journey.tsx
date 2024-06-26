import React, { useContext } from "react";
import venta from "../../../../assets/images/venta.svg";
import clickIcon from "../../../../assets/images/click.svg";
import telephone from "../../../../assets/images/telephone.svg";
import ojo from "../../../../assets/images/ojo.png";
import _ from "lodash";
import { formattTimeZone } from "../../../../utilities/FormattTimeZone";
import { FormatNumber } from "../../../../utilities/FormatNumber";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useAppSelector } from "../../../../hooks/appDispatch";
import {
  Recorrido,
  Accordion,
  TagSub,
} from "../../styled-components/customerDetail.Styled";
import { Tooltip } from "@mui/material";
import { ThemeContext } from "../../../../utilities/theme/ThemeContext";
import { BeatLoader } from "react-spinners";
import moment from "moment";

const Journey = ({ currentJourney, time_Zone }: any) => {
  const themeLocalStorage: any = localStorage.getItem("Theme");
  const themeState = JSON.parse(themeLocalStorage);
  const { theme } = useContext(ThemeContext);

  console.log("currentJourney--", currentJourney);

  return (
    <div className="table-responsive ocultarMostrar">
      {currentJourney === undefined ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "250px", zIndex: "99999999" }}
        >
          <BeatLoader color="#3997FF" />
        </div>
      ) : (
        <Accordion theme={theme}>
          {_.orderBy(
            currentJourney,
            ["date", "time", "tag"],
            ["desc", "desc", "asc"]
          )?.map((journey, index) => {
            const dateJourney = moment(
              journey?.date,
              "ddd, DD MMM YYYY HH:mm:ss [GMT]"
            );
            return (
              <Recorrido className="recorrido" key={index}>
                <span className="separator-route"></span>
                {/* <div className="img-recorrido"> */}
                <div
                  className={
                    journey.tag !== ""
                      ? journey.tag.substr(0, 1) === "@"
                        ? "back-source-tag-recorrido img-recorrido"
                        : journey.tag.substr(0, 1) === "!"
                        ? "back-action-tag-recorrido img-recorrido"
                        : journey.tag.substr(0, 1) === "#"
                        ? "back-telephone-tag-recorrido img-recorrido"
                        : "back-sale-tag-recorrido img-recorrido img-recorrido"
                      : journey.event_name === "Click on Pop Up" ||
                        journey.event_name === "Click on Video" ||
                        journey.event_name === "Click on Purchase" ||
                        journey.event_name === "Click on Reservation"
                      ? "back-source-tag-recorrido img-recorrido"
                      : journey.event_name === "Manual Sale"
                      ? "back-sale-tag-recorrido img-recorrido"
                      : journey.event_name === "Click on schedule"
                      ? "back-telephone-tag-recorrido img-recorrido"
                      : journey.event_name === "Page View" ||
                        journey.event_name === "Page Checkout"
                      ? "back-view-tag-recorrido img-recorrido"
                      : ""
                  }
                >
                  {
                    journey.tag !== "" ? (
                      journey.tag.substr(0, 1) === "@" ? (
                        <img src={clickIcon} alt="" className="venta" />
                      ) : journey.tag.substr(0, 1) === "!" ? (
                        <CheckCircleOutlinedIcon
                          style={{
                            color: "#F08303",
                            fontSize: "17px",
                            marginTop: "2px",
                            marginRight: "4px",
                          }}
                        />
                      ) : journey.tag.substr(0, 1) === "#" ? (
                        <img src={telephone} alt="" className="venta" />
                      ) : (
                        <img src={venta} alt="" className="venta" />
                      )
                    ) : journey.event_name === "Click on Pop Up" ||
                      journey.event_name === "Click on Video" ||
                      journey.event_name === "Click on Purchase" ||
                      journey.event_name === "Click on Reservation" ? (
                      <img src={clickIcon} alt="" className="venta" />
                    ) : // <img src={ clickIcon } alt="" className='clickIcon'/>
                    // journey?.tag.substring(1,0) === "$"
                    journey.event_name === "Manual Sale" ? (
                      <img src={venta} alt="" className="venta" />
                    ) : journey.event_name === "Click on schedule" ? (
                      <img src={telephone} alt="" className="venta" />
                    ) : journey.event_name === "Page View" ||
                      journey.event_name === "Page Checkout" ? (
                      <img src={ojo} alt="" className="venta" />
                    ) : (
                      ""
                    )

                    // <CheckCircleOutlinedIcon style={{color: "#F08303"}} />
                  }
                </div>
                <div
                  className={
                    // journey?.tag.substring(1,0) === "@" ? "back-source" : journey?.tag.substring(1,0) === "$" ? "back-sale" : "back-action"} key={`${index}`
                    journey.tag !== ""
                      ? journey.tag.substr(0, 1) === "@"
                        ? themeState === true || themeState === "true"
                          ? "back-source back-dark-source"
                          : "back-source overflow-scroll"
                        : journey.tag.substr(0, 1) === "!"
                        ? themeState === true || themeState === "true"
                          ? "back-action back-dark-action"
                          : "back-action overflow-scroll"
                        : journey.tag.substr(0, 1) === "#"
                        ? themeState === true || themeState === "true"
                          ? "back-telephone back-dark-telephone"
                          : "back-telephone overflow-scroll"
                        : themeState === true || themeState === "true"
                        ? "back-sale back-dark-sale"
                        : "back-sale overflow-scroll"
                      : journey.event_name === "Click on Pop Up" ||
                        journey.event_name === "Click on Video" ||
                        journey.event_name === "Click on Purchase" ||
                        journey.event_name === "Click on Reservation"
                      ? themeState === true || themeState === "true"
                        ? "back-source back-dark-source"
                        : "back-source overflow-scroll"
                      : journey.event_name === "Manual Sale"
                      ? themeState === true || themeState === "true"
                        ? "back-sale back-dark-sale"
                        : "back-sale overflow-scroll"
                      : journey.event_name === "Click on schedule"
                      ? themeState === true || themeState === "true"
                        ? "back-telephone back-dark-telephone"
                        : "back-telephone overflow-scroll"
                      : journey.event_name === "Page View" ||
                        journey.event_name === "Page Checkout"
                      ? themeState === true || themeState === "true"
                        ? "back-view back-dark-view"
                        : "back-view overflow-scroll"
                      : ""
                  }
                >
                  <div className="d-flex align-items-center content-recorrido">
                    <span>{dateJourney.format("DD-MMM-YYYY hh:mm A")}</span>
                    <span>|</span>
                    {/* <span>{journey.ts}</span> */}
                    <span className="event_name">
                      {journey.tag !== ""
                        ? journey.tag.substr(0, 1) === "@"
                          ? "Click en"
                          : journey.tag.substr(0, 1) === "!"
                          ? "Objetivo de"
                          : journey.tag.substr(0, 1) === "#"
                          ? "Agendó"
                          : "Compra de"
                        : journey.event_name === "Click on Pop Up"
                        ? "Click en"
                        : journey.event_name === "Click on Video"
                        ? "Click en"
                        : journey.event_name === "Click on Purchase"
                        ? "Click en"
                        : journey.event_name === "Click on Reservation"
                        ? "Click en"
                        : journey.event_name === "Manual Sale"
                        ? "Compra de"
                        : journey.event_name === "Click on schedule"
                        ? "Agendó"
                        : journey.event_name === "Page View"
                        ? "Visita"
                        : journey.event_name === "Page Checkout"
                        ? "Pago"
                        : ""}
                    </span>
                    {journey.event_name === "Manual Sale" ||
                    journey.tag.substr(0, 1) === "$" ? (
                      <p style={{ marginBottom: "0" }}>
                        <span style={{ marginLeft: "5px" }}>
                          {journey.product}
                        </span>
                        <span>
                          <FormatNumber number={journey?.price} />
                        </span>
                      </p>
                    ) : journey.event_name === "Click on schedule" ||
                      journey.tag.substr(0, 1) === "#" ? (
                      // <span class="hovertext" data-hover={journey.url}>
                      //   {journey.tag.substr(1)}
                      // </span>
                      <span>{journey.tag.substr(1)}</span>
                    ) : journey.event_name === "Click on schedule" ||
                      journey.tag.substr(0, 1) === "@" ? (
                      // <span class="hovertext" data-hover={journey.url}>
                      //   {journey.tag.substr(1)}
                      // </span>
                      <span>{journey.tag.substr(1)}</span>
                    ) : journey.event_name === "Click on schedule" ||
                      journey.tag.substr(0, 1) === "!" ? (
                      // <span class="hovertext" data-hover={journey.url}>
                      //   {journey.tag.substr(1)}
                      // </span>
                      <span>{journey.tag.substr(1)}</span>
                    ) : (
                      <span>{journey.url.substr(8)}</span>
                    )}
                  </div>
                  <div className="tag-recorrido">
                    {journey.tag.length === 0 ? (
                      ""
                    ) : (
                      <div
                        className={
                          // journey?.tag.substring(1,0) === "@" ? "back-source_detail_user" : journey?.tag.substring(1,0) === "$" ? "back-sale_detail_user" : "back-action_detail_user"
                          journey.tag !== ""
                            ? journey.tag.substr(0, 1) === "@"
                              ? "back-source_detail_user"
                              : journey.tag.substr(0, 1) === "!"
                              ? "back-action_detail_user"
                              : journey.tag.substr(0, 1) === "#"
                              ? "back_telephone_detail_user"
                              : "back-sale_detail_user"
                            : journey.event_name === "Click on Pop Up" ||
                              journey.event_name === "Click on Video" ||
                              journey.event_name === "Click on Purchase" ||
                              journey.event_name === "Click on Reservation"
                            ? "back-source_detail_user"
                            : journey.event_name === "Manual Sale"
                            ? "back-sale_detail_user"
                            : journey.event_name === "Click on schedule"
                            ? "back_telephone_detail_user"
                            : journey.event_name === "Page View" ||
                              journey.event_name === "Page Checkout"
                            ? "back_view_detail_user"
                            : ""
                        }
                      >
                        {journey.tag !== "" ? (
                          journey.tag.substr(0, 1) === "@" ? (
                            <img src={clickIcon} alt="" className="venta" />
                          ) : journey.tag.substr(0, 1) === "!" ? (
                            <CheckCircleOutlinedIcon
                              style={{
                                color: "#F08303",
                                fontSize: "17px",
                                marginTop: "2px",
                                marginRight: "4px",
                              }}
                            />
                          ) : journey.tag.substr(0, 1) === "#" ? (
                            <img src={telephone} alt="" className="venta" />
                          ) : (
                            <img src={venta} alt="" className="venta" />
                          )
                        ) : journey.event_name === "Click on Pop Up" ||
                          journey.event_name === "Click on Video" ||
                          journey.event_name === "Click on Purchase" ||
                          journey.event_name === "Click on Reservation" ? (
                          <img src={clickIcon} alt="" className="venta" />
                        ) : // <img src={ clickIcon } alt="" className='clickIcon'/>
                        // journey?.tag.substring(1,0) === "$"
                        journey.event_name === "Manual Sale" ? (
                          <img src={venta} alt="" className="venta" />
                        ) : journey.event_name === "Click on schedule" ? (
                          <img src={telephone} alt="" className="venta" />
                        ) : journey.event_name === "Page View" ||
                          journey.event_name === "Page Checkout" ? (
                          <img src={ojo} alt="" className="venta" />
                        ) : (
                          ""
                        )}
                        <TagSub theme={theme}>{journey?.tag.substr(1)}</TagSub>
                      </div>
                    )}
                    {journey.adset_name === null ? (
                      ""
                    ) : journey.adset_name !== "" ? (
                      <div
                        className={
                          // journey?.tag.substring(1,0) === "@" ? "back-source_detail_user" : journey?.tag.substring(1,0) === "$" ? "back-sale_detail_user" : "back-action_detail_user"
                          journey.tag !== ""
                            ? journey.tag.substr(0, 1) === "@"
                              ? "back-source_detail_user ml-2"
                              : journey.tag.substr(0, 1) === "!"
                              ? "back-action_detail_user ml-2"
                              : journey.tag.substr(0, 1) === "#"
                              ? "back_telephone_detail_user ml-2"
                              : "back-sale_detail_user ml-2"
                            : journey.event_name === "Click on Pop Up" ||
                              journey.event_name === "Click on Video" ||
                              journey.event_name === "Click on Purchase" ||
                              journey.event_name === "Click on Reservation"
                            ? "back-source_detail_user ml-2"
                            : journey.event_name === "Manual Sale"
                            ? "back-sale_detail_user ml-2"
                            : journey.event_name === "Click on schedule"
                            ? "back_telephone_detail_user ml-2"
                            : journey.event_name === "Page View" ||
                              journey.event_name === "Page Checkout"
                            ? "back_view_detail_user ml-2"
                            : ""
                        }
                      >
                        <Tooltip
                          title={
                            <>
                              <span>{`CA: ${journey.adset_name}`}</span>
                            </>
                          }
                          placement="top"
                        >
                          <TagSub theme={theme}>{journey?.ad_name}</TagSub>
                        </Tooltip>
                      </div>
                    ) : journey.ct === "" ? (
                      ""
                    ) : (
                      <div
                        className={
                          // journey?.tag.substring(1,0) === "@" ? "back-source_detail_user" : journey?.tag.substring(1,0) === "$" ? "back-sale_detail_user" : "back-action_detail_user"
                          journey.tag !== ""
                            ? journey.tag.substr(0, 1) === "@"
                              ? "back-source_detail_user ml-2"
                              : journey.tag.substr(0, 1) === "!"
                              ? "back-action_detail_user ml-2"
                              : journey.tag.substr(0, 1) === "#"
                              ? "back_telephone_detail_user ml-2"
                              : "back-sale_detail_user ml-2"
                            : journey.event_name === "Click on Pop Up" ||
                              journey.event_name === "Click on Video" ||
                              journey.event_name === "Click on Purchase" ||
                              journey.event_name === "Click on Reservation"
                            ? "back-source_detail_user"
                            : journey.event_name === "Manual Sale"
                            ? "back-sale_detail_user"
                            : journey.event_name === "Click on schedule"
                            ? "back_telephone_detail_user"
                            : journey.event_name === "Page View" ||
                              journey.event_name === "Page Checkout"
                            ? "back_view_detail_user "
                            : ""
                        }
                      >
                        <TagSub theme={theme}>{journey?.ct}</TagSub>
                      </div>
                    )}
                  </div>
                </div>
              </Recorrido>
            );
          })}
        </Accordion>
      )}
    </div>
  );
};

export default Journey;
