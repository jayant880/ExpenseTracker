import React, { useState } from "react";
import { type ExpenseNode, Category } from "../../types/index";
import { format } from "date-fns";

const INITIAL_EXPENSE: ExpenseNode = {
    id: "",
    name: "",
    amount: 0,
    category: Category.None,
    date: new Date(),
};

interface ExpenseFormProps {
    addExpense: (newExpense: ExpenseNode) => void;
}

function ExpenseForm({ addExpense }: ExpenseFormProps) {
    const [expense, setExpense] = useState<ExpenseNode>(INITIAL_EXPENSE);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setExpense(prev => ({
            ...prev,
            [name]: name === "amount" ? Number(value) :
                name === "date" ? new Date(value) : value
        }));
    }

    function handleSubmit(e: React.FormEvent): void {
        e.preventDefault();
        if (!expense.amount || expense.amount <= 0) return;
        addExpense(expense)
        setExpense(INITIAL_EXPENSE)
    }

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="grid grid-col-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Expense Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={expense.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={expense.amount || ''}
                        onChange={handleChange}
                        min="0.01"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
            </div>
            <div className="space-y-1">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
                <select
                    id="category"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value={Category.None}>Choose Category</option>
                    <option value={Category.Food}>Food</option>
                    <option value={Category.Bill}>Bill</option>
                    <option value={Category.Entertainment}>Entertainment</option>
                    <option value={Category.Transport}>Transport</option>
                    <option value={Category.Shopping}>Shopping</option>
                    <option value={Category.Health}>Health</option>
                </select>
                <div className="space-y-1">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={format(expense.date, 'yyyy-MM-dd')}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
            </div>
            <button
                type="submit"
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Add Expense
            </button>
        </form>
    )
}

export default ExpenseForm;