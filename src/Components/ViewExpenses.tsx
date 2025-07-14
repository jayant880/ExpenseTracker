import type { ExpenseNode } from "../types/types";
import Expense from "./Expense";

interface ViewExpenseProps {
    expenseList: ExpenseNode[];
    updateExpense(Editedxpesnse: ExpenseNode): void;
    deleteExpense(id: string): void;
}

function ViewExpenses({ expenseList, updateExpense: updateExpense, deleteExpense }: ViewExpenseProps) {
    if (expenseList.length === 0) return (
        <p>No expenses yet</p>
    );

    return (
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
                {expenseList.map((expense: ExpenseNode) => (
                    <Expense key={expense.id} expense={expense} updateExpense={updateExpense} deleteExpense={deleteExpense} />
                ))}
            </tbody>
        </table>
    );
}

export default ViewExpenses;