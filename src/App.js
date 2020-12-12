import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography
} from "@material-ui/core";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  table: {
    minWidth: 450,
  },
  container: {
    maxHeight: 1040,
  },
  header: {
    fontWeight: "bold",
  },
});

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export const App = () => {
  const classes = useStyles();

  const [shows, setShows] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(`https://project-express-api-olof.herokuapp.com/shows/any/?query=${query}`)
      .then((res) => res.json())
      .then((json) => setShows(json));
  }, [query]);

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Typography variant="h1" align="center">MUItflix</Typography>
      </Paper>
      <Paper clasName={classes.root}>
        <TextField
          type="text"
          variant="standard"
          name="name"
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search For Anything"
          InputProps={{ disableUnderline: true }}
          fullWidth
        />
        <TableContainer component={Paper} className={classes.container}>
          <Table
            stickyHeader
            className={classes.table}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell className={classes.header}>Title</TableCell>
                <TableCell className={classes.header}>Type</TableCell>
                <TableCell className={classes.header}>Director</TableCell>
                <TableCell className={classes.header}>Country</TableCell>
                <TableCell className={classes.header}>Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shows.map((show) => (
                <TableRow key={show.show_id} hover>
                  <TableCell>{show.title}</TableCell>
                  <TableCell>{show.type}</TableCell>
                  <TableCell>{show.director}</TableCell>
                  <TableCell>{show.country}</TableCell>
                  <TableCell>{show.release_year}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={shows.length}
        />
      </Paper>
    </ThemeProvider>
  );
};
