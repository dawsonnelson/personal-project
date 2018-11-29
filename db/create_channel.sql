insert into channels (channel_name)
values ($1)

returning *;