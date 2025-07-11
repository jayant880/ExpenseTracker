import { useState } from "react"
import ExpenseForm from "./Components/ExpenseForm"
import ViewExpesnes from "./Components/ViewExpenses";
import type { ExpenseNode } from "./types/types";

function App() {
  const [expenseList, setExpenseList] = useState<ExpenseNode[]>([]);

  function addExpense(newExpense: ExpenseNode): void {
    newExpense = { ...newExpense, id: crypto.randomUUID() }
    setExpenseList([...expenseList, newExpense]);
  }

  function updateExpesne(editedExpense: ExpenseNode): void {
    const updatedExpenseList = expenseList.map((expense: ExpenseNode) => {
      return editedExpense.id === expense.id ? editedExpense : expense;
    })
    setExpenseList(updatedExpenseList);
  }

  return (
    <>
      <ExpenseForm addExpense={addExpense} />
      <ViewExpesnes expenseList={expenseList} updateExpesne={updateExpesne} />
    </>
  )
}

export default App
