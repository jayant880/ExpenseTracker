import type { ExpenseNode } from "../types/types";
import Expense from "./Expense";

interface ViewExpenseProps {
    expenseList: ExpenseNode[];
    updateExpesne(Editedxpesnse: ExpenseNode): void;
    deleteExpense(id: string): void;
}

function ViewExpenses({ expenseList, updateExpesne, deleteExpense }: ViewExpenseProps) {
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
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {expenseList.map((expense: ExpenseNode) => (
                    <Expense key={expense.id} expense={expense} updateExpesne={updateExpesne} deleteExpense={deleteExpense} />
                ))}
            </tbody>
        </table>
    );
}

export default ViewExpenses;