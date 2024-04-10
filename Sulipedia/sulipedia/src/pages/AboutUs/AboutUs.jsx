import Gyuri from "../../resources/Gyuri.jpg";
import Marci from "../../resources/Marci.jpg";
import Krisz from "../../resources/Krisz.webp";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Image from "mui-image";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, description, quote, image) {
  return { name, description, quote, image };
}

const rows = [
  createData(
    "Polyák György",
    "Egy zseni, akit már nem választ el egy hajszál",
    <>
      Now they are convinced that a human being is not <br /> just free on his
      own, but has to go out and earn money, so that he can buy freedom! <br />{" "}
      And now they have their purpose in life! <br />- Mr. Freeman
    </>,
    <Image id="gyuriKep" alt="Gyuri" src={Gyuri} />
  ),
  createData(
    "Seres Marcell",
    "Háttér karakter, furcsa megoldások megszállotja",
    <>
      Hogyha a bal oldalon mész, valószínűleg nem ott lesz, mert a jobb oldalon
      van.
    </>,
    <Image id="gyuriKep" alt="Marcell" src={Marci} />
  ),
  createData(
    "Zagyi Krisztián Zsolt",
    "Zagyi Krisztián vagyok",
    <>Nincs lehetetlen, csak olyan lehetőség, amire eddig nem gondoltunk.</>,
    <Image id="gyuriKep" alt="Krisztián" src={Krisz} />
  ),
];

export function AboutUs({ children }) {
  return (
    <TableContainer component={Paper}>
      {children}
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Becses neveink</StyledTableCell>
            <StyledTableCell align="right">Egy leírás rólunk</StyledTableCell>
            <StyledTableCell align="center">
              Egy kedvelt idézetünk
            </StyledTableCell>
            <StyledTableCell align="center">
              Egy számunkra kedves kép
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.description}</StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="body2" paragraph>
                  {row.quote}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">{row.image}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
