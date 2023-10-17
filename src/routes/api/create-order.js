import pool from "$lib/utils/pool";

export const post = async ({request})=>{

    let patient = await request.json()
    const getPid = await pool.query(`select nextval('registry.pat_seq')`)
    const getOid = await pool.query(`select nextval('registry.ordr_seq')`)
    const patientId = getPid.rows[0].nextval
    const orderId = getPid.rows[0].nextval
    const results = await pool.query(`insert into registry.patient(id,names,surname,date_of_birth, sex,passport,nic,created_by)values ('${patientId}','${patient.name}', '${patient.surname}','${patient.dob}'::date,'${patient.sex}','${patient.passport}','${patient.nic}','registrar' ) `)
    const orders = await pool.query(`insert into registry."order"(patient,id,labno,site, ward,program,requester,request_time,created_by)values ('${patientId}','${orderId}', '${patient.order.labno}','${patient.order.site.id}','${patient.order.ward.id}','${patient.order.program}','${patient.order.requester.id}','${patient.request_time}','registrar') `)
    
    let sampleQuery = patient.samples.map((element )=>
    `('${element.labno}','${String(element.condition == '' ? '' : element.condition.map(values=>values.value))}','${element.collection_date}'::timestamp,'${element.collector}','${String(element.tests.map(values=>values.value))}','${orderId}','registrar','${element.sample_type}') `
    )

    let ress = await  pool.query(`INSERT INTO registry.samples(labno,condition, collection_date , collector, tests , order_id,created_by,sample_type) VALUES ${sampleQuery}  `)
   
    return {
    status:200
    }    
}
