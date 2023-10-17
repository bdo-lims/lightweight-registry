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
      a7 ,
      test,
      orders::json 
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
                  (id,epi_week,batch_date, plate , a1,a7 ,plate_type ,orders ,test ) 
              values
                ('${batch.batch}','${batch.epiwk}','${batch.date}','${batchString}','${batch.a1}','${batch.a7}','${batch.plateType}' ,'{}','${batch.test}')
           `)
    return{
   status:200
    }
  }
  


export async function put({request}){
    
  let batch = await  request.json();
  let batchString = JSON.stringify(batch)
  

  let addBatch = await pool.query(`
              update 
                  registry.batch
              set
                  epi_week = '${batch.epiwk}',
                  batch_date = '${batch.date}', 
                  plate = '${batchString}' , 
                  a1 = '${batch.a1}',
                  a7 = '${batch.a7}' ,
                  plate_type = '${batch.plateType}' ,
                  test = '${batch.test}'
              where 
                  id = '${batch.batch}'
  `)
  console.log(addBatch.rowCount)
  console.log(batchString)
  return{
 status:200
  }
}
