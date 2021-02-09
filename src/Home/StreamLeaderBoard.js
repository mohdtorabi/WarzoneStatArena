// react imports
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import axios from "axios";
// material UI imports
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

// creating fake Data
const createData = (name, kills, death, KD, Votes) => {
  return { name, kills, death, KD, Votes };
};

// sorting the table
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};
// ---------------------------------------------------------------------

// table content Input
const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "Streamer" },
  { id: "kills", numeric: true, disablePadding: false, label: "Kills" },
  { id: "death", numeric: true, disablePadding: false, label: "Death" },
  { id: "KD", numeric: true, disablePadding: false, label: "K/D Ratio" },
  {
    id: "Matches Played",
    numeric: true,
    disablePadding: false,
    label: "Matches Played",
  },
];

// rendering the Head values of the table
const EnhancedTableHead = (props) => {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.text}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              style={{color:"#dea10e"}}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

// controlling values input
EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
    display: "flex",
    justifyContent: "center",
  },
}));

// tool bar Component
const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
      style={{color:"#dadada"}}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Top Streamers of the week
        </Typography>
      )}
    </Toolbar>
  );
};

// controlling values input
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: 1200,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-end",
    marginTop: "25%",
  },
  paper: {
    position: "absolute",
    width: "45vw",
    color: "#fff",
    background: "#151518",
    marginBottom: "100px",
  },
  table: {
    margin: 5,
    height: "50px",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  text: {
    color: "#dadada",
    fontSize: "12px",
  },
  paggination:{
    color: "#dea01e",
    "&:disabled":{
      color:"red"
    }
  }
}));

const newStyles = makeStyles({
  root: { /* … */ },
  colorInherit: {
    color: '#dea01e',
    '&$disabled': { color: '#dadada' },
  },
  disabled: {},
}, { name: 'MuiIconButton' });

// number of rows showing
const tableRows = () => {
  if (headCells.length > 4) {
    return 3;
  }
  return headCells.length;
};

// main leaderboard const
let rows = [];
export default function StreamLeaderBoard(props) {
  const classes = useStyles();
  const newClass = newStyles()
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("kills");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(tableRows);
  const [showData, setShowData] = useState(false);

  // bringing all streamers data from server
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3030/stats/Nickmercs%2311526&battle`),
      axios.get(`http://localhost:3030/stats/FontainesRazor&psn`),
      axios.get(`http://localhost:3030/stats/pieman%2312544&battle`),
      axios.get(`http://localhost:3030/stats/Metaphor%2311972&battle`),
      axios.get(`http://localhost:3030/stats/illest954&psn`),
    ]).then((streamerData) => {
      if (rows.length === 0) {
        rows.push(
          createData(
            "Nickmercs",
            streamerData[0].data[0].weeklyData.all.properties.kills,
            streamerData[0].data[0].weeklyData.all.properties.deaths,
            streamerData[0].data[0].weeklyData.all.properties.kdRatio.toFixed(
              2
            ),
            streamerData[0].data[0].weeklyData.all.properties.matchesPlayed
          )
        );
        if(streamerData[1].data[0].weeklyData) {
          rows.push(
            createData(
              "Fontaines",
              streamerData[1].data[0].weeklyData.all.properties.kills,
              streamerData[1].data[0].weeklyData.all.properties.deaths,
              streamerData[1].data[0].weeklyData.all.properties.kdRatio.toFixed(
                2
              ),
              streamerData[1].data[0].weeklyData.all.properties.matchesPlayed
            )
          );
          rows.push(
            createData(
              "pieman",
              streamerData[2].data[0].weeklyData.all.properties.kills,
              streamerData[2].data[0].weeklyData.all.properties.deaths,
              streamerData[2].data[0].weeklyData.all.properties.kdRatio.toFixed(
                2
              ),
              streamerData[2].data[0].weeklyData.all.properties.matchesPlayed
            )
          );
          rows.push(
            createData(
              "Metaphor",
              streamerData[3].data[0].weeklyData.all.properties.kills,
              streamerData[3].data[0].weeklyData.all.properties.deaths,
              streamerData[3].data[0].weeklyData.all.properties.kdRatio.toFixed(
                2
              ),
              streamerData[3].data[0].weeklyData.all.properties.matchesPlayed
            )
          );
          rows.push(
            createData(
              "illest",
              streamerData[4].data[0].weeklyData.all.properties.kills,
              streamerData[4].data[0].weeklyData.all.properties.deaths,
              streamerData[4].data[0].weeklyData.all.properties.kdRatio.toFixed(
                2
              ),
              streamerData[4].data[0].weeklyData.all.properties.matchesPlayed
            )
          );
        }
       
      }
      setShowData(true);
    });
  }, [showData]);

  // specifing asc or dec sorting
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // handling the page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // rows per page const
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"small"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow role="checkbox" tabIndex={-1} key={row.name}>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        className={classes.text}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right" className={classes.text}>
                        {row.kills}
                      </TableCell>
                      <TableCell align="right" className={classes.text}>
                        {row.death}
                      </TableCell>
                      <TableCell align="right" className={classes.text}>
                        {row.KD}
                      </TableCell>
                      <TableCell align="right" className={classes.text}>
                        {row.Votes}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className={newStyles.colorInherit}
          style={{ color: "#dea01e" }}
          rowsPerPageOptions={[3]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
