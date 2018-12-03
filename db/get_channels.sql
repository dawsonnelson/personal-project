-- select * 
-- from channels
-- inner join users on users.id = channels.users
-- where channels.id = $1


select * from channels where users = $1