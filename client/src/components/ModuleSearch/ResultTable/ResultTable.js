import React from 'react';
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

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
          {nusModules.map(nusModule => <li>{nusModule.nusModuleCode}</li>)}
      </Popover.Content>
    </Popover>
  );
  
  const button = (modules) => (
      <OverlayTrigger trigger="hover" placement="right" overlay= {popover(modules)}>
      <Button variant="light">{modules.length}</Button>
      </OverlayTrigger>
  );


  const dispatch = useDispatch();

  function createData(uni) {
    let university = uni.university;
    let location = uni.location;
    let moduleNumber = <div> {button(uni.nusModuleInfo)} </div>;
    let actionButton = <Button variant = "light" type="button" onClick = {() => { dispatch(addUniversity(uni));}}>Add +</Button>
  
    return {university, location, moduleNumber, actionButton};
  }

  const rows = useSelector(store => store.universityResults).map(uni => createData(uni));

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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
  );
}