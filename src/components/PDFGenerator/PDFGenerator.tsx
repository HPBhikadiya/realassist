import { FC, useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "../MyDocument/MyDocument";
import { Box } from "@mui/material";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import CircularProgress from "@mui/material/CircularProgress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import axios from "axios";

const PDFGenerator: FC = () => {
  const [data, setData] = useState<any>(null);
  const [showComponent, setShowComponent] = useState<boolean>(false);

  useEffect(() => {
    axios({ url: process.env.REACT_APP_BASE_URL, method: "GET" })
      .then((data) => {
        setData(data.data.data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowComponent(true);
    }, 3000);
    return () => clearTimeout(delay);
  }, [data]);

  return (
    <>
      <Box
        sx={{
          zIndex: -1,
          position: "absolute",
        }}
      >
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          width={500}
          height={300}
        >
          <CartesianGrid stroke="#eee" horizontal={true} vertical={false} />
          <XAxis dataKey="data_year" />
          <YAxis />

          <Line
            type="monotone"
            dataKey="Burglary"
            stroke={"#8884d8"}
            dot={false}
            strokeWidth={2}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </Box>
      {showComponent ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            width: "100vw",
            height: "100vh",
            borderRadius: 10,
            backgroundColor: "#fff",
            color: "#000",
            fontSize: 50,
            fontWeight: 700,
            zIndex: 1,
          }}
        >
          <PDFDownloadLink
            document={<MyDocument />}
            fileName="example.pdf"
            style={{
              textDecoration: "none",
            }}
          >
            {({ blob, url, loading, error }) => (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    margin: 10,
                    padding: 3,
                    width: 100,
                    height: 40,
                    border: "1px solid #fff",
                    borderRadius: 10,
                    backgroundColor: "#000",
                    color: "#fff",
                    fontSize: 20,
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  {loading || !data ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    <>
                      <LocalPrintshopIcon /> Print
                    </>
                  )}
                </Box>
              </>
            )}
          </PDFDownloadLink>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            width: "100vw",
            height: "100vh",
            borderRadius: 10,
            backgroundColor: "#fff",
            color: "#000",
            fontSize: 50,
            fontWeight: 700,
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              margin: 10,
              padding: 3,
              width: 100,
              height: 40,
              border: "1px solid #fff",
              borderRadius: 10,
              backgroundColor: "#000",
              color: "#fff",
              fontSize: 20,
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            <CircularProgress color="inherit" />
          </Box>
        </Box>
      )}
    </>
  );
};
export default PDFGenerator;
