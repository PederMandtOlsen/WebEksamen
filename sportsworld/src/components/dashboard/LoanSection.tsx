import { useState } from "react";

interface LoanSectionProps {
    onAddLoan: (amount: number) => Promise<void>;
}

const LoanSection = ({ onAddLoan }: LoanSectionProps) => {
    const [loanAmount, setLoanAmount] = useState("");

    const handleAddLoan = () => {
        const amount = parseInt(loanAmount);
        if (amount > 0) {
            onAddLoan(amount);
            setLoanAmount("");
        }
    };

    return (
        <section>
            <h2>Get Loan from Bank</h2>
            <div>
                <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="Enter amount"
                />
                <button onClick={handleAddLoan}>Add Loan</button>
            </div>
        </section>
    );
};

export default LoanSection;
