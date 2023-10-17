import pool from '$lib/utils/pool'


export async function get({url}){

  let batchId = url.searchParams.get('batch')
  if(batchId){

    let query = await pool.query(`
    select 
      epi_week,
      batch_date , 
      --plate::json,
      plate_type, 
      a1 ,
      a7  
    from 
      registry.batch 
    where 
      id = '${batchId}'
`)

    let req = await query
    if(req.rowCount == 0){
      return{
        status: 404,
        body: {}  
      }

    }else{

      return{
        status:200,
        body:  req.rows[0]      }
      
    }








  }else
   {
  let query = await pool.query(`select nextval('registry.batch_seq'::regclass) id`)
  return{
    body: await query.rows[0]
  }}
}



export async function post({request}){
    
    let batch = await  request.json();
    let batchString = JSON.stringify(batch)
    let addBatch = await pool.query(`
            insert into 
                registry.batch 
                  (id,epi_week,batch_date, plate , a1,a7 ,plate_type  ) 
              values
                ('${batch.batch}','${batch.epiwk}','${batch.date}','${batchString}','${batch.a1}','${batch.a7}','${batch.plateType}')
           `)
    return{
   status:200
    }
  }
  


export async function put({request , url}){
    
  let id =  url.searchParams.get('batch')
  let batch = await  request.json();
  let batchString = JSON.stringify(batch)
  

  let addBatch = await pool.query(`
              update 
                  registry.batch
              set
                  orders = '${batchString}'
              where 
                  id = '${id}'
  `)
  console.log(addBatch.rowCount == 1 ? 'order mapping saved': 'order map not saved')
  return{
 status:200
  }
}
