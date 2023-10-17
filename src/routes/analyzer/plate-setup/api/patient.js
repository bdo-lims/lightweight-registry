import pool from '$lib/utils/pool'


export async function get({url}){

    let labnumber = url.searchParams.get('labno')
    let query = pool.query(

        `select 
        o.id as order, 
        p.id patient_id, 
        p.surname || ', '|| p.names as patient_name 
        
        from registry.order o
        
        join registry.patient p on p.id = o.patient
        
        where o.labno = '${labnumber}'`
        )
    return{
        body:  (await query).rows
    }

}



