import {
  Avatar,
  Button,
  ChakraProvider,
  Input,
  Skeleton,
  Spinner,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { userContext } from "../userContext";
import { url } from "../url";
const SideBar = ({ addFriendHandler }) => {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setsearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);

  function getuser(e) {
    setsearch(e.target.value);
    setloading(true);
    fetch(url + "/user/?search=" + e.target.value, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setloading(false);
        console.log(res);
        setData(res);
      });
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "10px",
        }}
      >
        <h2>Friends</h2>
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            padding: "8px",
            borderRadius:'30px',
            boxShadow: "  rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
          onClick={onOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="16"
            height="11"
            viewBox="0 0 50 50"
          >
            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
          </svg>
          <p className="font-semibold">Add Friend</p>
        </button>
      </div>
      <ChakraProvider>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Search User</DrawerHeader>
            <DrawerBody>
              <div className="">
                <Input
                  placeholder="search user with name/email"
                  value={search}
                  onChange={(e) => getuser(e)}
                  fontSize="14px"
                />
              </div>
              <div>
                {loading && (
                  <Stack>
                    <Skeleton height="30px"></Skeleton>
                    <Skeleton height="30px"></Skeleton>
                    <Skeleton height="30px"></Skeleton>8{" "}
                    <Skeleton height="30px"></Skeleton>
                    <Skeleton height="30px"></Skeleton>
                  </Stack>
                )}{" "}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginTop: "10px",
                  }}
                >
                  {!loading &&
                    data.length > 0 &&
                    data.map((el) => (
                      <div
                        key={el._id}
                        onClick={() => addFriendHandler(el._id, el, onClose)}
                        style={{
                          backgroundColor: "wheat",
                          padding: "7px 20px ",
                          borderRadius: "30px",
                          width: "100%",
                          cursor: "pointer",
                        }}
                      >
                        {" "}
                        <p>
                          Name:
                          <span
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            {" "}
                            {el.name}
                          </span>
                        </p>
                        <p>
                          Email:
                          <span
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            {el.email}
                          </span>
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </ChakraProvider>
    </div>
  );
};

export default SideBar;
