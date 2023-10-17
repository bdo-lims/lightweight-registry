import pool from '$lib/utils/pool'


export async function post({request}){
    
    let batch = await  request.json();
    let insertQuery = await pool.query(`
    
    INSERT INTO registry.epidata
(id, 
    test_id, 
    sample_id, 
    order_id, 
    results,
    results_value,
    "comments",
    blood,
    dbs,
    travel)
        
        VALUES(nextval('registry.epi_seq'), 
        '${batch.test_id}', 
        '${batch.sample_id}', 
        '${batch.order_id}',
        '${JSON.stringify(batch.results)}', 
        '${batch.result_pcr}', 
        '${JSON.stringify(batch.comments)}', 
        ${batch.blood}, 
        ${batch.dbs}, 
        ${batch.travel});
    `)


return{
status:200

}

}



export async function put({request}){
    
    let batch = await  request.json();
    let putQuery = await pool.query(`
    
  UPDATE registry.epidata
  set
  test_id = '${batch.test_id}',
  sample_id = '${batch.sample_id}',
  order_id = '${batch.order_id}',
  blood = ${batch.blood},
  travel = ${batch.travel},
  dbs = ${batch.dbs},
  results = '${JSON.stringify(batch.results)}',
  results_value = '${batch.result_pcr}',
  "comments" = '${JSON.stringify(batch.comments)}' 

  where id =  '${batch.id}'

    
    `)


return{
status:200

}

}


