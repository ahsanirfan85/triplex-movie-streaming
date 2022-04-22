
-- Table Rate

CREATE TABLE rate (
id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
  movie_id INT NOT NULL,
  rate INT NOT NULL,
  type VARCHAR NOT NULL
);


-- Alter Table watchlist and Add Created_at and Upated_at columns

ALTER TABLE watchlist
    ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
;


-- Function to set current updated time to columns


CREATE OR REPLACE FUNCTION set_updated_at()
    RETURNS TRIGGER AS
$$
BEGIN
    OLD.updated_at = NOW();
    RETURN OLD;
END;
$$ LANGUAGE 'plpgsql';


-- Create Trigger to updated column updated_at and set current time when upating rows

CREATE TRIGGER set_updated_at
    BEFORE UPDATE
    ON watchlist
    FOR EACH ROW
EXECUTE PROCEDURE set_updated_at();