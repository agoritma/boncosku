import { useState } from 'react';

const TransactionCategory = ({ updateTransactionCategory }) => {
    const [category, setCategory] = useState('income');

    const handleCategoryChange = (newCategory) => {
        updateTransactionCategory(newCategory);
        setCategory(newCategory);
    };

    const renderButton = (cat, label, svgPath, isDisable) => (
        <button
            className={`button button-box flex ${category === cat ? 'selected' : ''}`}
            onClick={() => handleCategoryChange(cat)}
            disabled={isDisable}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d={svgPath} />
            </svg>
            {label}
        </button>
    );

    return (
        <div className="transaction-category flex">
            {renderButton('income', 'Income', 'M384 160c-17.7 0-32-14.3-32-32s14.3-32 32-32l160 0c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-82.7L342.6 374.6c-12.5 12.5-32.8 12.5-45.3 0L192 269.3 54.6 406.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160c12.5-12.5 32.8-12.5 45.3 0L320 306.7 466.7 160 384 160z', false)}
            {renderButton('outcome', 'Expense', 'M384 352c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0c17.7 0 32-14.3 32-32l0-160c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 82.7L342.6 137.4c-12.5-12.5-32.8-12.5-45.3 0L192 242.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0L320 205.3 466.7 352 384 352z', false)}
            {renderButton('investment', 'Investment', 'M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0l32 0c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64l32 0c123.7 0 224 100.3 224 224l0 32 0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160C100.3 320 0 219.7 0 96z', true)}
        </div>
    );
};

export default TransactionCategory;