# .xylo

## PROJECT DESCRIPTION

.xylo is a Travel Blog

## FEATURES

- This website is made completely using HTML, CSS and javascript.
- Node.js and MySQL have been used in the backend.
- EJS has been used as a templating engine and GSAP for animations.
- Google Scripts are being used to store the file and the file is uploaded to google drive.

### SCREENSHOTS

This is the homepage for our app.

![homepage](https://user-images.githubusercontent.com/78142604/140022454-09af10c4-ee8b-4985-8415-b0d739f1666f.png)

For more images, refer to this drive folder.

[Drive Link](https://drive.google.com/drive/folders/1pzuQcuFbEttk4w5iCR3Smgaa8bGyfO_v?usp=sharing)

### VIDEO LINK (LIVE DEMO)

For a video of the app, refer to this link.

https://youtu.be/_u-RASsQF9k

## HOSTED WEBSITE LINK

Follow link to view the site.
https://webkriti2020.herokuapp.com

## ADMIN ACCOUNT CREDENTIALS

email: pranshutejas@gmail.com
password: pranshu

## LOCAL SETUP

- Fork the repositry.
- Clone the repositry using (`git clone URL`).
- Setup _.env_ as given in _.env.example_ .(Provide the password for your mysql).
- Open the folder in which you cloned the repositry.
- You will have to first make a database named _xylo_ in your mysql server.
- Then for running the app locally, it is important that you make a table named _posts_ in the database xylo.
- For your ease, you can copy this command to make the table
- (`CREATE TABLE POSTS title varchar(50), post_date date, place varchar(50), content varchar(250), uid varchar(50), author varchar(50), fileurl varchar(50)`).
- Run (`npm install`).
- Run (`npm start`). This will start your server locally.
- For running the app in production mode run (`npm run dev`).

## STATUS

Hooray! Except a few minor bugs we are working on you can now visit
the site.
