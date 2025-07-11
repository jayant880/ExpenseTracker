import { useEffect, useState } from "react"
import ExpenseForm from "./Components/ExpenseForm"
import ViewExpesnes from "./Components/ViewExpenses";
import { loadFromLocalStorage, saveToLocalStorage } from "./utils/localStorage";
import type { ExpenseNode } from "./types/types";

function App() {
  const [expenseList, setExpenseList] = useState<ExpenseNode[]>(loadFromLocalStorage);

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

  function deleteExpense(id: string): void {
    const updatedExpenseList = expenseList.filter((expense: ExpenseNode) => expense.id !== id);
    setExpenseList(updatedExpenseList);
  }

  useEffect(() => {
    saveToLocalStorage(expenseList);
  }, [expenseList])

  return (
    <>
      <ExpenseForm addExpense={addExpense} />
      <ViewExpesnes expenseList={expenseList} updateExpesne={updateExpesne} deleteExpense={deleteExpense} />
    </>
  )
}

export default App
