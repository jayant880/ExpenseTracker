import { render, screen } from '@testing-library/react'
import ExpenseForm from '../../Components/ExpenseForm'

describe('group', () => {
    it('should', () => {
        render(<ExpenseForm />);
        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(/ExpenseForm/i);
    })
})

