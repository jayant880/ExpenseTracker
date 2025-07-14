import { useState } from "react";
import type { ExpenseNode } from "../types/types";
import Expense from "./Expense";
import { endOfMonth, endOfWeek, isWithinInterval, startOfMonth, startOfWeek } from "date-fns";

interface ViewExpenseProps {
    expenseList: ExpenseNode[];
    updateExpense(Editedxpesnse: ExpenseNode): void;
    deleteExpense(id: string): void;
}

function ViewExpenses({ expenseList, updateExpense: updateExpense, deleteExpense }: ViewExpenseProps) {
    const [dateFilter, setDateFilter] = useState<"all" | "week" | "month">("all");

    const filteredExpenses = expenseList.filter(expense => {
        const now = new Date();
        if (dateFilter === 'all') return true;
        if (dateFilter === 'week') return isWithinInterval(expense.date, {
            start: startOfWeek(now),
            end: endOfWeek(now)
        });
        if (dateFilter === 'month') return isWithinInterval(expense.date, {
            start: startOfMonth(now),
            end: endOfMonth(now)
        });
        return true;
    })

    if (filteredExpenses.length === 0) return (
        <p>No expenses</p>
    );

    return (
        <div>
            <div>
                <button onClick={() => setDateFilter("all")}>All</button>
                <button onClick={() => setDateFilter("week")}>This Week</button>
                <button onClick={() => setDateFilter("month")}>This Month</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Transaction Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredExpenses.map((expense: ExpenseNode) => (
                        <Expense key={expense.id} expense={expense} updateExpense={updateExpense} deleteExpense={deleteExpense} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewExpenses;