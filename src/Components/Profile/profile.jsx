import { Card } from "@mui/material";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userDetails, target } = location.state;
  console.log(userDetails, target);
  const currentUser = userDetails.find((user) => user.id === Number(target));
  console.log(currentUser);
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
          alignContent: "space-evenly",
        }}
      >
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
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
            <Card key={index} minHeight={80}>
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
