import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function Header() {
    return (
        <center>
            <Card className='w-50'>
                <Card.Img variant="top" src="/img/Product Review.jpg" />
                <Card.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Control placeholder="First name" />
                            </Col>
                            <Col>
                                <Form.Control placeholder="Last name" />
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </center>
    );
}
