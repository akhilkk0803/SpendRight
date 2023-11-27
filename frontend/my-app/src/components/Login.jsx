import React, { useContext, useEffect } from "react";
import "../styles/login.css"; // Import your CSS file
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Button,
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  useToast,
} from "@chakra-ui/react";
import { url } from "../url";
import { userContext } from "../userContext";

const Login = () => {
  const toast = useToast();
  const { setuser, user } = useContext(userContext);
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [show, setshow] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/dashboard");
  }, []);
  function submithandler(e) {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Fill all details",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (email.trim().length === 0 || password.trim().length === 0) {
      toast({
        title: "Fill all details",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setloading(true);
    fetch(url + "/user/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status == 401 || res.status == 500) {
          toast({
            title: "No user exsits with this email",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          return;
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        setuser(data.user);
        setloading(false);
        toast({
          title: "Logged In Successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        navigate("/dashboard");
      })
      .catch((err) => {
        setloading(false);
      });
  }
  return (
    <div className="login">
      <div className="m-auto box">
        <div className="mb-4 rounded-3 shadow-sm">
          <div className="card-header py-3">
            <h4 className="my-0 fw-normal title">Log in</h4>
          </div>
          <div className="card-body">
            <ChakraProvider>
              <FormControl isRequired id="mail">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired id="mail">
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
            </ChakraProvider>

            <ChakraProvider>
              <Button
                colorScheme="blue"
                onClick={submithandler}
                isLoading={loading}
                w="100%"
                mt={2}
              >
                Login
              </Button>
            </ChakraProvider>
            <p className="small">
              Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
