import React from 'react'
import { useGetProgramsQuery } from '../../../../api/ApiEndpoints'
import Program from '../../../Program/Program'
import { Spin } from 'antd'
import './CoordinatorDashboard.scss'
import { Outlet, useParams } from 'react-router-dom'

function CoordinatorDashboardHome(props) {
    //const params = useParams()
    const { data: programList, isLoading, isError } = useGetProgramsQuery()
    if (!(isError || isLoading)) {
        // if(params.acaYearId != undefined){
        //     return (
        //         <div>
        //             {
        //                 programList.map((program) => (
        //                     <Program
        //                         key={program.id}
        //                         programId={program.id}
        //                         programName={program.name}
        //                         programAbv={program.sigle} />
        //                 ))
        //             }
        //             <Outlet/>
        //         </div>
        //     )
        // }
        return (
            <div>
                {
                    programList.map((program) => (
                        <Program
                            key={program.id}
                            programId={program.id}
                            programName={program.name}
                            programAbv={program.sigle} />
                    ))
                }
            </div>
        )
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
                Erreur de chargement!
            </div>
        )
    }
}

export default CoordinatorDashboardHome

