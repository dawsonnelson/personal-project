-- insert into channel_users (user_id, channel_id)
-- values ($1, $2)

insert into channels (channel_name, users)
values ($1, $2)

returning *;
