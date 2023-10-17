import pool from '$lib/utils/pool'

export async function get({url}){

    // let labnumber = url.searchParams.get('labno')
    let query = pool.query(

`select 
labno,
p.surname ||' ,'|| p.names "name" ,
'' batch_no,
'' well,
tst1.name test ,

case when upper(tst1.name) like '%COVID%' then 1
when upper(tst1.name) like '%SARS%' then 1
when upper(tst1.name) like '%INFLUENZA%' then 2
when upper(tst1.name) like '%DENGUE%' then 3
else null end test_type

,
tst.test test_id,
tst.sample

from registry.order o
join registry.patient p on p.id = o.patient 
join (
select  unnest(string_to_array(tests,',' )) test , order_id ,id sample from registry.samples s 
) tst on tst.order_id = o.id
join  (
select id , name || ' (' ||split_part(description , '(', 2) "name"  from clinlims.test where test_section_id  = 190) tst1 on tst1.id = tst.test::int
order by 1 desc` )
return{
    body:  (await query).rows
}

}