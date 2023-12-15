import React from 'react';
import { Spin, Table } from 'antd';
import { useGetOrderStatQuery } from '../../../../api/ApiEndpoints';
import './DirectorDashboard.scss'

function DirectorDashbordHome() {
    const columns = [
        {
            title: "Statistiques des commandes de document",
            dataIndex: "stat",
            children: [
                {
                    title: 'Prenom & Nom',
                    dataIndex: 'name',
                    filters: [],
                    //filterMode: 'tree',
                    filterSearch: true,
                    onFilter: (value, record) => record.name.startsWith(value),
                    // width: '10',
                },
                {
                    title: 'Classe',
                    dataIndex: 'class',
                    filters: [],
                    //filterMode: 'tree',
                    filterSearch: true,
                    onFilter: (value, record) => record.class.startsWith(value),
                    // width: '20%',
                },
                {
                    title: 'Document',
                    dataIndex: 'document',
                    filters: [],
                    //filterMode: 'tree',
                    filterSearch: true,
                    onFilter: (value, record) => record.document.startsWith(value),
                    // width: '20%',
                },
                {
                    title: 'Date',
                    dataIndex: 'date',
                    filters: [],
                    onFilter: (value, record) => record.date.startsWith(value),
                    filterSearch: true,
                    // width: '30%',
                },
                {
                    title: 'En ligne',
                    dataIndex: 'online',
                    filters: [
                        {
                            text: "Oui",
                            value: "Oui"
                        },
                        {
                            text: "Non",
                            value: "Non"
                        }
                    ],
                    onFilter: (value, record) => record.online.startsWith(value),
                    filterSearch: true,
                    // width: '40%',
                },
                {
                    title: 'Annee academique',
                    dataIndex: 'aca',
                    filters: [],
                    onFilter: (value, record) => record.aca.startsWith(value),
                    filterSearch: true,
                    // width: '40%',
                },
            ]
        }
    ];
    const data = []

    const { data: orderStat, isLoading, isError } = useGetOrderStatQuery()

    if (!(isLoading || isError)) {

        for (let index = 0; index < orderStat.length; index++) {
            const order = orderStat[index];
            const online = order.is_online ? "Oui" : "Non"
            const date = order.order_date.split("T")[0]
            data.push({
                name: order.student_name,
                class: order.level_name,
                document: order.document_name,
                date: date,
                online: online,
                aca: order.academic_year_name
            })

            //Set name filters
            const nameFilterIndex = columns[0].children[0].filters.findIndex((filter) =>
                filter.text === order.student_name
            )
            if (nameFilterIndex == -1) {
                columns[0].children[0].filters.push({
                    text: order.student_name,
                    value: order.student_name
                })
            }

            //set class filters
            console.log(columns[0].children[1]);
            const classFilterIndex = columns[0].children[1].filters.findIndex((filter) =>
                filter.text === order.level_name
            )
            if (classFilterIndex == -1) {
                columns[0].children[1].filters.push({
                    text: order.level_name,
                    value: order.level_name
                })
            }

            //Set document filters
            const documentFilterIndex = columns[0].children[2].filters.findIndex((filter) =>
                filter.text === order.document_name
            )
            if (documentFilterIndex == -1) {
                columns[0].children[2].filters.push({
                    text: order.document_name,
                    value: order.document_name
                })
            }

            //Set date filters
            const dateFilterIndex = columns[0].children[3].filters.findIndex((filter) =>
                filter.text === date
            )
            if (dateFilterIndex == -1) {
                columns[0].children[3].filters.push({
                    text: date,
                    value: date
                })
            }

            //Set Acayear filters
            const acaYearFilterIndex = columns[0].children[5].filters.findIndex((filter) =>
                filter.text === order.academic_year_name
            )
            if (acaYearFilterIndex == -1) {
                columns[0].children[5].filters.push({
                    text: order.academic_year_name,
                    value: order.academic_year_name
                })
            }
        }
        return (
            <div className='stat'>
                <Table columns={columns}
                    dataSource={data}
                    bordered
                />
            </div>

        );
    }

    if (isLoading) {
        return (
            <div className='spin'>
                <Spin tip='Chargement ...' size='large' />
            </div>
        )
    }

    if (isError) {
        return (
            <div>
                Erreur de Chargement.
            </div>
        )
    }
}

export default DirectorDashbordHome;

