import React, { useState, useEffect, useRef } from 'react';

const ListItemWrapper = ({ items }) => {
    const [wrappedItems, setWrappedItems] = useState([]);
    const [remainingItems, setRemainingItems] = useState([]);
    const [showRemaining, setShowRemaining] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const updateItems = () => {
            const containerWidth = containerRef.current.clientWidth;
            let currentWidth = 0;
            let wrappedItems = [];
            let remainingItems = [];

            items.forEach(item => {
                const listItemWidth = 100; // Assuming each li item has a fixed width
                if (currentWidth + listItemWidth > containerWidth) {
                    remainingItems.push(item);
                } else {
                    wrappedItems.push(item);
                    currentWidth += listItemWidth;
                }
            });

            setWrappedItems(wrappedItems);
            setRemainingItems(remainingItems);
        };

        updateItems();

        window.addEventListener('resize', updateItems);
        return () => {
            window.removeEventListener('resize', updateItems);
        };
    }, [items]);

    const handleShowMore = () => {
        setShowRemaining(true);
    };

    return (
        <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
            <div ref={containerRef} style={{ overflow: 'hidden' }}>
                <ul style={{ display: 'flex', padding: 0, margin: 0 }}>
                    {wrappedItems.map((item, index) => (
                        <li key={index} style={{ whiteSpace: 'nowrap', listStyle: 'none' }}>
                            {item}
                        </li>
                    ))}
                    {showRemaining && (
                        <li style={{ listStyle: 'none' }}>
                            <ul style={{ display: 'flex', flexDirection: 'column', padding: 0, margin: 0 }}>
                                {remainingItems.map((item, index) => (
                                    <li key={index} style={{ whiteSpace: 'nowrap', listStyle: 'none' }}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )}
                </ul>
            </div>
            {!showRemaining && remainingItems.length > 0 && (
                <button onClick={handleShowMore}>
                    Show more {remainingItems.length} items
                </button>
            )}
        </div>
    );
};


export default ListItemWrapper;
