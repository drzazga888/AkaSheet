select
    tr.buyer_id,
    sum(tr.cost) as cost
from
    transaction tr
group by
    tr.buyer_id
;