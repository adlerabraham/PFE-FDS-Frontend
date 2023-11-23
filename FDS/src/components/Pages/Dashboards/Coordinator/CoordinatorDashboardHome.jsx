import React from 'react'
import { useGetProgramsQuery } from '../../../../api/ApiEndpoints'
import Program from '../../../Program/Program'

function CoordinatorDashboardHome(props) {
    const { data: programList, isLoading, isError } = useGetProgramsQuery()
    if (!(isError || isLoading)) {
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
            <div>
                Loading ...
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

