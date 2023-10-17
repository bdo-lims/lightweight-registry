

        import pool from '$lib/utils/pool'

        export async function get({url}){

            // let labnumber = url.searchParams.get('labno')
            let query = pool.query(`select 
        (select 
        count(o.*) 
        from registry."order" o 
        where 
        not exists  (
        select null  from registry.batch_results br where br."order"  = o.id
        )) Pending_orders,
        (select 
        count(o.*) 
        from registry."order" o 
        where 
        exists  (
        select null  from registry.batch_results br where br."order"  = o.id and br.status ='draft' 
        )) orders_in_progress,
        (select count(*) from registry."order" o ) total_orders  ,
        (select json_agg(json_build_object('sample_type',descr,'count',cnts))  from  (select 
        distinct 
        tos.description descr ,
        count( s.order_id )  cnts
        from clinlims.clinlims.type_of_sample  tos 
        join (select  unnest(string_to_array(tests,',' )) test , order_id ,sample_type::int sample from registry.samples) s on s.sample = tos.id
        group by 1 order  by 1 ) a ) sample_orders
        ` )
        return{
            body:  (await query).rows
        }

        }