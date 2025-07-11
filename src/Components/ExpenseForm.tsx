import React, { useState } from "react";
import type { ExpenseNode } from "../types/types";
import { Category } from '../types/types';

const INITIAL_EXPENSE: ExpenseNode = {
    id: "",
    name: "",
    amount: 0,
    category: Category.None
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
            [name]: name === "amount" ? Number(value) : value
        }));
    }

    function handleSubmit(e: React.FormEvent): void | null {
        e.preventDefault();
        if (!expense.amount) return null;
        addExpense(expense)
        setExpense(INITIAL_EXPENSE)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Expense Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={expense.name}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="amount">Amount:</label>
            <input
                type="number"
                id="amount"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="category">Category:</label>
            <select
                id="category"
                name="category"
                value={expense.category}
                onChange={handleChange}
            >
                <option value={Category.None}>Choose Category</option>
                <option value={Category.Food}>Food</option>
                <option value={Category.Bill}>Bill</option>
            </select>
            <br />
            <button type="submit">Add</button>
        </form>
    )
}

export default ExpenseForm;