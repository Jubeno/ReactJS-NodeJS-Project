import React from 'react';

const ErrorLog = (props) => {
    const { error } = props;

    return (
        <span 
            style={{
                color: 'red'
            }}
        >
            {error}
        </span>
    );
}

export default ErrorLog;