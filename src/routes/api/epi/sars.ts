import pool from '$lib/utils/pool'

export async function get({url}){

     let sample = url.searchParams.get('samp')
     let test = url.searchParams.get('test')
    let query = pool.query(`select 
                        labno,
                        patient_id,
                        names,
                        surname,
                        sex,
                        to_char(request_time,'YYYY-MM-DD') request_time,
                        p_age,
                        test_id,
                        sample,
                        card,
                        site,
                        ward,
                        epi_id,
                        P,
                        sf,
                        sentinnel ,
                        iso,
                        ili ,
                        sari ,
                        vtm ,
                        amies ,
                        sputum ,
                        hadj_pilgrim ,
                        spilt ,
                        unlabelled ,
                        e_sample,
                        other_sample_type ,
                        process ,
                        symptoms ,
                        other_symptoms ,
                        medical_conditions ,
                        travel_history ,
                        vaccinated ,
                        date_vacc ,
                        results::json ,
                        results_value ,
                        exist,
                        rapid_test,
                        dose,
                        vaccine_type,
                        pcr,
                        "case",
                        n_gene,
                        e_gene
                        from registry.epi_v ev 

                        where sample::int = '${sample}'::int
                        and
                        test_id::int = '${test}'::int
                        `)
return{
    body:  (await query).rows
}

}


export async function post({request}){
    
    let batch = await  request.json();
    let insertQuery = await pool.query(`
    
    INSERT INTO registry.epidata
(id, test_id, sample_id, order_id, rapid_test, dose, vaccine_type,pcr, "case", n_gene, e_gene,results,results_value,"comments" , vaccinated , symptoms)
VALUES(nextval('registry.epi_seq'), '${batch.test_id}', '${batch.sample_id}', '${batch.order_id}', '${batch.rapid_test}'
, '${batch.dose}', '${batch.vaccine_type}', '${batch.pcr}','${batch.case}', '${batch.n_gene}', '${batch.e_gene}', '${JSON.stringify(batch.results)}', '${batch.result_pcr}', '${JSON.stringify(batch.comments)}' 
, ${batch.vaccinated}, '${batch.symptoms}');

    
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
  rapid_test = '${batch.rapid_test}',
  dose ='${batch.dose}',
  vaccine_type ='${batch.vaccine_type}',
  pcr ='${batch.pcr}',
  "case" ='${batch.case}',
  n_gene = '${batch.n_gene}',
  e_gene = '${batch.e_gene}',
  results = '${JSON.stringify(batch.results)}',
  results_value = '${batch.result_pcr}',
  "comments" = '${JSON.stringify(batch.comments)}' ,
  vaccinated = ${batch.vaccinated},
  symptoms = '${batch.symptoms}'

  where id =  '${batch.id}'

    
    `)


return{
status:200

}

}


