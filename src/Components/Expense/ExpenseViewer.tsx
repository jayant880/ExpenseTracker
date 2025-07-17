import { useEffect, useState } from "react";
import type { ExpenseNode } from "../../types/types"
import ExpenseRow from "./ExpenseRow"
import { endOfMonth, endOfWeek, isWithinInterval, startOfMonth, startOfWeek } from "date-fns";

interface ViewExpenseProps {
    expenseList: ExpenseNode[];
    updateExpense: (editedxpesnse: ExpenseNode) => void;
    deleteExpense: (id: string) => void;
    setTotalExpense: (totalExpense: number) => void;
}

function ViewExpenses({ expenseList, updateExpense, deleteExpense, setTotalExpense }: ViewExpenseProps) {
    const [dateFilter, setDateFilter] = useState<"all" | "week" | "month">("all");
    const [total, setTotal] = useState<number>(0)

    const filteredExpensesList = expenseList.filter(expense => {
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

    useEffect(() => {
        const expenseListTotal = filteredExpensesList.reduce((sum, expense) => {
            return sum + Number(expense.amount);
        }, 0);
        setTotal(expenseListTotal);
        setTotalExpense(expenseListTotal)
    }, [filteredExpensesList, setTotalExpense]);

    if (filteredExpensesList.length === 0) return <p>No expenses found</p>

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
                        <th>Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredExpensesList.map((expense: ExpenseNode) => (
                        <ExpenseRow
                            key={expense.id}
                            expense={expense}
                            updateExpense={updateExpense}
                            deleteExpense={deleteExpense}
                        />
                    ))}
                </tbody>
                {total > 0 && (
                    <tfoot>
                        <tr>
                            <td>Total :</td>
                            <td>{total.toFixed(2)}</td>
                            <td> - </td>
                            <td> - </td>
                            <td> - </td>
                            <td> - </td>
                        </tr>
                    </tfoot>
                )}
            </table>
        </div>
    );
}

export default ViewExpenses;