import React from 'react';
import { Layout, Row, Col, Button, Image } from 'antd';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import './PaymentPageHeader.scss'
import logo from '../../../Image/logofds.png'

const { Header } = Layout;

const PaymentPageHeader = () => {

    return (
        <Header className="payment-page-header">
            <Row justify="space-between" align="middle">
                {/* Left side: Logo and Company Name */}
                <Col>
                    <div className='logo-container'>
                        <div className='centered'>
                            <Image
                                className='logo-img' // Ajoutez cette classe pour personnaliser la taille du logo
                                width={100} // Utilisez l'interpolation pour la largeur
                                src={logo}
                                alt='Logo de la Faculte Des Sciences'
                            />
                        </div>
                    </div>
                    <div>FDSpayment</div>
                </Col>

                {/* Right side: Sign In and Contact Us */}
                <Col className='link-col'>
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
