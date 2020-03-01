import React from 'react';
import TitleComponent from './TitleComponent';

const Page404 = () => {
    return (
        <>
            <TitleComponent title="Page not found" />

            <div className="error-page">
                <p>
                    404
                </p>
                <p>
                    Page not found
                </p>
            </div>
        </>
    );
};

export default Page404;