import { useState } from "react";
import Budget from "./Components/Budget/Budget";
import Expense from "./Components/Expense/Expense";

function App() {
  const [totalExpense, setTotalExpense] = useState<number>(0)

  return (
    <>
      <Budget totalExpense={totalExpense} />
      <Expense setTotalExpense={setTotalExpense} />
    </>
  )
}

export default App
