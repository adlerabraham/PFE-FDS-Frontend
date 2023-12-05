import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Divider, notification } from 'antd';
import './CustomCheckbox.scss'
import { useNavigate } from 'react-router-dom';
import { useOrderDocumentMutation } from '../../api/ApiEndpoints';


function CertificateCheckbox(props) {
    const CheckboxGroup = Checkbox.Group;
    const levels = props.levels
    var levelsName = []
    levels.map((level) => (
        levelsName.push(level.level_name)
    ))
    const plainOptions = levelsName
    const [checkedList, setCheckedList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)
    const navigate = useNavigate()
    const [orderDocument] = useOrderDocumentMutation()

    var unitPrice = 0
    var currency = 'GOURDES'
    var isPaymentCompleted
    const checkAll = plainOptions.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

    if (localStorage.getItem('payment')) {
        isPaymentCompleted = localStorage.getItem('payment')
    } else {
        isPaymentCompleted = 0
    }

    const documents = JSON.parse(localStorage.getItem('documents'))
    const index = documents.findIndex((item) =>
        item.name.toLowerCase() === 'attestation'
    )

    //Recuperation du prix
    if (index != -1) {
        const documentPrice = documents[index].document_price
        if (documentPrice.length > 0) {
            unitPrice = documentPrice[0].price
            currency = documentPrice[0].currency
        }
    }

    //Gestion du calcul du prix
    useEffect(() => {
        if (checkedList.length > 0) {
            setTotalPrice(unitPrice * checkedList.length) // calculer le coup total des releves
        } else {
            setTotalPrice(0)
        }
    }, [checkedList])

    const onChange = (list) => {
        setCheckedList(list);
    };
    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? plainOptions : []);
    };

    const openNotification = () => {
        notification.success({
            message: 'Annulation réussie',
            description: "Demande d'attestation annulée avec succès.",
        });
    };

    const handleCancel = () => {
        openNotification()
        navigate('/studentDashboard')
    }

    const handlePayment = () => {
        localStorage.setItem('levelName', checkedList[0])
        navigate('/amazon-payment')
    }

    const openSuccessfullSubmissionNotification = () => {
        notification.success({
            message: 'Soummission réussie',
            description: "Demande d'attestation soumise avec succès.",
        });
    };

    const openUnSuccessfullSubmissionNotification = () => {
        notification.error({
            message: 'Soummission échouée',
            description: 'La soummission de la commande a échoué. Veuillez réesseyer.',
        });
    };

    const handleOrderSubmission = () => {
        const levelIndex = levels.findIndex((item) =>
            item.level_name == localStorage.getItem('levelName')
        )
        if (levelIndex != -1) {
            const documentOrder = {
                order_mail: null,
                document_type: documents[index].id,
                document_aca_year: levels[levelIndex].academic_year,
                level: levels[levelIndex].level
            }
            const orderResult = orderDocument({ documentOrder }).unwrap()
            orderResult.then((result) => {
                localStorage.setItem('order', JSON.stringify(result))
                // isPaymentCompleted = 0
                // localStorage.setItem('payment', isPaymentCompleted)
                openSuccessfullSubmissionNotification()
                navigate("/studentDashboard/certificateReview")
            }).catch(() => {
                openUnSuccessfullSubmissionNotification()
            })
        }

    }
    return (
        <div>
            {isPaymentCompleted == 1 ?
                <div className='checkbox-container'>
                    <div className='checkbox-line'>
                        <Checkbox indeterminate={indeterminate}
                            onChange={onCheckAllChange} checked={checkAll} disabled>
                            Cocher tout
                        </Checkbox>
                    </div>
                    <div className='checkbox-line'>
                        <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} disabled />
                    </div>
                </div>
                :
                <div className='checkbox-container'>
                    <div className='checkbox-line'>
                        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                            Cocher tout
                        </Checkbox>
                    </div>
                    <div className='checkbox-line'>
                        <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
                    </div>
                </div>
            }

            <div className='price'>
                <p>Prix total: {totalPrice} {currency} </p>
            </div>
            {isPaymentCompleted == 1 ?
                <div className='action-container'>
                    <Button onClick={handleOrderSubmission}>Soumettre</Button>
                </div>
                :
                <div className='action-container'>
                    <Button onClick={handleCancel}>Annuler</Button>
                    {checkedList.length > 0 ?
                        <Button onClick={handlePayment}>Payer</Button>
                        :
                        <Button onClick={handlePayment} disabled>Payer</Button>
                    }

                </div>
            }

        </div>

    );
};
export default CertificateCheckbox;