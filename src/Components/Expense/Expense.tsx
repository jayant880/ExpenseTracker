import { useState, useEffect } from "react";

import ExpenseForm from "./ExpenseForm";
import ViewExpenses from "./ExpenseViewer";

import { loadExpenseFromLocalStorage, saveExpensesToLocalStorage } from '../../utils/localStorage';

import type { ExpenseNode } from "../../types/types";

function Expense() {
    const [expenseList, setExpenseList] = useState<ExpenseNode[]>(loadExpenseFromLocalStorage);

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

    useEffect(() => {
        saveExpensesToLocalStorage(expenseList);
    }, [expenseList])

    return (
        <>
            <ExpenseForm addExpense={addExpense} />
            <ViewExpenses expenseList={expenseList} updateExpense={updateExpense} deleteExpense={deleteExpense} />
        </>
    )
}

export default Expense