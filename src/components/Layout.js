import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import FeedbackForm from './FeedbackForm';

export default function Layout() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <center>
            <Card className={`${windowWidth >= 768 ? 'w-50' : ''}`}>
                <Card.Img variant="top" src="/img/Product Review.jpg" />
                <Card.Body>
                    <FeedbackForm width={windowWidth} />
                </Card.Body>
            </Card>
        </center>
    );
}
