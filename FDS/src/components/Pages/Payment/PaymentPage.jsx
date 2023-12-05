import React, { useState } from 'react';
import {
    Steps, Button, Form, Input, Popconfirm, Divider, Card,
    Radio, Select, InputNumber, notification, message
} from 'antd';
import 'antd/dist/antd.css';
import './PaymentPage.scss'; // You can create a CSS file for styling
import PaymentPageHeader from './PaymentPageHeader';
import { useNavigate } from 'react-router-dom';

const { Step } = Steps;

const PaymentPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate()

    const openNotification = () => {
        notification.success({
            message: 'Annulation réussie',
            description: 'Paiement annulé avec succès.',
        });
    };
    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleCancel = () => {
        // navigate('/studentDashboard')
        openNotification()
        navigate(-1)
    }

    const getRandomvalues = () => {
        // Générer un identifiant de classe aléatoire (par exemple, entre 1 et 10)
        const randomValue = Math.floor(Math.random() * 100) + 1;
        return randomValue;
    };
    const openSuccessfullPaymentNotification = () => {
        notification.success({
            message: 'Paiement réussie',
            description: 'Paiement effectué avec succès.',
        });
    };
    const openUnsuccessfullPaymentNotification = () => {
        notification.error({
            message: 'Echec du paiement',
            description: 'Le paiement a échoué. Verifier les informations fournies et réessayer',
        });
    };

    const confirm = (e) => {
        console.log(e);
        const result = getRandomvalues()
        if (result == 50) {
            openUnsuccessfullPaymentNotification()
        } else {
            openSuccessfullPaymentNotification()
            var payment = 1
            localStorage.setItem('payment', payment)
            navigate(-1)
        }
    };

    const cancel = (e) => {
        console.log(e);
        message.error('Vous avez dit non.');
    };

    // const handleFinish = (values) => {
    //     console.log('Received values:', values);
    //     // Add logic to handle payment submission
    //     const result = getRandomvalues()
    //     if (result == 50) {
    //         openUnsuccessfullPaymentNotification()
    //     } else {
    //         openSuccessfullPaymentNotification()
    //         var payment = 1
    //         localStorage.setItem('payment', payment)
    //         navigate(-1)
    //     }

    // };

    const steps = [
        {
            title: 'Methode de paiement',
            content: (
                <Form name="paymentForm" onFinish={handleNextStep}>
                    <Card title="Choisis une methode de paiement">
                        <Radio.Group>
                            <Radio value="credit">Carte de credit</Radio>
                            <Radio value="visa">Carte Visa</Radio>
                            <Radio value="master">Martercard</Radio>
                        </Radio.Group>
                    </Card>
                </Form>
            ),
        },
        {
            title: 'Informations de la carte',
            content: (
                <Form name="cardInformationForm" layout="vertical">
                    <Form.Item
                        label="Nom du proprietaire"
                        name="cardholderName"
                        rules={[{ required: true, message: 'Entrer le nom du proprietaire de la carte' }]}
                    >
                        <Input placeholder="Nom du proprietaire de la carte" />
                    </Form.Item>
                    <Form.Item
                        label="Numero de la carte"
                        name="cardNumber"
                        rules={[{ required: true, message: 'Entrer le numero de la carte' }]}
                    >
                        <Input placeholder="Numero de la carte" />
                    </Form.Item>

                    <Form.Item
                        label="Date d'expiration "
                        name="expirationDate"
                        rules={[{ required: true, message: "Choisir la date d'expiration" }]}
                    >
                        <Input.Group compact>
                            <Select placeholder="Month">
                                <Option value="01">01</Option>
                                {/* Add more months */}
                            </Select>
                            <Select placeholder="Year">
                                <Option value="2023">2023</Option>
                                {/* Add more years */}
                            </Select>
                        </Input.Group>
                    </Form.Item>

                    <Form.Item
                        label="CVV"
                        name="cvv"
                        rules={[{ required: true, message: 'Enter le CVV' }]}
                    >
                        <Input.Password placeholder="Entrer le CVV" />
                    </Form.Item>

                    {/* <Form.Item
                        label="Montant"
                        name="amount"
                        rules={[{ required: true, message: 'Entrer le montant' }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            placeholder="Entrer le montant"
                        />
                    </Form.Item> */}
                </Form>
            ),
        },
        // {
        //     title: 'Confirmation de paiement',
        //     content: (
        //         <div>
        //             {/* Display a summary of the order for review */}
        //             Informations review
        //         </div>
        //     ),
        // },
    ];

    return (
        <div className="payment-page">
            <PaymentPageHeader />
            <Steps current={currentStep} size="small">
                {steps.map((step) => (
                    <Step key={step.title} title={step.title} />
                ))}
            </Steps>
            <Divider />
            <div className="steps-content">{steps[currentStep].content}</div>
            <Divider />
            <div className="steps-action">
                <Button type='primary' style={{ margin: '0 8px' }} onClick={handleCancel}>
                    Annuler paiement
                </Button>
                {currentStep > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={handlePrevStep}>
                        Precedent
                    </Button>
                )}

                {currentStep < steps.length - 1 && (
                    <Button type="primary" onClick={handleNextStep}>
                        Suivant
                    </Button>
                )}
                {currentStep == steps.length - 1 && (
                    // <Button type="primary" onClick={handleFinish}>
                    //     Confirmer paiement
                    // </Button>
                    <Popconfirm
                        title="Confirmer paiement"
                        description="Voullez vous effectuer ce paiement?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="OUI"
                        cancelText="NON"
                    >
                        <Button type="primary">Confirmer paiement</Button>
                    </Popconfirm>
                )}
            </div>
        </div>
    );
};

export default PaymentPage;


