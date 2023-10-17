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
     "comments" , 
     vaccinated , 
     symptoms, 
     amies,
     hadj_pilgrim,
     ili,
     iso,
     date_vacc,
     unlabelled,
     travel_history,
     sputum,
     spilt,
     sf,
     sentinnel,
     sari,
     sample,
     process,
     p,
     other_symptoms,
     other_samp,
     medical_conditions,
     vtm
     
     
     
     )
      
        VALUES
    
    (nextval('registry.epi_seq'), 
    '${batch.test_id}', 
    '${batch.sample_id}', 
    '${batch.order_id}', 
    '${JSON.stringify(batch.results)}', 
    '${batch.result}', 
    '${JSON.stringify(batch.comments)}', 
    ${batch.vaccinated}, 
    '${JSON.stringify(batch.symptoms)}', 
    ${batch.amies}, 
    ${batch.hadj_pilgrim}, 
    ${batch.ili}, 
    ${batch.iso}, 
    '${batch.vaccinated_date}', 
    ${batch.unlabelled}, 
    '${batch.travel_history}', 
    ${batch.sputum}, 
    ${batch.spilt}, 
    '${batch.sf}', 
    ${batch.sentinnel}, 
    ${batch.sari}, 
    ${batch.sample}, 
    ${batch.process}, 
    ${batch.p}, 
    '${batch.other_symptoms}', 
    '${batch.other_samp}', 
    '${batch.medical_conditions}', 
    ${batch.vtm}
    
    );

    
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
  results = '${JSON.stringify(batch.results)}',
  results_value = '${batch.result}',
   "comments" = '${JSON.stringify(batch.comments)}' ,
  symptoms = '${JSON.stringify(batch.symptoms)}',
  vaccinated = ${batch.vaccinated},
  amies = ${batch.amies},
  hadj_pilgrim = ${batch.hadj_pilgrim},
  ili = ${batch.ili},
  iso = ${batch.iso},
  date_vacc = '${batch.vaccinated_date}',
  unlabelled = ${batch.unlabelled},
  travel_history = '${batch.travel_history}',
  sputum = ${batch.sputum},
  spilt = ${batch.spilt},
  sf = ${batch.sf},
  sentinnel = ${batch.sentinnel},
  sari = ${batch.sari},
  sample = ${batch.sample},
  process = ${batch.process},
  p = ${batch.p},
  other_symptoms = '${batch.other_symptoms}',
  other_samp = '${batch.other_samp}',
  medical_conditions = '${batch.medical_conditions}',
  vtm = ${batch.vtm}

  where id =  '${batch.id}'

    
    `)


return{
status:200

}

}


