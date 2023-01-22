DROP TABLE IF EXISTS display;

CREATE TABLE display (
  id SERIAL,
  image_id INTEGER,
  image_url TEXT,
  info_url TEXT,
  name TEXT,
  artist TEXT,
  year TEXT,
);