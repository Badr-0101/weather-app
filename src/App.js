import logo from "./logo.svg";
import "./App.css";
import Test from "./components/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import { dir } from "i18next";
const theme = createTheme({
  Typography: {
    fontFamily: ["IBM"],
  },
});
function App() {
  // ##########states##########
  const [data, setData] = useState({
    temp: "",
    icon: "",
    date: `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`,
    disc: "",
  });
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState("en");
  // ##########states##########
  function handleLanguageChange() {
    const lang = currentLang == "en" ? "ar" : "en";
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
  }

  let CancelAxios = null;
  useEffect(() => {
    axios
      .get(
        "http://api.weatherapi.com/v1/current.json?key=6e57df7ef2d34cc6ae6162536250607&q=cairo&aqi=no",
        {
          CancelToken: new axios.CancelToken((c) => {
            CancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        setData({
          temp: response.data.current.temp_c,
          icon: response.data.current.condition.icon,
          disc: response.data.current.condition.text,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              flexDirection: "column",
            }}
          >
            {/* card */}
            <div
              style={{
                width: "100%",
                backgroundColor: "rgb(20 52 91/ 36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
              }}
            >
              {/* content */}
              <div dir={currentLang == "en" ? "ltr" : "rtl"}>
                {/* city and time */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                  }}
                >
                  <Typography variant="h2" style={{ marginRight: "20px" }}>
                    {t("cairo")}
                  </Typography>
                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    {`${new Date().getFullYear()}-${
                      new Date().getMonth() + 1
                    }-${new Date().getDate()}`}
                  </Typography>
                </div>
                {/* city and time */}
                <hr></hr>

                {/* degree and description */}
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    {/* temp */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {Math.round(data.temp)}
                      </Typography>

                      <Typography variant="h6" style={{}}>
                        <img src={`${data.icon}`}></img>
                      </Typography>
                      {/* temp */}
                    </div>
                    {/* temp disc */}
                    <div>{t(data.disc)}</div>
                    {/* temp disc */}
                  </div>

                  <CloudIcon
                    style={{ fontSize: "200", color: "white" }}
                  ></CloudIcon>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                width: "100%",
              }}
            >
              <Button
                variant="text"
                style={{ color: "white" }}
                onClick={handleLanguageChange}
              >
                {currentLang == "en" ? "عربي" : "English"}
              </Button>
            </div>
            {/* card */}
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
