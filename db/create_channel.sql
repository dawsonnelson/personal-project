insert into channels (channel_name, users)
values ($1, $2)

returning *;