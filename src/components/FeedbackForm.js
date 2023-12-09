import { useState, useEffect } from 'react';
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from 'axios';

function FeedbackForm(props) {

    const [validated, setValidated] = useState(false);
    const [design, setDesign] = React.useState();
    const [valueForMoney, setValue] = React.useState();
    const [strap, setStrap] = React.useState();
    const [buckle, setBuckle] = React.useState();
    const [durability, setDurability] = React.useState();
    const [functionality, setFunction] = React.useState();
    const [support, setSupport] = React.useState();
    const [comfort, setComfort] = React.useState();
    const [designError, setDesignError] = React.useState();
    const [valueForMoneyError, setValueError] = React.useState();
    const [strapError, setStrapError] = React.useState();
    const [buckleError, setBuckleError] = React.useState();
    const [durabilityError, setDurabilityError] = React.useState();
    const [functionalityError, setFunctionError] = React.useState();
    const [supportError, setSupportError] = React.useState();
    const [comfortError, setComfortError] = React.useState();
    const [orderData, setOrder] = React.useState({});
    const [review, setReview] = React.useState();
    const [orderError, setError] = React.useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!design) {
            setDesignError(true);
        } else {
            setDesignError(false)
        }
        if (!valueForMoney) {
            setValueError(true);
        } else {
            setValueError(false)
        }
        if (!strap) {
            setStrapError(true);
        } else {
            setStrapError(false)
        }
        if (!buckle) {
            setBuckleError(true);
        } else {
            setBuckleError(false)
        }
        if (!durability) {
            setDurabilityError(true);
        } else {
            setDurabilityError(false)
        }
        if (!functionality) {
            setFunctionError(true);
        } else {
            setFunctionError(false)
        }
        if (!support) {
            setSupportError(true);
        } else {
            setSupportError(false)
        }
        if (!comfort) {
            setComfortError(true);
        } else {
            setComfortError(false)
        }

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        axios.post('http://feedback.in/api/saveReview', {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            phone: formData.phone,
            sku: orderData.sku,
            design: design,
            valueForMoney: valueForMoney,
            strap: strap,
            buckle: buckle,
            durability: durability,
            functionality: functionality,
            support: support,
            comfort: comfort,
            review: review
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.type) {
                    toast.success('Thank you! Your valuable review is successfully stored', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    setDesign(null);
                    setValue(null);
                    setStrap(null);
                    setBuckle(null);
                    setDurability(null);
                    setFunction(null);
                    setSupport(null);
                    setComfort(null);
                    setReview('');
                    setFormData({
                        firstname: '',
                        lastname: '',
                        email: '',
                        phone: '',
                    });
                    setValidated(false);
                }
            }).catch((error) => {
                console.log(error);
            });

    };

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleInputReview = (e) => {
        const { name, value } = e.target;
        setReview(() => (value));
    }

    useEffect(() => {
        // Check if all textboxes are filled
        if (Object.values(formData).every((value) => value.trim() !== '')) {
            if (formData.phone.length == 10) {
                axios.post('http://feedback.in/api/getOrder', formData)
                    .then((response) => {
                        if (response.data.type == "success") {
                            setOrder(response.data.data);
                            setError(false);
                            console.log(orderData);
                            if (orderData.days > 45) {
                                toast.error('Your feedback timeline is breached!', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                });
                            }
                        } else {
                            setError(true);
                            toast.error('Order not Found! Please enter registered mobile number only', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                            });
                        }
                    })
                    .catch((error) => {
                        console.error('API error:', error);
                    });
            }
        }
    }, [formData]);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Form
                noValidate
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
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleInputChange}
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
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleInputChange}
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
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </FloatingLabel>
                        <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom04">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Contact Number"
                            className="mb-3"
                        >
                            <Form.Control
                                required
                                type="text"
                                placeholder="Contact Number"
                                maxLength={10}
                                minLength={10}
                                pattern="[0-9]{10}"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </FloatingLabel>
                        <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    {
                        (!orderError) ?
                            <Col xs={12}>
                                <Card style={{ textAlign: "left" }}>
                                    <Row>
                                        <Col xs={(props.width > 768) ? 2 : 12}>
                                            <Image src={"/img/product/" + orderData.sku + ".jpg"} thumbnail />
                                        </Col>
                                        <Col>
                                            <Card.Body>
                                                <Card.Title>{orderData.title}</Card.Title>
                                                <Card.Text>Delivered on : {orderData.deliveredDate}</Card.Text>
                                                <Card.Text style={{ color: 'red', display: (orderData.days > 45) ? "" : "none" }}>* You are out of Time. Your feedback timeline is breached.</Card.Text>
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col> : ""
                    }
                </Row>

                <br />
                <Row style={{ display: (orderError) ? "none" : ((orderData.days <= 45) ? ("") : ("none")) }}>
                    <Col xs={(props.width > 768) ? ((props.width > 1024) ? 3 : 4) : 6}>
                        <Card>
                            <Box sx={{ '& > legend': { mt: 2 } }}>
                                <Typography component="legend">Design</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={design}
                                    onChange={(event, newValue) => {
                                        setDesign(newValue);
                                        setDesignError(false);
                                    }}
                                />
                                <br />
                                {(designError) ? <sup><span style={{ color: 'red' }}>* This review is required</span></sup> : ""}
                            </Box>
                        </Card>
                    </Col>
                    <Col xs={(props.width > 768) ? ((props.width > 1024) ? 3 : 4) : 6}>
                        <Card>
                            <Box sx={{ '& > legend': { mt: 2 } }}>
                                <Typography component="legend">Value For Money</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={valueForMoney}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                        setValueError(false);
                                    }}
                                />
                                <br />
                                {(valueForMoneyError) ? <sup><span style={{ color: 'red' }}>* This review is required</span></sup> : ""}
                            </Box>
                        </Card>
                    </Col>
                    <Col xs={(props.width > 768) ? ((props.width > 1024) ? 3 : 4) : 6}>
                        <Card>
                            <Box sx={{ '& > legend': { mt: 2 } }}>
                                <Typography component="legend">Strap Quality</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={strap}
                                    onChange={(event, newValue) => {
                                        setStrap(newValue);
                                        setStrapError(false);
                                    }}
                                />
                                <br />
                                {(strapError) ? <sup><span style={{ color: 'red' }}>* This review is required</span></sup> : ""}
                            </Box>
                        </Card>
                    </Col>
                    <Col xs={(props.width > 768) ? ((props.width > 1024) ? 3 : 4) : 6}>
                        <Card>
                            <Box sx={{ '& > legend': { mt: 2 } }}>
                                <Typography component="legend">Durability</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={durability}
                                    onChange={(event, newValue) => {
                                        setDurability(newValue);
                                        setDurabilityError(false);
                                    }}
                                />
                                <br />
                                {(durabilityError) ? <sup><span style={{ color: 'red' }}>* This review is required</span></sup> : ""}
                            </Box>
                        </Card>
                    </Col>
                    <Col xs={(props.width > 768) ? ((props.width > 1024) ? 3 : 4) : 6}>
                        <Card>
                            <Box sx={{ '& > legend': { mt: 2 } }}>
                                <Typography component="legend">Buckle Quality</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={buckle}
                                    onChange={(event, newValue) => {
                                        setBuckle(newValue);
                                        setBuckleError(false);
                                    }}
                                />
                                <br />
                                {(buckleError) ? <sup><span style={{ color: 'red' }}>* This review is required</span></sup> : ""}
                            </Box>
                        </Card>
                    </Col>
                    <Col xs={(props.width > 768) ? ((props.width > 1024) ? 3 : 4) : 6}>
                        <Card>
                            <Box sx={{ '& > legend': { mt: 2 } }}>
                                <Typography component="legend">Comfortabilty</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={comfort}
                                    onChange={(event, newValue) => {
                                        setComfort(newValue);
                                        setComfortError(false);
                                    }}
                                />
                                <br />
                                {(comfortError) ? <sup><span style={{ color: 'red' }}>* This review is required</span></sup> : ""}
                            </Box>
                        </Card>
                    </Col>
                    <Col xs={(props.width > 768) ? ((props.width > 1024) ? 3 : 4) : 6}>
                        <Card>
                            <Box sx={{ '& > legend': { mt: 2 } }}>
                                <Typography component="legend">Overall functionality</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={functionality}
                                    onChange={(event, newValue) => {
                                        setFunction(newValue);
                                        setFunctionError(false);
                                    }}
                                />
                                <br />
                                {(functionalityError) ? <sup><span style={{ color: 'red' }}>* This review is required</span></sup> : ""}
                            </Box>
                        </Card>
                    </Col>
                    <Col xs={(props.width > 768) ? ((props.width > 1024) ? 3 : 4) : 6}>
                        <Card>
                            <Box sx={{ '& > legend': { mt: 2 } }}>
                                <Typography component="legend">Support Service</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={support}
                                    onChange={(event, newValue) => {
                                        setSupport(newValue);
                                        setSupportError(false);
                                    }}
                                />
                                <br />
                                {(supportError) ? <sup><span style={{ color: 'red' }}>* This review is required</span></sup> : ""}
                            </Box>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row style={{ display: (orderError) ? "none" : ((orderData.days <= 45) ? ("") : ("none")) }}>
                    <Form.Group as={Col} md="12" controlId="validationCustom05">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Overall Review"
                            className="mb-3"
                        >
                            <Form.Control
                                required
                                as="textarea" rows={6}
                                style={{ height: '100px' }}
                                placeholder="Overall Review"
                                name='review'
                                value={review}
                                onChange={handleInputReview}
                            />
                        </FloatingLabel>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button variant="outline-dark w-100" type='submit' onClick={handleSubmit} style={{ display: ((orderError)) ? "none" : ((orderData.days <= 45) ? ("") : ("none")) }}>Submit Review</Button>
            </Form >
        </>
    );
}

export default FeedbackForm;