import { useState } from "react"
import ExpenseForm from "./Components/ExpenseForm"
import type { Expense } from "./types/types";

function App() {
  const [expenseList, setExpenseList] = useState<Expense[]>([]);

  function addExpense(newExpense: Expense): void {
    setExpenseList([...expenseList, newExpense]);
  }

  return (
    <>
      <ExpenseForm addExpense={addExpense} />
    </>
  )
}

export default App
