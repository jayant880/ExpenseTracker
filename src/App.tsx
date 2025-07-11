import { useState } from "react"
import ExpenseForm from "./Components/ExpenseForm"
import ViewExpesnes from "./Components/ViewExpenses";
import type { ExpenseNode } from "./types/types";

function App() {
  const [expenseList, setExpenseList] = useState<ExpenseNode[]>([]);

  function addExpense(newExpense: ExpenseNode): void {
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
