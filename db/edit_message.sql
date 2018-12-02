update messages set message = $1 where id = $2;

select * from messages
where id = $2