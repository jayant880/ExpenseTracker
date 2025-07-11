import type { ExpenseNode } from "../types/types";

interface ViewExpenseProps {
    expenseList: ExpenseNode[];
}

function ViewExpenses({ expenseList }: ViewExpenseProps) {
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
                </tr>
            </thead>
            <tbody>
                {expenseList.map((expense: ExpenseNode, index: number) => (
                    <tr key={index}>
                        <td>{expense.name}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.category}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ViewExpenses;