import React, { useContext, useEffect, useState } from "react";
import { url } from "../url";
import { userContext } from "../userContext";
import SingleExpense from "./SingleExpense";
const Expenses = () => {
  const { expenses } = useContext(userContext);

  return (
    <div>
      {expenses.map((el) => (
        <SingleExpense el={el} key={el._id} />
      ))}
    </div>
  );
};

export default Expenses;
