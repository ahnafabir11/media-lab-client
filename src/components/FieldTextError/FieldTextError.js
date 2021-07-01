import './FieldTextError.css';
import React from 'react';

const FieldTextError = ({children}) => {
    return (
        <div className="error_text">
            {children}
        </div>
    )
}

export default FieldTextError;