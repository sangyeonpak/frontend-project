React version:

1) cd /home/sangyeonpak/Repositories/frontend-project/react-version/yourmet

then npm start

2) cd /home/sangyeonpak/Repositories/frontend-project/react-version/yourmet/server

then nodemon server

3) sudo service postgresql start

then createdb yourmet (or whatever name works too i guess)

then psql -f display_migration.sql yourmet

then psql -f seen_migration.sql yourmet



you should be set now