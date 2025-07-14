import { useEffect, useState } from "react"
import ExpenseForm from "./Components/ExpenseForm"
import ViewExpesnes from "./Components/ViewExpenses";
import { loadFromLocalStorage, saveToLocalStorage } from "./utils/localStorage";
import { type Budget, type ExpenseNode } from "./types/types";
import BudgetForm from "./Components/BudgetForm";
import BudgetViewer from "./Components/BudgetViewer";

function App() {
  const [expenseList, setExpenseList] = useState<ExpenseNode[]>(loadFromLocalStorage);
  const [budget, setBudget] = useState<Budget>({ amount: 0 });

  function addExpense(newExpense: ExpenseNode): void {
    newExpense = { ...newExpense, id: crypto.randomUUID() }
    setExpenseList([...expenseList, newExpense]);
  }

  function updateExpense(editedExpense: ExpenseNode): void {
    const updatedExpenseList = expenseList.map((expense: ExpenseNode) => {
      return editedExpense.id === expense.id ? editedExpense : expense;
    })
    setExpenseList(updatedExpenseList);
  }

  function deleteExpense(id: string): void {
    const updatedExpenseList = expenseList.filter((expense: ExpenseNode) => expense.id !== id);
    setExpenseList(updatedExpenseList);
  }

  function addBudget(newBudget: Budget): void {
    setBudget(newBudget);
  }

  useEffect(() => {
    saveToLocalStorage(expenseList);
  }, [expenseList])

  return (
    <>
      <BudgetForm addBudget={addBudget} />
      <BudgetViewer budget={budget} updateBudget={addBudget} />
      <ExpenseForm addExpense={addExpense} />
      <ViewExpesnes expenseList={expenseList} updateExpense={updateExpense} deleteExpense={deleteExpense} />
    </>
  )
}

export default App
