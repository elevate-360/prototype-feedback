import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import * as formik from 'formik';
import * as yup from 'yup';

function FeedbackForm() {
    const [validated, setValidated] = useState(false);
    const { Formik } = formik;

    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        username: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        zip: yup.string().required(),
        terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
    });

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <Formik
            validationSchema={schema}
            validated={validated}
            onSubmit={handleSubmit}>
            <Row>
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="First Name"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                        />
                    </FloatingLabel>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Last Name"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last name"
                        />
                    </FloatingLabel>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="email"
                            placeholder="Email"
                        />
                    </FloatingLabel>
                    <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom04">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Last Name"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last name"
                        />
                    </FloatingLabel>
                    <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button variant="outline-dark w-100" type='submit'>Submit Review</Button>
        </Formik>
    );
}

export default FeedbackForm;