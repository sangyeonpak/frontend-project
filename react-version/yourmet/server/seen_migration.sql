DROP TABLE IF EXISTS seen;

CREATE TABLE seen (
  id SERIAL,
  image_id INTEGER,
  image_url TEXT,
  info_url TEXT,
  name TEXT,
  artist TEXT,
  year TEXT
);