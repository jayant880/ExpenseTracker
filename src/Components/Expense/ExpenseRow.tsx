import { useState } from "react";
import { type ExpenseNode, Category } from "../../types/index";
import { format } from 'date-fns';

interface ExpenseProps {
    expense: ExpenseNode;
    updateExpense: (editedExpense: ExpenseNode) => void;
    deleteExpense: (id: string) => void;
}

function ExpenseRow({ expense, updateExpense, deleteExpense }: ExpenseProps) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editedExpense, setEditedExpense] = useState<ExpenseNode>(expense);

    function handleEdit() {
        setEditMode(!editMode);
        setEditedExpense(expense);
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
        if (editedExpense.amount <= 0) return;
        updateExpense(editedExpense);
        setEditMode(false);
    }

    function handleDelete() {
        deleteExpense(expense.id);
    }

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50">
            {editMode ? (
                <>
                    <td className="px-4 py-3">
                        <input
                            type="text"
                            name="name"
                            value={editedExpense.name}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                    </td>
                    <td className="px-4 py-3">
                        <input
                            type="number"
                            name="amount"
                            value={editedExpense.amount}
                            onChange={handleChange}
                            min="0.01"
                            step="0.01"
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                    </td>
                    <td className="px-4 py-3">
                        <select
                            name="category"
                            value={editedExpense.category}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                        >
                            <option value={Category.None}>Choose Category</option>
                            <option value={Category.Food}>Food</option>
                            <option value={Category.Bill}>Bill</option>
                            <option value={Category.Entertainment}>Entertainment</option>
                            <option value={Category.Transport}>Transport</option>
                            <option value={Category.Shopping}>Shopping</option>
                            <option value={Category.Health}>Health</option>
                        </select>
                    </td>
                    <td className="px-4 py-3">
                        <input
                            type="date"
                            name="date"
                            value={format(editedExpense.date, 'yyyy-MM-dd')}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                    </td>
                    <td className="px-4 py-3 space-x-2">
                        <button
                            onClick={handleEdit}
                            className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Save
                        </button>
                    </td>
                </>
            ) : (
                <>
                    <td className="px-4 py-3">{expense.name || "N/A"}</td>
                    <td className="px-4 py-3">${expense.amount.toFixed(2)}</td>
                    <td className="px-4 py-3">{expense.category}</td>
                    <td className="px-4 py-3">{format(expense.date, 'dd-MM-yyyy')}</td>
                    <td className="px-4 py-3 space-x-2">
                        <button
                            onClick={handleEdit}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                        >
                            Delete
                        </button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default ExpenseRow;