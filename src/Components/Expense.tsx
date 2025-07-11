import { useState } from "react";
import type { ExpenseNode } from "../types/types"
import { Category } from "../types/types";

interface ExpenseProps {
    expense: ExpenseNode;
    updateExpense(Editedxpesnse: ExpenseNode): void;
    deleteExpense(id: string): void;
}

function Expense({ expense, updateExpense: updateExpesne, deleteExpense }: ExpenseProps) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editedExpesne, setEditedExpense] = useState<ExpenseNode>(expense);

    function handleEdit() {
        setEditMode(!editMode);
        setEditedExpense(expense)
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setEditedExpense(prev => ({
            ...prev,
            [name]: name === "amount" ? Number(value) : value
        }));
    }

    function handleSave() {
        updateExpesne(editedExpesne)
        setEditMode(false);
    }

    function handleDelete() {
        deleteExpense(expense.id);
    }

    return (
        <tr>
            {editMode ? (
                // edit mode is true
                <>
                    <td><input
                        type="text"
                        id="name"
                        name="name"
                        value={editedExpesne.name}
                        onChange={handleChange}
                    /></td>
                    <td><input
                        type="number"
                        id="amount"
                        name="amount"
                        value={editedExpesne.amount}
                        onChange={handleChange}
                    /></td>
                    <td><select
                        id="category"
                        name="category"
                        value={editedExpesne.category}
                        onChange={handleChange}
                    >
                        <option value={Category.None}>Choose Category</option>
                        <option value={Category.Food}>Food</option>
                        <option value={Category.Bill}>Bill</option>
                    </select>
                    </td>
                    <td><button onClick={handleEdit}>Cancel</button></td>
                    <td><button onClick={handleSave}>Save</button></td>
                </>
            ) : (
                // edit mode is false
                <>
                    <td>{expense.name}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.category}</td>
                    <td><button onClick={handleEdit}>Edit</button></td>
                    <td><button onClick={handleDelete}>Delete</button></td>
                </>
            )}
        </tr>
    )
}

export default Expense