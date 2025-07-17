import { useEffect, useState } from "react";
import type { BudgetNode } from "../../types/types";

import BudgetForm from "./BudgetForm";
import BudgetViewer from "../Budget/BudgetViewer";
import { loadBudgetFromLocalStorage, saveBudgetToLocalStorage } from "../../utils/localStorage";

interface BudgetProps {
    totalExpense: number;
}

function Budget({ totalExpense }: BudgetProps) {
    const [currentBudget, setCurrentBudget] = useState<BudgetNode>(loadBudgetFromLocalStorage);

    function setBudget(newBudget: BudgetNode): void {
        setCurrentBudget(newBudget);
    }

    useEffect(() => {
        saveBudgetToLocalStorage(currentBudget);
    }, [currentBudget])

    return (
        <>
            <BudgetForm setBudget={setBudget} />
            <BudgetViewer budget={currentBudget} setBudget={setBudget} totalExpense={totalExpense} />
        </>
    )
}

export default Budget