import { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import ViewExpenses from "./ExpenseViewer";
import { loadExpenseFromLocalStorage, saveExpensesToLocalStorage } from '../../utils/localStorage';
import type { ExpenseNode } from "../../types/types";

interface ExpenseProps {
    setTotalExpense: (totalExpense: number) => void;
}

function Expense({ setTotalExpense }: ExpenseProps) {
    const [expenseList, setExpenseList] = useState<ExpenseNode[]>(loadExpenseFromLocalStorage);

    function addExpense(newExpense: ExpenseNode): void {
        const expenseWithId = { ...newExpense, id: crypto.randomUUID() };
        setExpenseList(prev => [...prev, expenseWithId]);
    }

    function updateExpense(editedExpense: ExpenseNode): void {
        setExpenseList(prev =>
            prev.map(expense =>
                expense.id === editedExpense.id ? editedExpense : expense
            )
        );
    }

    function deleteExpense(id: string): void {
        setExpenseList(prev => prev.filter(expense => expense.id !== id));
    }

    useEffect(() => {
        saveExpensesToLocalStorage(expenseList);
    }, [expenseList])

    return (
        <>
            <ExpenseForm addExpense={addExpense} />
            <ViewExpenses
                expenseList={expenseList}
                updateExpense={updateExpense}
                deleteExpense={deleteExpense}
                setTotalExpense={setTotalExpense}
            />
        </>
    )
}

export default Expense