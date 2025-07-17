import { useState } from "react";
import Budget from "./Components/Budget/Budget";
import Expense from "./Components/Expense/Expense";

function App() {
  const [totalExpense, setTotalExpense] = useState<number>(0)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">Expense Tracker</h1>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Budget totalExpense={totalExpense} />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <Expense setTotalExpense={setTotalExpense} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
