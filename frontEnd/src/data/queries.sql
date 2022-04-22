
-- Find the Average Rating for Movie 634649
SELECT SUM(rate) / COUNT(user_id) AS Average_Rate 
FROM rate 
WHERE movie_id = 634649