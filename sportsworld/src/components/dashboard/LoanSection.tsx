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

    const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoanAmount(e.target.value);
    };

    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">Get Loan from Bank</h2>
            <div className="flex flex-col gap-2">
                <input
                    type="number"
                    value={loanAmount}
                    onChange={handleLoanAmountChange}
                    placeholder="Enter amount"
                    className="p-2"
                />
                <button 
                    onClick={handleAddLoan}
                    className="btn bg-blue-400"
                >
                    Add Loan
                </button>
            </div>
        </div>
    );
};

export default LoanSection;
