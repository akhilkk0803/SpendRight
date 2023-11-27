import "../styles/signup.css"; // Import your CSS file

import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  useToast,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { url } from "../url";
import { userContext } from "../userContext";

const Signup = ({ edit = false }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { setuser, user } = useContext(userContext);
  const [loading, setloading] = useState(false);
  const [name, setname] = useState(undefined);
  const [email, setemail] = useState(undefined);
  const [password, setpassword] = useState(undefined);
  const [show, setshow] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const [confirmpassword, setconfirmpassword] = useState("");
  useEffect(() => {
    if (edit && user) {
      setemail(user.email);
      setname(user.name);
    }
  }, []);
  function submithandler() {
    if (!name || !email) {
      if (!edit && !password) {
        toast({
          title: "Fill all details",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
    }
    if (name.trim().length === 0 || email.trim().length === 0) {
      if (!edit && password.trim().length == 0) {
        toast({
          title: "Fill all details",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
    }
    if (!edit && password != confirmpassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setloading(true);
    const method = edit ? "PUT" : "POST";
    const uri = edit ? "edit" : "signup";
    fetch(url + "/user/" + uri, {
      method: method,
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: edit ? "Bearer " + localStorage.getItem("token") : null,
      },
    })
      .then((res) => {
        if (res.status == 401 || res.status == 500) {
          toast({
            title: "User already exsist with this email",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          return;
        }
        return res.json();
      })
      .then((data) => {
        {
          !edit && localStorage.setItem("token", data.token);
        }
        setuser(data.user);
        navigate("/dashboard");
      })
      .catch((err) => {
        toast({
          title: "An error Occured",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      })
      .finally(() => setloading(false));
  }
  return (
    <div className="signup">
      <div className="box">
        <h4 className="my-0 fw-normal title">
          {!edit ? "SignUp" : "Edit Profile"}
        </h4>
        <ChakraProvider>
          <FormControl isRequired id="name">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setname(e.target.value)}
              value={name}
            />
          </FormControl>
          <FormControl isRequired id="mail">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </FormControl>
          {!edit && (
            <>
              <FormControl isRequired id="pass">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    value={password}
                    type={show ? "text" : "password"}
                    placeholder="Enter your password"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                  <InputRightAddon>
                    <Button size="sm" onClick={() => setshow((prev) => !prev)}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightAddon>
                </InputGroup>
              </FormControl>
              <FormControl isRequired id="confirmpassword">
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    value={confirmpassword}
                    type={confirm ? "text" : "password"}
                    placeholder="Enter your password"
                    onChange={(e) => setconfirmpassword(e.target.value)}
                  />
                  <InputRightAddon>
                    <Button
                      size="sm"
                      onClick={() => setconfirm((prev) => !prev)}
                    >
                      {" "}
                      {confirm ? "Hide" : "Show"}
                    </Button>
                  </InputRightAddon>
                </InputGroup>
              </FormControl>
            </>
          )}
          <Button
            colorScheme="blue"
            onClick={submithandler}
            isLoading={loading}
            w="100%"
            mt={2}
          >
            {!edit ? "Sign Up" : "Save"}
          </Button>
          {!edit && (
            <p>
              <span
                style={{
                  color: "white",
                }}
              >
                {" "}
                Have an Account
              </span>{" "}
              <NavLink to="/login">Login</NavLink>
            </p>
          )}
        </ChakraProvider>
      </div>
    </div>
  );
};

export default Signup;
