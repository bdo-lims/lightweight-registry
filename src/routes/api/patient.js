import pool from "$lib/utils/pool";
export const get = async ({url})=>{
    let id = url.searchParams.get('id')
    let nic = url.searchParams.get('nic')
        
        let patient = await pool.query(`select * from registry.patient where nic = '${nic}' `)
    if(patient.rowCount > 0){

    return{
        status:200,
        body: patient.rows[0]
    }
        
    }else{

    return{
        status: 404
    }


    }

        
}
