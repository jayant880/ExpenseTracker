import { useEffect, useState } from "react";
import type { BudgetNode } from "../../types/index";
import BudgetForm from "./BudgetForm";
import BudgetViewer from "../Budget/BudgetViewer";
import { loadBudgetFromLocalStorage, saveBudgetToLocalStorage } from "../../utils/localStorage";

const Budget: React.FC<{ totalExpense: number }> = ({ totalExpense }) => {
    const [currentBudget, setCurrentBudget] = useState<BudgetNode>(loadBudgetFromLocalStorage);

    function setBudget(newBudget: BudgetNode): void {
        setCurrentBudget(newBudget);
    }

    useEffect(() => {
        saveBudgetToLocalStorage(currentBudget);
    }, [currentBudget])

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Budget Management</h2>
            <BudgetForm setBudget={setBudget} />
            <BudgetViewer budget={currentBudget} setBudget={setBudget} totalExpense={totalExpense} />
        </div>
    )
}

export default Budget