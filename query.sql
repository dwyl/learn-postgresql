-- Sample Query you can run once your DB has data in it:
SELECT
 next_page,
 COUNT (next_page) AS c
FROM
 logs
WHERE next_page IS NOT null
AND next_page NOT IN (
    SELECT path
    FROM logs
    WHERE path IS NOT NULL
)
GROUP BY
 next_page
ORDER BY
 c ASC
LIMIT 1;
