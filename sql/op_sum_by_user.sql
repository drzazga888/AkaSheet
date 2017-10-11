select
    op.user_id,
    sum(op.part * tr.cost) as kasa
from
    operation op
    join transaction tr on op.transaction_id = tr.id
group by
    op.user_id
;