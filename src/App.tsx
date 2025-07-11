import { useState } from "react"
import ExpenseForm from "./Components/ExpenseForm"
import ViewExpesnes from "./Components/ViewExpenses";
import type { Expense } from "./types/types";

function App() {
  const [expenseList, setExpenseList] = useState<Expense[]>([]);

  function addExpense(newExpense: Expense): void {
    setExpenseList([...expenseList, newExpense]);
  }

  return (
    <>
      <ExpenseForm addExpense={addExpense} />
      <ViewExpesnes expenseList={expenseList} />
    </>
  )
}

export default App
