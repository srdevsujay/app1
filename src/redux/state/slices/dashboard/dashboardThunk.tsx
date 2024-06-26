import {
  setPNL,
  starLoading,
  setDataTracking,
  setDataFunnel,
  setTokenFacebook,
  setTokenGoogle,
  setToggleSlider,
  setDataFilter,
  setPermissionFacebook,
  setTokenFacebookFunnel,
  setTokenGoogleToken,
  setPermissionFacebookFunnel,
} from "./dashboardSlice";
import moment from "moment";
import { DateFormat } from "@/models/dateFormat.model";
import {
  getCurrentUser,
  signOut,
} from "../../../../utilities/localstorage.utility";
import {
  getDataPnl,
  getDataFunnel,
  getDashboardFunnel,
  createFilterFunnelService,
} from "../../../../pages/Dashboard/services/pnlApi";
import _ from "lodash";
import { addDays, setDate } from "date-fns";
import { AppThunk } from "@/redux/store";
import { Pnl } from "../../../../pages/Dashboard/models/dashboard.model";
import {
  createFunnelService,
  editFunnelService,
} from "../../../../pages/Dashboard/services/pnlApi";
import Swal from "sweetalert2";
import { deleteFunnelService } from "../../../../pages/Dashboard/services/pnlApi";
import { logoutUser } from "../login/authSlice";

export const getMetricFunnel = (
  date?: DateFormat,
  themeState?: boolean
): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading());
    try {
      const dateFormat = getDate(date);
      const resultAction = await getDataPnl(!date ? dateFormat : date);
      console.log("resultActionDashboard", resultAction);
      if (
        resultAction.data.message === "Token is invalid!" ||
        resultAction.data.error === "Signature has expired"
      ) {
        console.log("Se logea");
        signOut();
        dispatch(logoutUser());
      }
      const currentDataPNL: any = _.orderBy(
        resultAction.data.data,
        "id",
        "asc"
      );
      if (resultAction.status === 200) {
        dispatch(setPNL(currentDataPNL));
        dispatch(setTokenFacebook(resultAction.data.tokenfacebook));
        dispatch(setTokenGoogle(resultAction.data.tokengoogle));
        dispatch(setTokenGoogle(resultAction.data.tokengoogle));
        dispatch(setPermissionFacebook(resultAction.data.permissionfacebook));
      }
    } catch (error: any) {
      if (error.code === "ERR_BAD_RESPONSE") {
        Swal.fire({
          background: themeState === true ? "#0D0D0D" : "#fff",
          title:
            "En este momento no puede mostrarte este filtro con tantos días, vuelve a intentarlo con menos días.",
          icon: "info",
        });
      }
      console.log(error);
    }
  };
};

const getDate = (date?: DateFormat) => {
  const dayInitial = new Date();
  const xDayInitial = 6;
  dayInitial.setDate(dayInitial.getDate() - xDayInitial);
  const dayFinal = new Date();
  const xDayFinal = 0;
  dayFinal.setDate(dayFinal.getDate() - xDayFinal);
  let firstDay = moment(dayInitial).format("YYYY-MM-DD");
  let lastDay = moment(dayFinal).format("YYYY-MM-DD");
  const dateFormat: DateFormat = {
    fecha_inicial: firstDay,
    fecha_final: lastDay,
  };
  return dateFormat;
};

export const getTrackingFunnel = (idUser: number): AppThunk => {
  return async (dispatch) => {
    try {
      const resultAction = await getDataFunnel(idUser);
      const currentDataTracking: any = _.orderBy(
        resultAction.data,
        "id",
        "asc"
      );

      const titleDateFunnel = funnelFilterDate();
      console.log("titleDateFunnel", titleDateFunnel);

      const dataTraking = currentDataTracking.map((data: any) => {
        data.titleDateFunnel = titleDateFunnel;
        return data;
      });
      dispatch(setDataTracking(dataTraking));
    } catch (error) {
      console.log(error);
    }
  };
};

const funnelFilterDate = () => {
  const date = [
    {
      startDate: addDays(new Date(), -6),
      endDate: new Date(),
      key: "selection",
    },
  ];
  const titleDateFunnel = `${moment(date[0].startDate).format(
    "YYYY-MM-DD"
  )} - ${moment(date[0].endDate).format("YYYY-MM-DD")}`;

  return titleDateFunnel;
};

