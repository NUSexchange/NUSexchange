import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import {useDispatch} from "react-redux";
import {addUniversity} from "../../../actions";
import {useSelector} from "react-redux";


// Material-UI styles
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

// Column definition for results table
const columns = [
  { id: 'university', label: 'University', minWidth: 170 },
  { id: 'location', label: 'Location', minWidth: 100 },
  {
    id: 'moduleNumber',
    label: 'No. of Mappable Modules',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'actionButton',
    label: 'Actions',
    minWidth: 170,
    align: 'right',
  },
];

export default function StickyHeadTable() {

  function processResults(universityResults) {
    const processedUniversityResults = [];

    for (let university of universityResults) {
      const matchingModulesSet = new Set();
      for (let module of university["Modules"]) {
        matchingModulesSet.add(module["Module"]);
      }

      const universityWithUniqueModule = {
        "Country" : university["Country"],
        "Modules" : university["Modules"],
        "Total Mappable" : university["Total Mappable"],
        "University" : university["University"],
        "Unique Mappable" : Array.from(matchingModulesSet)
      }

      processedUniversityResults.push(universityWithUniqueModule);

    }

    return processedUniversityResults;
  }


  // Redux state
  const universityResults = useSelector(store => store.universityResults);

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [matchingUniversities, setMatchingUniversities] = useState([]);

  useEffect(() => {
    console.log("University Results");
    console.log(processResults(universityResults));
    setMatchingUniversities(processResults(universityResults)
                            .sort((o1, o2) => o2["Total Mappable"] - o1["Total Mappable"])
                            .map(university => createData(university)));
  }, [universityResults]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const popover = (nusModules) => (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Mappable Modules</Popover.Title>
      <Popover.Content>
          {nusModules.map((nusModule, index)=> <li key = {index}>{nusModule}</li>)}
      </Popover.Content>
    </Popover>
  );
  
  const button = (modules) => (
      <OverlayTrigger trigger= {["hover", "focus"]} placement="right" overlay= {popover(modules)}>
      <Button variant="light">{modules.length}</Button>
      </OverlayTrigger>
  );


  const dispatch = useDispatch();

  function createData(uni) {
    let university = uni["University"];
    let location = uni["Country"];
    let moduleNumber = <div> {button(uni["Unique Mappable"])} </div>;
    let actionButton = <Button variant = "light" type="button" onClick = {() => { dispatch(addUniversity(uni));}}>Add +</Button>
  
    return {university, location, moduleNumber, actionButton};
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {matchingUniversities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={matchingUniversities.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}