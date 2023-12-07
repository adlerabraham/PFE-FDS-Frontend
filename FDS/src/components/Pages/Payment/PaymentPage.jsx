import React, { useState } from 'react';
import {
    Steps, Button, Form, Input, Popconfirm, Divider, Card,
    Radio, Select, InputNumber, notification, message, Image
} from 'antd';
import 'antd/dist/antd.css';
import './PaymentPage.scss'; // You can create a CSS file for styling
import PaymentPageHeader from './PaymentPageHeader';
import { useNavigate, useParams } from 'react-router-dom';
import MonthOptions from '../../DatePickup/MonthOptions';
import YearOptions from '../../DatePickup/YearOptions';
import PaymentPageFooter from './PaymentPageFooter';
import paymentCardImageLink from "../../../Image/payment_card.png";

const { Step } = Steps;

const PaymentPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate()
    const params = useParams()

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
        const randomValue = Math.floor(Math.random() * 4) + 1;
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
        if (result == 4) {
            openUnsuccessfullPaymentNotification()
        } else {

            openSuccessfullPaymentNotification()
            if (params.docId == 1) {
                localStorage.setItem('certificatePayment', 1)
            } else if (params.docId == 4) {
                localStorage.setItem('transcriptPayment', 1)
            }

            navigate(-1)
        }
    };

    const cancel = (e) => {
        console.log(e);
        message.error('Vous avez dit non.');
    };

    const steps = [
        {
            title: 'Methode de paiement',
            content: (
                <div className='first-step'>
                    <Form name="paymentForm" onFinish={handleNextStep}>
                        <Card title="Choisis une methode de paiement">
                            <Radio.Group>
                                <Radio value="credit">Carte de credit</Radio>
                                <Radio value="visa">Carte Visa</Radio>
                                <Radio value="master">Martercard</Radio>
                            </Radio.Group>
                        </Card>
                    </Form>
                    <div className='card-image'>
                        <Image
                            width={200}
                            src={paymentCardImageLink}
                            alt='Image de carte de paiement'
                        />
                    </div>
                </div>
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
                            <MonthOptions />
                            <YearOptions />
                        </Input.Group>
                    </Form.Item>

                    <Form.Item
                        label="CVV"
                        name="cvv"
                        rules={[{ required: true, message: 'Enter le CVV' }]}
                    >
                        <Input.Password placeholder="Entrer le CVV" />
                    </Form.Item>
                </Form>
            ),
        },
    ];

    return (
        <div className="payment-page">
            <PaymentPageHeader />
            <Steps className="steps" current={currentStep} size="small">
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
                    <Button type="primary" style={{ margin: '0 8px' }} onClick={handleNextStep}>
                        Suivant
                    </Button>
                )}
                {currentStep == steps.length - 1 && (
                    <Popconfirm
                        title="Confirmer paiement"
                        description="Voullez vous effectuer ce paiement?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="OUI"
                        cancelText="NON">
                        <Button type="primary" style={{ margin: '0 8px' }}>
                            Confirmer paiement
                        </Button>
                    </Popconfirm>
                )}
            </div>
            <PaymentPageFooter />
        </div>
    );
};

export default PaymentPage;


