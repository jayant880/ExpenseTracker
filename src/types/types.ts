export interface ExpenseNode {
    id: string;
    name: string;
    amount: number | "";
    category: Category;
    date: Date;
}

export interface Budget {
    amount: number;
}

export enum Category {
    None = "None",
    Food = "Food",
    Bill = "Bill"
};