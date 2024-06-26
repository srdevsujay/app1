import React, { useContext, useEffect, useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import _ from "lodash";
import { FilterSource } from "../../styled-components/dashboardStyled";
import { totalPnl } from "../TotalTablePnl";
import { useAppSelector } from "../../../../hooks/appDispatch";
import { useCallback } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../../../utilities/theme/ThemeContext";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

// function getStyles(name: string, personName: readonly string[], theme: Theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

const SourceFilter = ({
  groupPlataform,
  setGroupPlataform,
  setSelectPlatform,
}: any) => {
  // const theme = useTheme();
  const { theme } = useContext(ThemeContext);
  const dashboardMain = useAppSelector((state) => state.dashboard.dataPNL);
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [uniquePlataform, setUniquePlataform] = useState<string[]>([]);
  const [canCallTotalTable, setCanCallTotalTable] = useState(true);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    console.log("sleect");

    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    // setTablePnl(dashboardMain);
    if (dashboardMain.length > 0) {
      groupByPNL();
      getPlataform();
      setCanCallTotalTable(false);
    }
  }, [dashboardMain]);

  const getPlataform = () => {
    let unicos: any;
    let personasMap = dashboardMain.map((item: any) => {
      return item.plataform;
    });
    unicos = new Set(...[personasMap]);
    setPersonName([...unicos]);
    setUniquePlataform([...unicos]);
  };

  useEffect(() => {
    funnelfilter(personName);
  }, [personName]);

  const funnelfilter = (name: any) => {
    const tempSelectPlatform = groupPlataform.filter((platform: any) =>
      name.includes(platform.plataform)
    );
    setSelectPlatform(tempSelectPlatform);
  };

  const groupByPNL = () => {
    if (dashboardMain.length > 0) {
      // setTotalAmmount([]);
      const tempGroup = _(dashboardMain)
        .groupBy("plataform")
        .map((platform, id) => ({
          plataform: id,
          gastos: _.sumBy(platform, "gastos"),
          ingresos: _.sumBy(platform, "ingresos"),
          porcentajerentabilidad: _.sumBy(platform, "porcentajerentabilidad"),
          rentabilidad: _.sumBy(platform, "rentabilidad"),
          roi: _.sumBy(platform, "roi"),
          leeds: _.sumBy(platform, "leeds"),
          bookings: _.sumBy(platform, "bookings"),
          meetings: _.sumBy(platform, "meetings"),
        }))
        .value();
      setGroupPlataform(tempGroup);
      totalPnl(tempGroup);
      return;
    }
  };

  const themeLocalStorage: any = localStorage.getItem("Theme");
  const themeState = JSON.parse(themeLocalStorage);

  const [selectFilter, setSelectFilter] = useState(false);

  const handleFilterChange = () => {
    // Aquí puedes manejar los cambios en la selección de filtros
    console.log("Filtros seleccionados:");
  };

  console.log("themeState--Dash", themeState);

  return (
    <FilterSource theme={theme} onChange={handleFilterChange}>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          multiple
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Selecciona tu fuente</em>;
            }

            return selected.join(", ");
          }}
          // MenuProps={MenuProps}
          // inputProps={{ "aria-label": "Without label" }}
          inputProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  width: 250,
                  backgroundColor: themeState === true ? "#0d0d0d" : "#fff",
                },
              },
            },
          }}
          className={
            themeState === true || themeState === "true"
              ? "menuStyleExample backMenuItem"
              : "menuStyleExample"
          }
        >
          {uniquePlataform.map((pnl) => (
            <MenuItem
              key={pnl}
              value={pnl}
              className={
                themeState === true || themeState === "true"
                  ? "backMenuItem"
                  : ""
              }
            >
              <Checkbox checked={personName.indexOf(pnl) > -1} />
              <ListItemText primary={pnl} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </FilterSource>
  );
};

export default SourceFilter;
