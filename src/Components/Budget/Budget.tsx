import { useState } from "react";
import type { BudgetNode } from "../../types/types";

import BudgetForm from "./BudgetForm";
import BudgetViewer from "../Budget/BudgetViewer";

function Budget() {
    const [currentBudget, setCurrentBudget] = useState<BudgetNode>({ amount: 0 });

    function setBudget(newBudget: BudgetNode): void {
        setCurrentBudget(newBudget);
    }

    return (
        <>
            <BudgetForm setBudget={setBudget} />
            <BudgetViewer budget={currentBudget} setBudget={setBudget} />
        </>
    )
}

export default Budget