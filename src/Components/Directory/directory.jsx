import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

const displayProfile = () => {
  console.log("vishal");
};

const Directory = () => {
  return (
    <div style={{ position: "relative", top: "5vh" }}>
      <div
        style={{
          fontFamily: "sans-serif",
          fontSize: "50px",
          position: "relative",
        }}
      >
        Directory
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((val, ind) => {
          return (
            <div style={{ padding: "15px 15px 15px 15px" }} id={ind}>
              <Card
                elevation={3}
                sx={{ minWidth: 800, minHeight: 60 }}
                onClick={() => {
                  displayProfile();
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "20px 20px 20px 20px",
                  }}
                >
                  <div>{`Name : vishal`}</div>
                  <div>{`Posts : 12`}</div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Directory;
