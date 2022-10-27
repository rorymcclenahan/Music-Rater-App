# Homework 3 Frontend

### Frontend and backend website:
####  &emsp; Frontend: https://music-rater-comp333.web.app/music
####  &emsp; Backend: https://music-rater-comp333.herokuapp.com/api/

#

### Installation
####  &emsp; to install the react native dependencies and run react native, cd into the mobile directory and run: 
```zsh
npm install
npm start
```
####  &emsp; to install python dependencies and run python, cd into the backend directory and run:
```zsh
python3 -m venv my-venv
source my-venv/bin/activate
pip3 install django djangorestframework django-cors-headers django-rest-knox 
pip3 install python-decouple gunicorn dj-database-url psycopg2-binary whitenoise
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
```

#

### Features
#### &emsp; The app has a songs page that contains all the songs in the database and allows the user to add songs to the database, remove songs from the database, and edit songs in the database. The user can also rate songs.
#### &emsp; There is a plus in the top left that is used to add new songs to the database. The buttons are in order of this: edit, rate, and delete.

#

### Admin login
#### &emsp; username: admin
#### &emsp; password: password

#

### Footnotes
#### Created by  Nelson Lin, Rory McClenahan, & Judeley Jean-Charles,
#### This project was made for Wesleyan University's Software Engineering course, COMP333. 