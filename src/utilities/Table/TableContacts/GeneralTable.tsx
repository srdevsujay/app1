import MaterialTable, { MTableBody } from "material-table";
import { forwardRef, useContext, useEffect, useState } from "react";
import { Table } from "../../../styled-components/Table/index";
import "../../../styled-components/style.css";
import { ThemeContext } from "../../theme/ThemeContext";
import {
  Paper,
  Typography,
  withStyles,
  makeStyles,
  Checkbox,
  FormControlLabel,
  Tooltip,
  Grid,
  IconButton,
} from "@material-ui/core";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import ListIcon from "@material-ui/icons/List";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const GeneralTable = ({
  data,
  columns,
  pageSizeOptions,
  maxBodyHeight,
  pageSize,
  getUserProfile,
  // obtainDataPageChange,
  totalPages,
  rowsPerPage,
  setRowsPerPage,
}: any) => {
  const { theme } = useContext(ThemeContext);

  const tableStyles = {
    backgroundColor: theme.background,
    color: theme.text,
    // Agrega más estilos según sea necesario
  };

  const themeLocalStorage: any = localStorage.getItem("Theme");
  const themeState = JSON.parse(themeLocalStorage);

  const handleRowClick = (event: any, rowData: any) => {
    const clickedColumnClass = event.target.className;
    console.log("clickedColumnClass", clickedColumnClass);

    // Verifica si se hizo clic en la columna específica por su nombre de campo
    if (
      clickedColumnClass.includes("select-booking") ||
      clickedColumnClass.includes("dropdown-toggle")
    ) {
      // Realiza una acción específica para esa columna
      // en este caso no realizar nada para que n ose abra el popup del recorrido
    } else {
      // Acción por defecto para el clic en otras columnas
      getUserProfile(rowData, event);
    }
  };

  // const [currentPage, setCurrentPage] = useState(1);
  // const [changePage, setChangePage] = useState(0);

  // const handlePageChange = (page: any) => {
  //   const currentPage = page + 1;
  //   console.log("currentPagecurrentPage", currentPage);

  //   setCurrentPage(currentPage);
  //   // obtainDataPageChange(currentPage);
  // };

  // const handleRowsPerPageChange = (newRowsPerPage: any) => {
  //   console.log("newRowsPerPage", newRowsPerPage);
  //   setRowsPerPage(newRowsPerPage);
  //   setChangePage(1);
  // };

  // useEffect(() => {
  //   console.log("currentPage--", currentPage);
  //   console.log("changePage--", changePage);
  //   if (changePage === 0) return;
  //   console.log("currentPage-", currentPage);
  //   console.log("pageSize", rowsPerPage);
  //   obtainDataPageChange(currentPage, rowsPerPage);
  //   setCurrentPage(0);
  //   setChangePage(0);
  // }, [currentPage, changePage, rowsPerPage]);

  const CustomPaginationComponent = (props: any) => {
    const {
      page,
      rowsPerPage,
      count,
      onChangePage,
      rowsPerPageOptions,
      onChangeRowsPerPage,
    } = props;

    console.log(props);

    let from = rowsPerPage * page + 1;
    let to = rowsPerPage * (page + 1);
    if (to > count) {
      to = count;
    }
    return (
      <td>
        <Grid container alignItems="center" style={{ paddingTop: 8 }}>
          <Grid item>
            <FormControl>
              <InputLabel>Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={rowsPerPage}
                onChange={onChangeRowsPerPage}
              >
                {rowsPerPageOptions.map((x: any, i: number) => (
                  <MenuItem value={x} key={i}>
                    {x}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <IconButton
              disabled={page === 0}
              onClick={(e) => onChangePage(e, 0)}
            >
              <SkipPreviousRoundedIcon
                fontSize="small"
                color={page === 0 ? "disabled" : "primary"}
              />
              <Typography>First Page</Typography>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              disabled={page === 0}
              onClick={(e) => onChangePage(e, page - 1)}
            >
              <SkipPreviousRoundedIcon
                fontSize="small"
                color={page === 0 ? "disabled" : "primary"}
              />
              <Typography>Prev</Typography>
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="caption" style={{ color: "black" }}>
              {from}-{to} of {count}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              disabled={to >= count}
              onClick={(e) => onChangePage(e, page + 1)}
            >
              <Typography>Next</Typography>
              <SkipNextRoundedIcon
                fontSize="small"
                color={to < count ? "primary" : "disabled"}
              />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              disabled={to >= count}
              onClick={(e) => onChangePage(e, count)}
            >
              <SkipNextRoundedIcon
                fontSize="small"
                color={to >= count ? "disabled" : "primary"}
              />
              <Typography>Last Page</Typography>
            </IconButton>
          </Grid>
        </Grid>
      </td>
    );
  };

  const tableIcons: any = {
    FirstPage: forwardRef((props: any, ref: any) => (
      <SkipPreviousRoundedIcon {...props} ref={ref} />
    )),
    LastPage: forwardRef((props: any, ref: any) => (
      <SkipNextRoundedIcon {...props} ref={ref} />
    )),
    NextPage: forwardRef((props: any, ref: any) => (
      <NavigateNextRoundedIcon {...props} ref={ref} />
    )),
    PreviousPage: forwardRef((props: any, ref: any) => (
      <NavigateBeforeRoundedIcon {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props: any, ref: any) => (
      <ListIcon {...props} ref={ref} />
    )),
  };

  return (
    <Table
      className={themeState === true || themeState === "true" ? "tables" : ""}
      position="relative"
    >
      <MaterialTable
        title=""
        data={data}
        columns={columns}
        //icons={tableIcons}
        options={{
          pageSize: pageSize,
          //pageSizeOptions: pageSizeOptions,
          columnsButton: false,
          search: false,
          headerStyle: {
            backgroundColor: theme.background,
            color: theme.text,
            position: "sticky",
            top: 0,
          },
          maxBodyHeight: maxBodyHeight,
          emptyRowsWhenPaging: false,
          // paginationType: "stepped",
        }}
        localization={{
          pagination: {
            labelRowsSelect: "Filas",
            // labelDisplayedRows: "{from}-{to} de " + totalPages,
          },
          body: {
            emptyDataSourceMessage: "No hay Datos...",
          },
        }}
        // onRowClick={(e, rowData) => getUserProfile(rowData, e)}
        totalCount={totalPages}
        onRowClick={handleRowClick}
        // onChangePage={handlePageChange}
        // onChangeRowsPerPage={(newPageSize) => {
        //   handleRowsPerPageChange(newPageSize); // Actualiza la variable de estado del pageSize
        // }}
        style={tableStyles}
        components={{
          // Toolbar: (props) => <CustomToolbarComponent {...props} />,
          Pagination: (props) => {
            return <CustomPaginationComponent {...props} />;
          },
        }}
      />
    </Table>
  );
};

export default GeneralTable;
