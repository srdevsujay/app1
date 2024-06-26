import {
  getDataProduct,
  createProductService,
  editProductService,
  deleteProductService,
  handleRGPDService,
} from "../../../../pages/Tracking/services/index";
import { AppThunk } from "../../../store";
import {
  setAttribution,
  setCurrentAttribution,
  setProduct,
  setRule,
  setTag,
  starLoading,
} from "./trackingSlice";
import _ from "lodash";
import Swal from "sweetalert2";
import { deleteRuleURLService } from "../../../../pages/Tracking/services/index";
import { signOut } from "../../../../utilities/localstorage.utility";
import {
  createRuleURLService,
  editRuleURLService,
} from "../../../../pages/Tracking/services/index";
import {
  createAttributionService,
  getDataRuleURL,
} from "../../../../pages/Tracking/services/index";
import {
  getDataTag,
  getDataAttribution,
} from "../../../../pages/Tracking/services/index";
import { logoutUser, setUserUpload } from "../login/authSlice";
import { getUser } from "../../../../pages/Configuration/services/index";

export const obtainApiProduct = (): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading);
    try {
      const result = await getDataProduct();
      if (
        result.data.message === "Token is invalid!" ||
        result.data.error === "Signature has expired"
      ) {
        signOut();
        dispatch(logoutUser());
      }
      const currentDataProduct: any = _.orderBy(result.data, "id", "desc");
      dispatch(setProduct(currentDataProduct));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createProduct = (data: any, themeState: boolean): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading);
    try {
      const result = await createProductService(data);
      if (result.data.message === "Create product successfully!") {
        dispatch(obtainApiProduct());
        Swal.fire({
          background: themeState === true ? "#0D0D0D" : "#fff",
          title: "Producto Creado correctamente!!",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const editProduct = (data: any, themeState: boolean): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading);
    try {
      const result = await editProductService(data);
      if (result.data.message === "Edit product successfully!") {
        dispatch(obtainApiProduct());
        Swal.fire({
          background: themeState === true ? "#0D0D0D" : "#fff",
          title: "Producto Editado correctamente!!",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteProducto = (id: number, themeState: boolean): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading);
    try {
      Swal.fire({
        title: "¿Estas seguro?",
        text: "Esta seguro que quiere borrar el Producto.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#109cf1",
        cancelButtonColor: "#E71D36",
        confirmButtonText: "Sí, Borrar!",
        background: themeState === true ? "#0D0D0D" : "#fff",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const objId = {
              id,
            };
            const resultData = await deleteProductService(objId);
            if (resultData.data.message === "Delete product successfully!") {
              dispatch(obtainApiProduct());
              Swal.fire({
                background: themeState === true ? "#0D0D0D" : "#fff",
                title: "El Producto se ha eliminado correctamente.",
                icon: "success",
              });
            }
          } catch (error) {}
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const obtainApiTag = (): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading);
    try {
      const result = await getDataTag();
      if (
        result.data.message === "Token is invalid!" ||
        result.data.error === "Signature has expired"
      ) {
        signOut();
        dispatch(logoutUser());
      }
      const currentDataTag: any = _.orderBy(result.data.data, "id", "desc");
      dispatch(setTag(currentDataTag));
    } catch (error) {
      console.log(error);
    }
  };
};

export const obtainApiAttribution = (): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading);
    try {
      const result = await getDataAttribution();
      if (
        result.data.message === "Token is invalid!" ||
        result.data.error === "Signature has expired"
      ) {
        signOut();
        dispatch(logoutUser());
      }
      const DataAttribution: any = _.orderBy(result.data.data, "id", "asc");
      dispatch(setAttribution(DataAttribution));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createAttribution = (data: any, themeState: boolean): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading);
    try {
      const result = await createAttributionService(data);
      if (
        result.data.message === "Update rule attribution user successfully!"
      ) {
        dispatch(setCurrentAttribution([result.data.data]));
        Swal.fire({
          background: themeState === true ? "#0D0D0D" : "#fff",
          title: "Regla de Atribución creada correctamente!!",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const obtainApiRuleURL = (): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading);
    try {
      const result = await getDataRuleURL();
      if (
        result.data.message === "Token is invalid!" ||
        result.data.error === "Signature has expired"
      ) {
        signOut();
        dispatch(logoutUser());
      }
      const currentDataRule: any = _.orderBy(result.data, "created_on", "desc");
      dispatch(setRule(currentDataRule));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createRuleURL = (data: any, themeState: boolean): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading);
    try {
      const result = await createRuleURLService(data);
      if (result.data.message === "Create rule successfully!") {
        dispatch(obtainApiRuleURL());
        Swal.fire({
          background: themeState === true ? "#0D0D0D" : "#fff",
          title: "Regla Creado correctamente!!",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const editRuleURL = (data: any, themeState: boolean): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading);
    try {
      const result = await editRuleURLService(data);
      if (result.data.message === "Create rule successfully!") {
        dispatch(obtainApiRuleURL());
        Swal.fire({
          background: themeState === true ? "#0D0D0D" : "#fff",
          title: "Regla Editada correctamente!!",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteRuleURL = (id: number, themeState: boolean): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading);
    try {
      Swal.fire({
        title: "¿Estas seguro?",
        text: "Esta seguro que quiere borrar la Regla de URL.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#109cf1",
        cancelButtonColor: "#E71D36",
        confirmButtonText: "Sí, Borrar!",
        background: themeState === true ? "#0D0D0D" : "#fff",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const objId = {
              id,
            };
            const resultData = await deleteRuleURLService(objId);
            if (resultData.data.message === "Delete rule successfully!") {
              dispatch(obtainApiRuleURL());
              Swal.fire({
                background: themeState === true ? "#0D0D0D" : "#fff",
                title: "La regla se ha eliminado correctamente.",
                icon: "success",
              });
            }
          } catch (error) {}
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const handleRGPD = (data: any): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading);
    try {
      console.log("dataRGPD", data);

      const dataRGPD = {
        rgpd: data,
      };
      const result = await handleRGPDService(dataRGPD);
      console.log("resultRGPD", result);
      dispatch(setUserUpload(result.data.data));
      // if (result.data.message === "Create rule successfully!") {
      //   dispatch(obtainApiRuleURL());
      //   Swal.fire("Correcto", "Regla Editada correctamente!!", "success");
      // }
    } catch (error) {
      console.log(error);
    }
  };
};

export const onObtainUser = (id: number): AppThunk => {
  return async (dispatch) => {
    try {
      const result = await getUser(id);
      console.log("resultThunk", result);
    } catch (error) {}
  };
};