export const obtainApiDashboardFunnel = (
  id: number,
  typeDashboard: any,
  i: number,
  date?: DateFormat
): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(starLoading());
    try {
      let type_dashboard = typeDashboard[i]?.type_dashboard;
      let dateFormat = getDate(date);
      let objFacebook = {
        fecha_inicial: date ? date?.fecha_inicial : dateFormat.fecha_inicial,
        fecha_final: date ? date?.fecha_final : dateFormat.fecha_final,
        funnel_id: id,
        type_dashboard,
      };
      console.log("type_dashboard", type_dashboard);
      console.log("objFacebook", objFacebook);
      const resultAction: any = await getDashboardFunnel(objFacebook);
      if (
        resultAction.data.message === "Token is invalid!" ||
        resultAction.data.error === "Signature has expired"
      ) {
        console.log("Se logea Funnel");
        signOut();
        dispatch(logoutUser());
      }
      const currentDataFunnel: any = _.orderBy(
        resultAction.data.data,
        "date_start",
        "desc"
      );

      const updatedDashboardData = typeDashboard.map(
        (item: any, index: any) => {
          if (index === i) {
            return {
              ...item,
              titleDateFunnel: `${objFacebook.fecha_inicial} - ${objFacebook.fecha_final}`,
            };
          }
          return item;
        }
      );
      console.log("updatedDashboardData--", updatedDashboardData);

      dispatch(setDataTracking(updatedDashboardData));
      dispatch(setDataFunnel(currentDataFunnel));
      dispatch(setDataFilter(resultAction.data.filters));
      dispatch(
        setPermissionFacebookFunnel(resultAction.data.permissionfacebook)
      );
      dispatch(setTokenFacebookFunnel(resultAction.data.tokenfacebook));
      dispatch(setTokenGoogleToken(resultAction.data.tokengoogle));
    } catch (error) {
      console.log(error);
    }
  };
};

export const obtainApiFunnel = (
  id: number,
  typeDashboard: any,
  date?: DateFormat,
  themeState?: boolean
): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(starLoading());
    try {
      console.log("typeDashboardFunnel", typeDashboard);

      let type_dashboard = typeDashboard?.type_dashboard;
      if (type_dashboard === null) {
        Swal.fire({
          background: themeState === true ? "#0D0D0D" : "#fff",
          title: "En este momento no tienes un tipo de Funnel registrado.",
          icon: "info",
        });
        return;
      }
      let dateFormat = getDate(date);
      let objFacebook = {
        fecha_inicial: date ? date?.fecha_inicial : dateFormat.fecha_inicial,
        fecha_final: date ? date?.fecha_final : dateFormat.fecha_final,
        funnel_id: id,
        type_dashboard,
      };
      console.log("type_dashboard", type_dashboard);
      console.log("objFacebook", objFacebook);
      const resultAction: any = await getDashboardFunnel(objFacebook);
      console.log("resultAction---", resultAction);
      // const currentDataFunnel: any = _.orderBy(
      //   resultAction.data,
      //   "id",
      //   "asc"
      // );
      if (
        resultAction.data.message === "Token is invalid!" ||
        resultAction.data.error === "Signature has expired"
      ) {
        console.log("Se logea Funnel");
        signOut();
        dispatch(logoutUser());
      }
      dispatch(setDataFunnel(resultAction.data.data));
      dispatch(setDataFilter(resultAction.data.filters));
      dispatch(setTokenFacebookFunnel(resultAction.data.tokenfacebook));
      dispatch(setTokenGoogleToken(resultAction.data.tokengoogle));
      dispatch(
        setPermissionFacebookFunnel(resultAction.data.permissionfacebook)
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const createFilterFunnel = (
  data: any,
  id: number,
  typeDashboard: any,
  i: number
): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading);
    try {
      console.log("dataFilter", data);

      const result: any = await createFilterFunnelService(data);
      console.log("dataFilterResult", result);
      dispatch(setDataFilter(result.data.data.filter_json));
      // if (
      //   result.data.message === "Update filter dashboard user successfully!"
      // ) {
      //   dispatch(obtainApiDashboardFunnel(id, typeDashboard, i));
      //   // Swal.fire("Correcto", "Lead Creado correctamente!!", "success");
      // }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createFunnel = (
  data: any,
  id: number,
  themeState: boolean
): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading);
    try {
      const result: any = await createFunnelService(data);
      if (result.data.message === "Create funnel successfully!") {
        dispatch(getTrackingFunnel(id));
        Swal.fire({
          background: themeState === true ? "#0D0D0D" : "#fff",
          title: "Funnel Creado correctamente!!",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const editFunnel = (
  data: any,
  id: number,
  themeState: boolean
): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading);
    try {
      const result: any = await editFunnelService(data);
      console.log("resultEdit", result);
      if (result.data.message === "Update funnel successfully!") {
        dispatch(getTrackingFunnel(id));
        Swal.fire({
          background: themeState === true ? "#0D0D0D" : "#fff",
          title: "Funnel actualizado correctamente!!",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteFunnel = (
  data: any,
  id: number,
  themeState: boolean
): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading);
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción va a eliminar toda la información de tracking relacionada con este funnel. Tenga en cuenta que esta acción es permanente y no se podrá deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#109cf1",
        cancelButtonColor: "#E71D36",
        confirmButtonText: "Sí, ¡Borrar!",
      });

      if (result.isConfirmed) {
        try {
          const deleteResult: any = await deleteFunnelService(data);
          console.log("resultEdit", deleteResult);
          if (deleteResult.data.message === "Delete funnel successfully!") {
            // dispatch(downloadTypeform(false));
            dispatch(getTrackingFunnel(id));
            Swal.fire({
              background: themeState === true ? "#0D0D0D" : "#fff",
              title: "El Funnel se ha eliminado correctamente.",
              icon: "success",
            });
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const toggleSlider = (data: any): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading);
    try {
      console.log("dataToggle", data);

      dispatch(setToggleSlider(data));
    } catch (error) {
      console.log(error);
    }
  };
};
