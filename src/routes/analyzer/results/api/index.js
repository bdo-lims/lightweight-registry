import pool from '$lib/utils/pool'


export async function get({url}){

  let batchId = url.searchParams.get('batch')
  if(batchId){

    let query = await pool.query(`
    select 
      b.epi_week,
      b.batch_date , 
      b.plate_type, 
      b.a1 ,
      b.a7 ,
      tst.name || ' (' ||split_part(tst.description , '(', 2) "test",
      test test_id,
      b.orders::json 
    from 
      registry.batch b
      left join clinlims.test tst on tst.id::text = b.test::text
    where 
      b.id = '${batchId}'
`)

    let req = await query
    if(req.rowCount == 0){
      return{
        status: 404,
        body: {}  
      }

    }else{

      let returnVal = req.rows[0]


      let getResults = await pool.query(`
      select dd.dict_entry  "name", tr.value  from clinlims.test_result tr

      join
      clinlims.dictionary dd on dd.id = tr.value::int
      
      where dd.is_active = 'Y'
      and 
      tr.is_active = true
      and tr.test_id  = '${returnVal.test_id}'
      order by dd.id asc
`)

      returnVal.results = getResults.rows

      return{
        status:200,
        body:  returnVal    
       }
      
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
                  (id,epi_week,batch_date, plate , a1,a7 ,plate_type ,orders,test  ) 
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
