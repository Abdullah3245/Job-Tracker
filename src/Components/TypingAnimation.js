import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ text }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            if (index < text.length) {
                setDisplayText((prev) => prev + text.charAt(index));
                index++;
            } else {
                clearInterval(intervalId);
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, [text]);

    return <p className="subtitle typing-animation">{displayText}</p>;
};

export default TypingAnimation;

