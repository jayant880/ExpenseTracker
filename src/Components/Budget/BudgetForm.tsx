import React, { useState } from 'react';
import type { Budget } from '../../types/types';

interface BudgetProps {
    setBudget: (budget: Budget) => void;
}

const INTIAL_BUDGET: Budget = {
    amount: 0,
}

function BudgetForm({ setBudget }: BudgetProps) {
    const [newBudget, setNewBudget] = useState<Budget>(INTIAL_BUDGET);

    function handleSubmit(e: React.FormEvent): void {
        e.preventDefault();
        setBudget(newBudget);
        setNewBudget(INTIAL_BUDGET);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        setNewBudget({ ...newBudget, [name]: Number(value) })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="amount">Set Budget</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={newBudget.amount}
                    onChange={handleChange}
                />
                <button type='submit'>Set This month Budget</button>
            </form>
        </>
    )
}

export default BudgetForm