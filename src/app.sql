/* @name getUser */
SELECT
	id,
	email
FROM
	users
WHERE
	id = :id!;