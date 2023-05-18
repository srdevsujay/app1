import React, { useEffect, useState } from "react";
import { TitleHelvetica } from "../../../../styled-components/Title/index";
import { Select } from "../../../../styled-components/select/index";
import _ from "lodash";
import { ContainerBilling } from "../../styled-components/Plataform/index";
import { Bar } from "../../../Dashboard/styled-components/dashboardStyled";
import { ButtonsProfile } from "../../../../styled-components/button/index";
import { FormatNumber } from "../../../../utilities/FormatNumber";
import { FormatNumberSum } from "../../../../utilities/FormatNumberSum";
import "../../styled-components/style.css";
import { useAppSelector } from "../../../../hooks/appDispatch";

const SelectSubscriptionsPlans = ({
  selectedPayment,
  handlePlanProduct,
  setIdSubscription,
  setIdSubscriptionPlan,
}: any) => {
  const { subscriptionsPlans } = useAppSelector((state) => state.configuration);
  const { plans, subscriptions } = subscriptionsPlans;
  console.log("subscriptionsPlans", subscriptionsPlans);

  const [dataPlans, setDataPlans] = useState([]);
  const [dataSubscriptions, setDataSubscriptions] = useState([]);
  console.log("dataPlans", dataPlans);

  useEffect(() => {
    if (!plans) return;
    const plansAddSelect: any = [].concat(plans);
    plansAddSelect.push({ id: 10, name: "Seleccione", percentage: 0 });
    const currentPlans: any = _.orderBy(plansAddSelect, "id", "asc");
    console.log("currentPlans", currentPlans);

    const subsAddSelect: any = [].concat(subscriptions);
    subsAddSelect.push({
      id: 0,
      income: "Selecciona",
      name: "Roalytics 1",
      price: 0,
    });
    const currentSubs: any = _.orderBy(subsAddSelect, "id", "asc");

    setDataPlans(currentPlans);
    setDataSubscriptions(currentSubs);
  }, [plans]);

  const [selectedPlan, setSelectedPlan] = useState("0");
  const [selectedSubs, setSelectedSubs] = useState("0");
  const [currentPlan, setCurrentPlan] = useState({});
  const [currentSub, setCurrentSub] = useState({});
  const [totalSub, setTotalSub] = useState(0);

  const { percentage, id: idPlan, name }: any = currentPlan;
  const { income, price, id: idSub }: any = currentSub;

  const handlePlan = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const valuePlan = event.target.value;
    console.log("valuePlan", valuePlan);

    const dataPlan: any = dataPlans.filter(
      (data: any) => data.name === valuePlan
    );
    console.log("dataPlan", dataPlan);
    setSelectedPlan(valuePlan);
    setCurrentPlan(dataPlan[0]);
  };

  useEffect(() => {
    if (!currentPlan) return;
    const data = {
      id: idPlan,
      name,
    };
    setIdSubscriptionPlan(data);
  }, [currentPlan]);

  useEffect(() => {
    if (!currentSub) return;
    const data = {
      id: idSub,
      income,
    };
    setIdSubscription(data);
  }, [currentSub]);

  const handleSubs = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const valueSub = event.target.value;
    const dataSub = dataSubscriptions.filter(
      (data: any) => data.income === parseInt(valueSub)
    );
    setSelectedSubs(valueSub);
    setCurrentSub(dataSub[0]);
  };

  useEffect(() => {
    if (selectedPlan === "0" || selectedSubs === "0") return;
    // handlePlanProduct(`${selectedSubs}${selectedPlan}`);
    const total = price - (percentage / 100) * price;
    setTotalSub(total);
  }, [selectedPlan, selectedSubs]);

  const handleNextStep = () => {
    if (selectedPlan === "0" || selectedSubs === "0") return;
    handlePlanProduct(`${selectedSubs}${selectedPlan}`);
  };

  return (
    <div
      className={`${
        selectedPayment === "0"
          ? "container mb-3 mt-4 d-block"
          : "container mb-3 mt-4 d-none"
      }`}
    >
      <div className="row d-flex">
        <div className="col-sm-6">
          <div className="row col-sm-12">
            <TitleHelvetica fontSize="16px" className="mt-4 w-100">
              Seleccionar meta en ventas mensuales
            </TitleHelvetica>
            <Select
              value={selectedSubs}
              onChange={handleSubs}
              className="container w-100 d-flex justify-content-center"
            >
              {dataSubscriptions?.map((data: any) => (
                <option key={data?.id} value={data?.income}>
                  {data?.income === "Selecciona" ? (
                    "Seleccione"
                  ) : (
                    <FormatNumber number={data?.income} />
                  )}
                </option>
              ))}
            </Select>
          </div>
          <div className="row col-sm-12">
            <TitleHelvetica fontSize="16px" className="mt-4 w-100">
              Seleccionar plan de permanencia
            </TitleHelvetica>
            <Select
              value={selectedPlan}
              onChange={handlePlan}
              disabled={selectedSubs === "0" ? true : false}
              className={
                selectedSubs === "0"
                  ? "cursor-noDrop container w-100 d-flex justify-content-center"
                  : "container w-100 d-flex justify-content-center"
              }
            >
              {dataPlans?.map(({ id, name, percentage }: any) => (
                <option key={id} value={name}>
                  {name === "Seleccione" ? (
                    "Seleccione"
                  ) : (
                    <FormatNumberSum
                      price={price}
                      percentage={percentage}
                      name={name}
                    />
                  )}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="col-sm-6 d-flex justify-content-end">
          <div className="row">
            <ContainerBilling className="container">
              <h3
                style={{
                  fontSize: "16px",
                  fontFamily: "Helvetica-NeueL-Title",
                  marginTop: "10px",
                }}
              >
                Suscripción
              </h3>
              <Bar style={{ width: "100%" }}></Bar>
              <div className="d-flex mt-5 justify-content-between">
                <div>
                  <span
                    className="d-flex"
                    style={{ fontFamily: "Helvetica-NeueL-Title" }}
                  >
                    Plan:{" "}
                    <p
                      style={{
                        color: "#8f8f8f",
                        fontFamily: "Helvetica-NeueL",
                        fontSize: "15px",
                        marginLeft: "11px",
                        marginBottom: "5px",
                      }}
                    >
                      {selectedPlan}
                    </p>
                  </span>
                  <span
                    className="d-flex"
                    style={{ fontFamily: "Helvetica-NeueL-Title" }}
                  >
                    Meta:{" "}
                    <p
                      style={{
                        color: "#8f8f8f",
                        fontFamily: "Helvetica-NeueL",
                        fontSize: "15px",
                        marginLeft: "5px",
                      }}
                    >
                      {selectedSubs}
                    </p>
                  </span>
                </div>
                <div className="d-flex">
                  <h1
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      flexDirection: "column",
                      fontSize: "15px",
                      fontFamily: "Helvetica-NeueL-Title",
                      marginBottom: "15px",
                    }}
                  >
                    {totalSub.toFixed(2)} US$ / mes
                  </h1>
                </div>
              </div>
            </ContainerBilling>
          </div>
        </div>
      </div>
      <div className="row mt-3 justify-content-end">
        <div className="form-group col-sm-3 pr-0">
          <ButtonsProfile className="btn w-100" onClick={handleNextStep}>
            Siguiente Paso
          </ButtonsProfile>
        </div>
      </div>
    </div>
  );
};

export default SelectSubscriptionsPlans;