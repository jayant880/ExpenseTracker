import React, { useState } from 'react';
import type { BudgetNode } from '../../types/types';

interface BudgetProps {
    setBudget: (budget: BudgetNode) => void;
}

const INTIAL_BUDGET: BudgetNode = {
    amount: 0,
}

function BudgetForm({ setBudget }: BudgetProps) {
    const [newBudget, setNewBudget] = useState<BudgetNode>(INTIAL_BUDGET);

    function handleSubmit(e: React.FormEvent): void {
        e.preventDefault();
        if (newBudget.amount <= 0) return;

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
                    value={newBudget.amount || ''}
                    onChange={handleChange}
                    min="0"
                    step={"0.01"}
                />
                <button type='submit'>Set This Month Budget</button>
            </form>
        </>
    )
}

export default BudgetForm