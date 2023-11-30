import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";

const Directory = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    return () => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((users) => {
          fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((posts) => {
              users.map((user, ind) => {
                user["posts"] = posts.filter((post) => post.userId === user.id);
              });
              setUsers(users);
            });
        });
    };
  }, []);

  const displayProfile = () => {
    console.log("vishal");
  };
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
      <div>
        {users.map((user, ind) => {
          return (
            <div
              key={user.id}
              style={{ padding: "15px 15px 15px 15px" }}
              id={ind}
            >
              <Card
                elevation={3}
                style={{ cursor: "pointer" }}
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
                  <div>{`Name : ${user.name}`}</div>
                  <div>{`Posts :${user.posts.length}`}</div>
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
