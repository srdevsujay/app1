import { AppThunk } from "../../../store";
import {
  setBooking,
  setLeads,
  setProduct,
  setSale,
  setUser,
  starLoading,
} from "./contactsSlice";
import {
  createBookingService,
  createLeadService,
  deleteLeadService,
  editLeadService,
  getDataBooking,
  getDataLeads,
  editBookingService,
  deleteBookingService,
  editSaleService,
  createTrafficSourceService,
} from "../../../../pages/Contacts/services/index";
import _ from "lodash";
import Swal from "sweetalert2";
import { signOut } from "../../../../utilities/localstorage.utility";
import {
  createSaleService,
  deleteSaleService,
  editBookingStateService,
} from "../../../../pages/Contacts/services/index";
import {
  getDataSales,
  getUserProfile,
} from "../../../../pages/Contacts/services/index";
import { logoutUser } from "../login/authSlice";

export const obtainApiContacts = (page: number, pageSize: number): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading());
    try {
      const form = {
        page: page,
        per_page: pageSize,
      };
      let resultGetLeads = await getDataLeads(form);
      const currentDataLead: any = _.orderBy(
        resultGetLeads.data.data,
        "id",
        "desc"
      );
      let allData: any = currentDataLead;
      dispatch(
        setLeads({
          dataLead: allData,
          totalResults: resultGetLeads.data.total_results,
        })
      );
      if (
        resultGetLeads.data.message === "Token is invalid!" ||
        resultGetLeads.data.error === "Signature has expired"
      ) {
        signOut();
        dispatch(logoutUser());
      } else {
        let resultCurrentFor: any =
          resultGetLeads.data.total_results / resultGetLeads.data.per_page;

        for (let i = 1; i <= Math.floor(resultCurrentFor); i++) {
          const form = {
            page: i,
            per_page: resultGetLeads.data.per_page,
          };
          const result = await getDataLeads(form);
          const currentDataLead: any = _.orderBy(
            result.data.data,
            "id",
            "desc"
          );
          allData = [...allData, ...currentDataLead];
          dispatch(
            setLeads({
              dataLead: allData,
              totalResults: result.data.total_results,
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createLead = (data: any, themeState: boolean): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading());
    try {
      const today = new Date().toISOString();
      const form = {
        create_date: today,
        email: data.email,
        funnel_id: data.selectFunnel,
        name: data.fullName,
        phone: data.telephone,
      };
      const result = await createLeadService(form);
      if (result.data.message === "Create Lead successfully!") {
        dispatch(obtainApiContacts(1, 100));
        Swal.fire({
          background: themeState === true ? "#0D0D0D" : "#fff",
          title: "Lead Creado correctamente!!",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const editLead = (
  data: any,
  id: number,
  themeState: boolean
): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading());
    try {
      const today = new Date().toISOString();
      const form = {
        id: id,
        create_date: today,
        email: data.email,
        funnel_id: data.selectFunnel,
        name: data.fullName,
        phone: data.telephone,
        background: themeState === true ? "#0D0D0D" : "#fff",
      };
      const result = await editLeadService(form);
      if (result.data.message === "Create Event and device successfully!") {
        dispatch(obtainApiContacts(1, 100));
        Swal.fire({
          background: themeState === true ? "#0D0D0D" : "#fff",
          title: "Lead Editado correctamente!!",
          icon: "success",
        });
      }
      // setCreateLead
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteLead = (id: number, themeState: boolean): AppThunk => {
  return async (dispatch) => {
    // dispatch(starLoading());
    try {
      Swal.fire({
        title: "¿Estas seguro?",
        text: "Esta acción va a eliminar toda la información de tracking relacionado con este  lead. Tenga en cuenta que esta acción es permanente y no se podrá deshacer.",
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
            const resultData = await deleteLeadService(objId);
            if (resultData.data.message === "Delete lead successfully!") {
              dispatch(obtainApiContacts(1, 100));
              Swal.fire({
                background: themeState === true ? "#0D0D0D" : "#fff",
                title: "El Lead se ha eliminado correctamente.",
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

export const obtainApiBooking = (page: number, pageSize: number): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading());
    try {
      const form = {
        page: page,
        per_page: pageSize,
      };
      let resultGetBook = await getDataBooking(form);
      const currentDataBook: any = _.orderBy(
        resultGetBook.data.data,
        ["id", "appoiment_date"],
        ["desc", "asc"]
      );
      let allData: any = currentDataBook;
      console.log("resultGetBook", resultGetBook);
      dispatch(
        setBooking({
          dataBooking: allData,
          totalPageBook: resultGetBook.data.total_results,
        })
      );
      if (
        resultGetBook.data.message === "Token is invalid!" ||
        resultGetBook.data.error === "Signature has expired"
      ) {
        signOut();
        dispatch(logoutUser());
      } else {
        let resultCurrentFor: any =
          resultGetBook.data.total_results / resultGetBook.data.per_page;
        for (let i = 1; i <= Math.floor(resultCurrentFor); i++) {
          const form = {
            page: i,
            // page: resultGetBook.data.page,
            per_page: resultGetBook.data.per_page,
            // per_page: 100,
          };
          const result = await getDataBooking(form);
          const currentDataBook: any = _.orderBy(
            result.data.data,
            ["id", "appoiment_date"],
            ["desc", "asc"]
          );
          allData = [...allData, ...currentDataBook];
          dispatch(
            setBooking({
              dataBooking: allData,
              totalPageBook: result.data.total_results,
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createBooking = (data: any, themeState: boolean): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading());
    try {
      const result = await createBookingService(data);
      console.log("resultBooking", result);
      // if (result.status === "Create Booking successfully!") {
      if (result.status === 200) {
        Swal.fire({
          background: themeState === true ? "#0D0D0D" : "#fff",
          title: "Booking Creado correctamente!!",
          icon: "success",
        });
        dispatch(obtainApiBooking(1, 100));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const editBooking = (data: any, themeState: boolean): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading());
    try {
      const result = await editBookingService(data);
      console.log("resultBooking", result);
      // if (result.data.message === "Edit Booking successfully!") {
      if (result.status === 200) {
        dispatch(obtainApiBooking(1, 100));
        Swal.fire({
          background: themeState === true ? "#0D0D0D" : "#fff",
          title: "Booking Editado correctamente!!",
          icon: "success",
        });
      }
      // setCreateLead
    } catch (error) {
      console.log(error);
    }
  };
};

export const editStateBooking = (data: any, themeState: boolean): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading());
    try {
      const result = await editBookingStateService(data);
      if (result.data.message === "Edit Booking successfully!") {
        dispatch(obtainApiBooking(1, 100));
        Swal.fire({
          background: themeState === true ? "#0D0D0D" : "#fff",
          title: "El estado del booking ha sido editado correctamente!!",
          icon: "success",
        });
      }
      // setCreateLead
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteBooking = (id: number, themeState: boolean): AppThunk => {
  return async (dispatch) => {
    try {
      Swal.fire({
        title: "¿Estas seguro?",
        text: "Esta seguro que quiere borrar el Booking.",
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
            const resultData = await deleteBookingService(objId);
            console.log("resultBooking", resultData);
            if (resultData.data.message === "Delete Booking successfully!") {
              dispatch(starLoading());
              dispatch(obtainApiBooking(1, 100));
              Swal.fire({
                background: themeState === true ? "#0D0D0D" : "#fff",
                title: "El Booking se ha eliminado correctamente.",
                icon: "success",
              });
            }
          } catch (error) {}
        }
      });
    } catch (error) {}
  };
};

export const obtainApiSale = (page: number, pageSize: number): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading());
    try {
      const form = {
        page: page,
        per_page: pageSize,
      };
      const resultGetSale = await getDataSales(form);
      const currentDataSale: any = _.orderBy(
        resultGetSale.data.data,
        "date",
        "desc"
      );
      let allData: any = currentDataSale;
      dispatch(
        setSale({
          dataSale: allData,
          totalPageSale: resultGetSale.data.total_results,
        })
      );
      if (
        resultGetSale.data.message === "Token is invalid!" ||
        resultGetSale.data.error === "Signature has expired"
      ) {
        signOut();
        dispatch(logoutUser());
      } else {
        let resultCurrentFor: any =
          resultGetSale.data.total_results / resultGetSale.data.per_page;

        for (let i = 1; i <= Math.floor(resultCurrentFor); i++) {
          const form = {
            page: i,
            // page: resultGetSale.data.page,
            per_page: resultGetSale.data.per_page,
            // per_page: 100,
          };
          const result = await getDataSales(form);
          const currentDataSale: any = _.orderBy(
            result.data.data,
            "date",
            "desc"
          );
          allData = [...allData, ...currentDataSale];
          dispatch(
            setSale({
              dataSale: allData,
              totalPageSale: result.data.total_results,
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createSale = (data: any, themeState: boolean): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading());
    try {
      const result = await createSaleService(data);
      if (
        result.data.message === "Create Sale and device successfully!" ||
        result.data.message === "Create Sale successfully!"
      ) {
        dispatch(obtainApiSale(1, 100));
        Swal.fire({
          background: themeState === true ? "#0D0D0D" : "#fff",
          title: "Venta Creada correctamente!!",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const editSale = (data: any, themeState: boolean): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading());
    try {
      const result = await editSaleService(data);
      if (result.data.message === "Edit Sale successfully!") {
        dispatch(obtainApiSale(1, 100));
        Swal.fire({
          background: themeState === true ? "#0D0D0D" : "#fff",
          title: "Venta Editada correctamente!!",
          icon: "success",
        });
      }
      // setCreateLead
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteSale = (id: number, themeState: boolean): AppThunk => {
  return async (dispatch) => {
    try {
      Swal.fire({
        title: "¿Estas seguro?",
        text: "Esta seguro que quiere eliminar la venta.",
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
              id_event: id,
            };
            dispatch(starLoading());
            const resultData = await deleteSaleService(objId);
            console.log("resultDataSales", resultData);

            if (resultData.data.message === "Delete Sale successfully!") {
              dispatch(obtainApiSale(1, 100));
              Swal.fire({
                background: themeState === true ? "#0D0D0D" : "#fff",
                title: "La venta se ha eliminado correctamente.",
                icon: "success",
              });
            }
          } catch (error) {}
        }
      });
    } catch (error) {}
  };
};

export const obtainUserProfile = (data: any): AppThunk => {
  return async (dispatch) => {
    // dispatch(starLoading());
    try {
      const result = await getUserProfile(data);
      console.log("resultProfile", result);
      const currentDataLead: any = result.data.data;
      dispatch(setUser(currentDataLead));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createTrafficSource = (
  data: any,
  themeState: boolean
): AppThunk => {
  return async (dispatch) => {
    dispatch(starLoading());
    try {
      const result = await createTrafficSourceService(data);
      console.log("resultTraficc", result);
      if (result.data.message === "Attribution Of Sale successfully!") {
        dispatch(obtainApiSale(1, 100));
        dispatch(obtainApiContacts(1, 100));
        Swal.fire({
          background: themeState === true ? "#0D0D0D" : "#fff",
          title: "Trafico Editado correctamente!!",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const closeUserDetail = (): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setUser([]));
    } catch (error) {
      console.log(error);
    }
  };
};
