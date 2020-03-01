import React from 'react';
import Helmet from 'react-helmet';

const TitleComponent = ({ title }) => {
    return (
        <Helmet>
            <title>
                {`Nihongo no jikan${title ? ` - ${title}` : ''}`}
            </title>
        </Helmet>
    );
};

export default TitleComponent;