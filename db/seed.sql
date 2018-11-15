create table users (
    id serial Primary key,
    auth0_id varchar(200),
    user_image varchar(200),
    username varchar(200),

)

create table messages (
    id serial Primary key,
    message varchar(200),
    user_id int,
    channel_id int,
    friend_id int
)

create table channels (
    id serial primary key,
    channel_name varchar(200),
    channel_image varchar(200)
)

create table server (
    id serial primary key,
    user_id int,
    channel_id int
)

create table friends (
    id serial primary key,
    user_id int, 
    friend_id int
)