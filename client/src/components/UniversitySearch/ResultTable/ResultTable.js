import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Button from "@material-ui/core/Button";
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Col from "react-bootstrap/Col";
import {useSelector} from "react-redux";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai"
import {useDispatch} from "react-redux";
import { addModuleUniversity }from "../../../actions";

const columns = [
  { id: 'Actions', label: 'Actions', minWidth: 50},
  { id: 'NUSModuleCode', label: 'NUSModuleCode', minWidth: 100 },
  { id: 'NUSModuleTitle', label: 'NUSModuleTitle', minWidth: 170 },
  { id: 'OverseasModuleCode', label: 'OverseasModuleCode', minWidth: 100 },
  { id: 'OverseasModuleTitle', label: 'OverseasModuleTitle', minWidth: 170 },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginBottom: "20px"
  },
  container: {
    maxHeight: 440,
  },
});

export default function ResultTable(props) {

  let dispatch = useDispatch();
  let savedModules= useSelector(store => store.savedModules);

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [savedModuleSet, setSavedModuleSet] = React.useState(savedModules.moduleSetUniversities);

  useEffect(() => {
    console.log(savedModules);
    setSavedModuleSet(savedModules.moduleSetUniversities);
  }, [savedModules])

  function createData(module, NUSModuleCode, NUSModuleTitle, OverseasModuleCode, OverseasModuleTitle) {
    let Actions = <Button variant="light" type="button" onClick = {() => savedModuleSet.has(module["NUS Module"]) ? null : dispatch(addModuleUniversity(module))}> {savedModuleSet.has(module["NUS Module"]) ? <AiOutlineCheck /> : <AiOutlinePlus /> } </Button>;
    return {Actions, NUSModuleCode, NUSModuleTitle, OverseasModuleCode, OverseasModuleTitle};
  }

  const rows = useSelector(store => store.searchByUniversity.currentShownResults.map(module => createData(module, module["NUS Module"], module["NUS Title"], module["Partner Module"], module["Partner Title"])));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Col lg = {12} sm = {12} style = {{display : "flex", justifyContent: "center"}}>
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
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Col>
  );
}