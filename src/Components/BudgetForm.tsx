import React, { useState } from 'react';
import type { Budget } from '../types/types';

interface BudgetProps {
    addBudget: (budget: Budget) => void;
}

const INTIAL_BUDGET: Budget = {
    amount: 0,
}

function BudgetForm({ addBudget }: BudgetProps) {
    const [budget, setBudget] = useState<Budget>(INTIAL_BUDGET);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        addBudget(budget);
        setBudget(INTIAL_BUDGET);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setBudget({ ...budget, [name]: Number(value) })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="amount">Set Budget</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={budget.amount}
                    onChange={handleChange}
                />
                <button type='submit'>Set This month Budget</button>
            </form>
        </>
    )
}

export default BudgetForm