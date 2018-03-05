SELECT * FROM favorite
INNER JOIN users on favorite.whosaved = users.id
WHERE favorite.whosaved = $1