import { Card } from "@mui/material";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {
  const [countries, setCountries] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [isTimer, setIsTimer] = useState(true);
  const [countryOpt, setCountryOpt] = useState("");
  const [stdTime, setStdTime] = useState(null);
  const [date, setDate] = useState([0, 0, 0]);
  const [day, setDay] = useState("non");

  useEffect(() => {
    if (stdTime !== null) {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const utcDateTime = new Date(stdTime.utc_datetime);
      const localDateTimeString = utcDateTime.toLocaleString("en-US", {
        timeZone: countryOpt,
      });

      setDay(days[utcDateTime.getUTCDay()]);
      setDate(localDateTimeString.split(",")[0].split("/"));
      const time = localDateTimeString.split(",")[1].slice(0, -2).split(":");
      setSeconds(Number(time[0]) * 60 * 60 + Number(time[1]) * 60 + Number(2));
    }
  }, [stdTime]);

  useEffect(() => {
    let interval;

    if (isTimer) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isTimer && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimer, seconds]);

  useEffect(() => {
    fetch("http://worldtimeapi.org/api/timezone")
      .then((response) => response.json())
      .then((countries) => setCountries(countries));
  }, []);

  useEffect(() => {
    return () => {};
  }, [countryOpt]);

  const navigate = useNavigate();
  const location = useLocation();
  const { userDetails, target } = location.state;
  const currentUser = userDetails.find((user) => user.id === Number(target));
  const startTimer = () => {
    setIsTimer(true);
  };

  const stopTimer = () => {
    setIsTimer(false);
  };
  return (
    <div
      style={{
        position: "relative",
        display: "grid",
        gridTemplateRows: "10% 80% 60%",
        gridRowGap: "20px",
      }}
    >
      <div
        style={{
          padding: "15px 15px 15px 15px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Back
          </button>
        </div>

        <div>
          <select
            style={{ alignItemsq: "centre" }}
            onChange={(event) => {
              setCountryOpt(event.target.value);
              fetch(
                `http://worldtimeapi.org/api/timezone/${event.target.value}`
              )
                .then((response) => response.json())
                .then((time) => {
                  setStdTime(time);
                });
            }}
          >
            <option value="none">Select Country</option>
            {countries.map((country, index) => {
              return (
                <option key={index} value={country}>
                  {country}
                </option>
              );
            })}
          </select>
        </div>
        <div
          style={{
            backgroundColor: "black",
            width: "150px",
            height: "50px",
            display: "grid",
            gridTemplateRow: "auto auto",
            gridRowGap: "5px",
            padding: "15px 5px 5px 5px",
            borderRadius: "5px",
          }}
        >
          <div
            style={{ color: "white", fontSize: "10px" }}
          >{`${date[2]}-${date[1]}-${date[0]} ${day}`}</div>
          <div style={{ color: "white", fontSize: "25px" }}>{`${Math.floor(
            seconds / 3600
          )} : ${Math.floor((seconds % 3600) / 60)} : ${seconds % 60} `}</div>
        </div>
        <div>
          {" "}
          {isTimer && <button onClick={stopTimer}>Stop</button>}
          {!isTimer && seconds > 0 && (
            <button onClick={startTimer}>Resume</button>
          )}
        </div>
      </div>
      <div>
        <div
          style={{
            position: "relative",
            alignContent: "center",
            padding: "15px 15px 15px 15px",
          }}
        >
          <div style={{ padding: "15px 15px 15px 15px" }}>
            <b>Profile Page</b>
          </div>
          <Card
            selevation={3}
            style={{ cursor: "pointer" }}
            sx={{ minWidth: 100, minHeight: 120 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "20px",
                padding: "25px 25px 25px 25px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <b>Name</b>
                  {` : ${currentUser.name} `}
                </div>
                <div style={{ width: "15%", wordBreak: "break-all" }}>
                  <b>Address </b>
                  {`: ${currentUser.address.suite} , ${currentUser.address.street},  ${currentUser.address.city} ,  ${currentUser.address.zipcode} `}{" "}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ width: "15%", wordBreak: "break-all" }}>
                  <b>Username | Catch phrase</b>
                  {` : ${currentUser.username} | ${currentUser.company.catchPhrase} `}{" "}
                </div>
                <div style={{ width: "15%", wordBreak: "break-all" }}>
                  <b>Email | Phone </b>
                  {`: ${currentUser.email} | ${currentUser.phone}`}{" "}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div
        style={{
          padding: "0px 15px 0px 15px",
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          gridColumnGap: "5%",
        }}
      >
        {currentUser.posts.slice(0, 3).map((post, index) => {
          return (
            <Card key={index}>
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: "auto auto",
                  gridRowGap: "20px",
                  padding: "20px 20px 20px 20px",
                }}
              >
                <div>
                  <b>{post.title}</b>
                </div>
                <div>{post.body}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
