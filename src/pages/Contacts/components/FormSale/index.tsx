import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import InputRegister from "../../../../components/input/InputRegister.component";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectComponent from "../../../../components/Select/index";
import { useAppSelector, useAppDispatch } from "../../../../hooks/appDispatch";
import SelectWithValidation from "../../../../components/Select/SelectWithValidation.component";
import {
  createSale,
  editSale,
} from "../../../../redux/state/slices/contacts/contactsThunk";
import { ButtonsModal } from "../../../../styled-components/button/index";
// import { schema } from "./yupSchemaLead";
import * as yup from "yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import SelectStateBooking from "../SelectStateBooking/index";
import moment from "moment";
import SelectOnlyForProduct from "../SelectProduct/index";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  fullName: String;
}

type Option = {
  value: string;
  label: string;
};

const FormSale = ({ onClose, currentEdit, setCurrentEdit }: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const today = new Date();
  const funnels: any = useAppSelector((state) => state.dashboard.dataTracking);
  const { dataProduct } = useAppSelector((state) => state.tracking);
  console.log("dataProduct", dataProduct);
  const [idEditSale, setIdEditSale] = useState<number>(0);
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [selectFunnel, setSelectFunnel] = useState(funnels[0]?.id);
  const [selectProduct, setSelectProduct] = useState(dataProduct[0]?.name);
  const [price, setPrice] = useState(dataProduct[0]?.price);
  const [dateSale, setDateSale] = useState<Date>(today);
  const [selectProductOnchange, setSelectProductOnchange] = useState();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("El correo electrónico debe ser un correo electrónico válido")
      .required("El correo electronico es requerido"),
    phone: yup
      .number()
      .positive()
      .integer()
      .min(10)
      .required("El numero de telefono es requerido"),
    // date: yup.date().required("La fecha es obligatoria"),
    selectFunnel: yup.string().required(),
    // selectProduct: yup.string().required("La fecha es obligatoria"),
    price: yup.number().positive().integer().required("El precio es requerido"),
  });

  const initForm = () => {
    if (currentEdit) {
      console.log("currentEdit---", currentEdit);
      const {
        email: emailParam,
        phone,
        date,
        funnel_id,
        product,
        price: priceParam,
      } = currentEdit;
      setEmail(emailParam);
      setPhone(phone);
      setSelectFunnel(funnel_id);
      setSelectProduct(product);
      setPrice(priceParam);
      setDateSale(new Date(date));
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (currentEdit) {
      initForm();
      // setValue("dateSale", currentEdit.appoiment_date);
      setIdEditSale(currentEdit.id);
    }
  }, [currentEdit, setValue]);

  useEffect(() => {
    setValue("phone", phone);
  }, [phone]);

  useEffect(() => {
    setValue("email", email);
  }, [email]);

  useEffect(() => {
    setValue("dateSale", dateSale);
  }, [dateSale]);

  useEffect(() => {
    setValue("selectFunnel", selectFunnel);
  }, [selectFunnel]);

  useEffect(() => {
    setValue("selectProduct", selectProduct);
  }, [selectProduct]);

  useEffect(() => {
    setValue("price", price);
  }, [price]);

  useEffect(() => {
    if (dataProduct.length === 0) {
      Swal.fire({
        title:
          "Para crear un Funnel debes crear un producto. Por favor ir a crear un producto para continuar.",
        confirmButtonText: "Ir a producto",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate("/tracking");
          // addFunnels();
          localStorage.setItem("CreateProduct", "3");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  }, [dataProduct]);

  useEffect(() => {
    if (!selectProductOnchange) return;
    const { price } = dataProduct.find(
      (data: any) => data.name === selectProductOnchange
    );
    setPrice(price);
  }, [selectProductOnchange]);

  const onSubmit = (data: any) => {
    if (dataProduct.length === 0) {
      Swal.fire({
        title:
          "Para crear un Funnel debes crear un producto. Por favor ir a crear un producto para continuar.",
        confirmButtonText: "Ir a producto",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate("/tracking");
          // addFunnels();
          localStorage.setItem("CreateProduct", "3");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
      return;
    }
    console.log("dataSale--", data);
    const currentDateSale = moment(dateSale).format("YYYY-MM-DD hh:mm:ss");
    const form: any = {
      date: currentDateSale,
      email: data.email,
      funnel_id: data.selectFunnel,
      phone: data.phone,
      price: data.price,
      product: data.selectProduct,
      ts: "",
      refaund: 0,
    };
    if (idEditSale !== 0) {
      form.id = currentEdit.id;
      form.id_traffic = currentEdit.id_traffic;
      dispatch(editSale(form));
      setCurrentEdit();
      setIdEditSale(0);
    } else {
      dispatch(createSale(form));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="form-group col-sm-12">
          <InputRegister
            placeholder="Ingrese e-mail de reserva"
            label="Correo electrónico de cita (Booking)"
            id="0"
            type="text"
            min={3}
            name="email"
            register={register}
            error={String(errors["email"]?.message)}
          />
        </div>
        <div className="form-group col-sm-12">
          <InputRegister
            placeholder="Ingresa tu numero de telefono"
            label="Teléfono del cliente"
            id="0"
            type="number"
            min={3}
            name="phone"
            register={register}
            error={String(errors["phone"]?.message)}
          />
        </div>
        <div className="form-group col-sm-12 date-width">
          <label className="title-label-popup w-100">Fecha y Hora</label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              value={dateSale}
              minDate={today}
              onChange={(newValue: any) => {
                setDateSale(newValue);
              }}
            />
          </LocalizationProvider>
        </div>
        <div className="form-group col-sm-12">
          <SelectWithValidation
            label="Seleccionar Funnel"
            options={funnels}
            name="selectFunnel"
            register={register}
            error={String(errors["selectFunnel"]?.message)}
            disabled={currentEdit ? true : false}
          />
        </div>
        <div className="form-group col-sm-12">
          <SelectOnlyForProduct
            label="Seleccionar Producto"
            options={dataProduct}
            name="selectProduct"
            register={register}
            error={String(errors["selectProduct"]?.message)}
            setSelectProductOnchange={setSelectProductOnchange}
          />
        </div>
        <div className="form-group col-sm-12">
          <InputRegister
            placeholder="Ingresa el precio"
            label="Precio"
            id="0"
            type="number"
            min={3}
            name="price"
            register={register}
            error={String(errors["price"]?.message)}
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-sm-6">
          <ButtonsModal className="btn btn-close" onClick={onClose}>
            Cerrar
          </ButtonsModal>
        </div>
        <div className="form-group col-sm-6">
          <ButtonsModal className="btn btn-add" type="submit">
            {idEditSale !== 0 ? "Editar" : "Guardar"}
          </ButtonsModal>
        </div>
      </div>
    </form>
  );
};

export default FormSale;