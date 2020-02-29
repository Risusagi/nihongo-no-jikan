import React from 'react';

const ExamplesTable = (props) => {
    // create row for every example of kanji use
    const rows = props.examples.map((ex, index) => {
        const arr = ex.japanese.replace('）', '').split('（');
        const [example, transcriptionInHiragana] = arr;
        
        return (
            <tr key={index}>
                <td lang="ja-jp">{example}</td>
                <td lang="ja-jp">{transcriptionInHiragana}</td>
                <td>{ex.meaning.english}</td>
            </tr>
        );
    });
    
    return (
        <table className="examples-table">
            <tbody>
                {rows}    
            </tbody>
        </table>
    );
};

export default ExamplesTable;