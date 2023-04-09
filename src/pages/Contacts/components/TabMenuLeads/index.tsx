import { ToggleColumnsTable } from "../../../../components/toggleColumnsTable";

import Vector from "../../../../assets/images/Vector.png";
import { ButtonCreate } from "../../../../styled-components/button";
import InputComponent from "../../../../components/input/Input.component";
import { useEffect, useState } from "react";
import Modal from "../../../../components/modal/Modal.component";
import FormLead from "../FormLead/index";

const TabMenuLeads = ({
  nameTab,
  columns,
  setDataFunnelToggle,
  dataFunnelToggle,
  columnsToSet,
  updateData,
  setSearchString,
  currentEdit,
  setCurrentEdit,
  openModal,
}: any) => {
  return (
    <div className="content-buttons-main-tracking mt-4 mt-3 d-flex justify-content-end">
      <ButtonCreate className="btn" onClick={openModal}>
        {nameTab}
      </ButtonCreate>
      <ToggleColumnsTable
        columns={columns}
        setDataFunnelToggle={setDataFunnelToggle}
        dataFunnelToggle={dataFunnelToggle}
        columnsToSet={columnsToSet}
        updateData={updateData}
      />
      <div style={{ width: "25%" }}>
        <InputComponent
          // max={5}
          placeholder="Buscar..."
          label=""
          type="text"
          onChange={(e: any) => setSearchString(e)}
        />
      </div>
    </div>
  );
};

export default TabMenuLeads;