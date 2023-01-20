DROP TABLE IF EXISTS sangyeonpak;

CREATE TABLE sangyeonpak (
  id SERIAL,
  image_id INTEGER,
  image_url TEXT,
  info_url TEXT,
  name TEXT,
  artist TEXT,
  year TEXT,
  seen BOOLEAN
);