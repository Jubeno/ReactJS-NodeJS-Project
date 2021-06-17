import React, { useEffect, useState } from 'react';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'

const LoadingBar = ({ status }) => {
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        if (status === 'loading') {
            setShowLoading(true);
        }
        if (status === 'success' || status === 'error') {
            setShowLoading(false);
        }
    }, [status])

    return (
        <Loading show={showLoading} color="red"/>
    );
}

export default LoadingBar;