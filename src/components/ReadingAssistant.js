import React from 'react';

import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

import FuriganaForm from './FuriganaForm';

const ReadingAssistant = () => {
    return (
        <div>
            <FuriganaForm />

            {/* output div */}
            <div className="output-text">

            </div>
            
        </div>
    );
};

export default ReadingAssistant;