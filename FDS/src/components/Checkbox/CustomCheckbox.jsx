import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Divider, notification } from 'antd';
import './CustomCheckbox.scss'
import { useNavigate } from 'react-router-dom';
import { useOrderDocumentMutation } from '../../api/ApiEndpoints';


function CustomCheckbox(props) {
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

    if (localStorage.getItem('transcriptPayment')) {
        isPaymentCompleted = localStorage.getItem('transcriptPayment')
    } else {
        isPaymentCompleted = 0
    }

    if (localStorage.getItem('levelName')) {
        var checkedlevelsName = JSON.parse(localStorage.getItem('levelName'))
    }

    if (localStorage.getItem('transcriptTotalPrice'))
        var totalPriceSet = localStorage.getItem('transcriptTotalPrice')

    const documents = JSON.parse(localStorage.getItem('documents'))
    const index = documents.findIndex((item) =>
        item.name.toLowerCase() === 'releve de notes'
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
            description: 'Demande de relevé de notes annulée avec succès.',
        });
    };

    const handleCancel = () => {
        openNotification()
        navigate('/studentDashboard')
    }

    const handlePayment = () => {
        localStorage.setItem('levelName', JSON.stringify(checkedList))
        localStorage.setItem('transcriptTotalPrice', totalPrice)
        navigate(`/fds-payment/${documents[index].id}`)
    }

    const openSuccessfullSubmissionNotification = () => {
        notification.success({
            message: 'Soummission réussie',
            description: 'Demande de relevé de notes soumise avec succès.',
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
            item.level_name == checkedlevelsName[0]
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
                navigate("/studentDashboard/transcriptReview")
            }).catch(() => {
                openUnSuccessfullSubmissionNotification()
            })
        }

    }
    return (
        <div>
            {isPaymentCompleted == 1 ?
                <div>
                    <p>Niveau(x) choisi(s)</p>
                    <div className='checkbox-container'>
                        <div className='checkbox-line'>
                            <CheckboxGroup options={plainOptions} value={checkedlevelsName} onChange={onChange} disabled />
                        </div>
                    </div>
                    <div className='price'>
                        <p>Prix total: {totalPriceSet} {currency} </p>
                    </div>
                    <div className='action-container'>
                        <Button onClick={handleOrderSubmission}>Soumettre</Button>
                    </div>
                </div>
                :
                <div>
                    <p>Choix de niveau(x)</p>
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
                    <div className='price'>
                        <p>Prix total: {totalPrice} {currency} </p>
                    </div>
                    <div className='action-container'>
                        <Button onClick={handleCancel}>Annuler</Button>
                        {checkedList.length > 0 ?
                            <Button onClick={handlePayment}>Payer</Button>
                            :
                            <Button onClick={handlePayment} disabled>Payer</Button>
                        }

                    </div>
                </div>
            }
        </div>
    );
};
export default CustomCheckbox;