import React, { useEffect, useState, useCallback } from "react";
import { setAutoFreeze } from "immer";
// import "../../styled-components/style.css";
import "../../../Contacts/styled-components/style.css";

import { useDebounce } from "../../../../hooks/useDebounce";
import {
  obtainApiProduct,
  deleteProducto,
} from "../../../../redux/state/slices/tracking/trackingThunk";
import GeneralTable from "../../../../utilities/Table/index";
import TabMenuLeads from "../../../Contacts/components/TabMenuLeads/index";
import { useAppDispatch, useAppSelector } from "../../../../hooks/appDispatch";
import { ColumnsProduct } from "./ColumnsProduct";
import Modal from "../../../../components/modal/Modal.component";
import FormProducts from "../FormProduct";

setAutoFreeze(false);

const Products = () => {
  const dispatch = useAppDispatch();
  const { dataProduct } = useAppSelector((state) => state.tracking);
  const time_Zone = useAppSelector((state) => state.user.user.time_zone);
  const [nameTab, setNameTab] = useState("Añadir Productos");
  const [currentColumns, setCurrentColumns] = useState<any[]>([]);
  const [dataFunnelToggle, setDataFunnelToggle] = useState<any>([] || null);
  const [columnsToSet, setColumnsToSet] = useState<any>(currentColumns);
  const [originalData, setOriginalData] = useState<any>();
  const [filteredData, setFilteredData] = useState<any[]>();
  const [searchString, setSearchString] = useState("");
  const searchStringDebounced = useDebounce(searchString, 3000);

  useEffect(() => {
    dispatch(obtainApiProduct());
  }, []);

  const [currentEdit, setCurrentEdit] = useState();
  const [idEditCurrent, setIdEditCurrent] = useState(0);
  const [idDeleteCurrent, setIdDeleteCurrent] = useState(0);

  useEffect(() => {
    if (dataProduct.length > 0) {
      const columns = ColumnsProduct(
        dataProduct,
        time_Zone,
        setCurrentEdit,
        setIdEditCurrent
      );
      setCurrentColumns(columns as any);
      setOriginalData(dataProduct);
      setFilteredData(dataProduct);
    }
  }, [dataProduct]);

  useEffect(() => {
    if (idEditCurrent !== 0) {
      dispatch(deleteProducto(idEditCurrent));
      setIdEditCurrent(0);
    }
    console.log("idEditCurrent", idEditCurrent);
  }, [idEditCurrent]);

  const updateData = useCallback((newData: any) => {
    setColumnsToSet(newData);
  }, []);

  useEffect(() => {
    if (searchStringDebounced.trim()) {
      const currentData = originalData.filter((item: any) =>
        item.name.toLowerCase().includes(searchStringDebounced.toLowerCase())
      );
      setFilteredData(currentData);
    } else {
      setFilteredData(originalData);
    }
  }, [searchStringDebounced]);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const toggleModal = () => setModalOpen(!isModalOpen);
  useEffect(() => {
    if (currentEdit) {
      toggleModal();
    }
  }, [currentEdit]);

  useEffect(() => {
    if (!isModalOpen) {
      setCurrentEdit(null as any);
    }
  }, [isModalOpen]);

  const openModal = () => {
    if (!isModalOpen) {
      setModalOpen(true);
    }
  };

  return (
    <>
      <TabMenuLeads
        nameTab={nameTab}
        columns={currentColumns}
        setDataFunnelToggle={setDataFunnelToggle}
        dataFunnelToggle={dataFunnelToggle}
        columnsToSet={columnsToSet}
        updateData={updateData}
        setSearchString={setSearchString}
        currentEdit={currentEdit}
        setCurrentEdit={setCurrentEdit}
        idEditCurrent={idEditCurrent}
        setIdEditCurrent={setIdEditCurrent}
        openModal={openModal}
      />
      <Modal
        title={currentEdit !== null ? "Editar Producto" : "Crear Producto"}
        isOpen={isModalOpen}
        onClose={toggleModal}
        width="450px"
        padding="10px 32px"
        bottom="14px"
        height="480px"
        btnClose={1}
      >
        <FormProducts
          onClose={toggleModal}
          currentEdit={currentEdit}
          setCurrentEdit={setCurrentEdit}
        />
      </Modal>
      <GeneralTable
        data={filteredData}
        columns={columnsToSet}
        pageSizeOptions={[7, 15, 31, 31]}
        maxBodyHeight={"60vh"}
        pageSize={7}
      />
    </>
  );
};

export default Products;