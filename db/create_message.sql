insert into messages(message, channel_id, user_id)
values($1, $2, $3)
returning *