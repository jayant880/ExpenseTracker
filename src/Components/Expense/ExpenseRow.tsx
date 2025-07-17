import { useState } from "react";
import { type ExpenseNode, Category } from "../../types/types";
import { format } from 'date-fns';

interface ExpenseProps {
    expense: ExpenseNode;
    updateExpense: (Editedxpesnse: ExpenseNode) => void;
    deleteExpense: (id: string) => void;
}

function ExpenseRow({ expense, updateExpense, deleteExpense }: ExpenseProps) {
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
            [name]: name === "amount" ? Number(value) :
                name === "date" ? new Date(value) : value
        }));
    }

    function handleSave() {
        if (editedExpesne.amount <= 0) return;
        updateExpense(editedExpesne)
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
                    <td>
                        <input
                            type="text"
                            name="name"
                            value={editedExpesne.name}
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            name="amount"
                            value={editedExpesne.amount}
                            onChange={handleChange}
                            min={"0.01"}
                            step={"0.01"}
                        />
                    </td>
                    <td>
                        <select
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
                    <td>
                        <input
                            type="date"
                            name="date"
                            value={format(editedExpesne.date, 'yyyy-MM-dd')}
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <button onClick={handleEdit}>Cancel</button>
                    </td>
                    <td>
                        <button onClick={handleSave}>Save</button>
                    </td>
                </>
            ) : (
                // edit mode is false
                <>
                    <td>{expense.name || "N/A"}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.category}</td>
                    <td>{format(expense.date, 'dd-MM-yyyy')}</td>
                    <td><button onClick={handleEdit}>Edit</button></td>
                    <td><button onClick={handleDelete}>Delete</button></td>
                </>
            )}
        </tr>
    )
}

export default ExpenseRow