import React from 'react';
import { Layout, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import './PaymentPageHeader.scss'

const { Header } = Layout;

const PaymentPageHeader = () => {

    return (
        <Header className="payment-page-header">
            <Row justify="space-between" align="middle">
                {/* Left side: Logo and Company Name */}
                <Col>
                    <div className="logo">Your Logo</div>
                    <div className="company-name">Your Company Name</div>
                </Col>

                {/* Right side: Sign In and Contact Us */}
                <Col>
                    <Button type="link" >
                        Sign In
                    </Button>
                    <Link to="/contact-us">
                        <Button type="link">Contact Us</Button>
                    </Link>
                </Col>
            </Row>
        </Header>
    );
};

export default PaymentPageHeader;
