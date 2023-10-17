import pool from "$lib/utils/pool";

export const get = async ({request})=>{
 
    let getOrders
    
try {
    getOrders = await pool.query(`SELECT ord.labno,
    ord.request_time,
    per.last_name ||', '||per.first_name requester,
    org.name site,
    wrd.name ward,
    ord.created_by 
    FROM registry.order ord
    join clinlims.organization org on org.id::text =  ord.site 
    join clinlims.provider pr on pr.id::text = ord.requester 
    join clinlims.person per on pr.person_id = per.id 
    left join clinlims.organization wrd on wrd.id::text =  ord.ward
    order by ord.labno desc `)
    return{
        body: {order: getOrders.rows, message :''}
    }
} catch (error) {
    console.log('Error occured attempting to query for new orders' , error.message)
    return{
        body: {order: [], message:'error'}
    }   
}
}
