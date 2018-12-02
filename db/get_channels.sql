select * 
from channels
inner join users on users.id = channels.users
where channels.id = $1