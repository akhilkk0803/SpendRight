import { createContext, useEffect, useState } from "react";
import { url } from "./url";
export const userContext = createContext({});
export const UserProvider = ({ children }) => {
  const [user, setuser] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [debts, setDebts] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const token = localStorage.getItem("token");
  function getExpenses() {
    fetch(url + "/expense", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err");
      });
  }
  function getTransaction() {
    fetch(url + "/transaction/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTransaction(data);
      })
      .catch((err) => console.log(err));
  }
  async function getuser() {
    setLoading(true);
    const res = await fetch(url + "/user", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    setuser(data);
    console.log(data);
    setLoading(false);
  }
  function getDebts() {
    fetch(url + "/transaction/debt", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDebts(data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getDebts();
  }, [transaction]);
  useEffect(() => {
    if (token) {
      getTransaction();
      getDebts();
      getExpenses();
    }
  }, [user]);
  return (
    <userContext.Provider
      value={{
        transaction,
        debts,
        setTransaction,
        user,
        setuser,
        setExpenses,
        getuser,
        loading,
        expenses,
        getDebts,
        getTransaction,
        getExpenses,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
