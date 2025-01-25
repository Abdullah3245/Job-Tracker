import React from 'react';

const MeteorsBackground = () => {
    return (
        <div className="meteors-container">
            {[...Array(20)].map((_, index) => (
                <div key={index} className="meteor"></div>
            ))}
        </div>
    );
};

export default MeteorsBackground;

