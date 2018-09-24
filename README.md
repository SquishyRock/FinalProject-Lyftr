# Lyftr

## Description
Web browser application, optimized for mobile viewing, that was built as the final project to a 3 month coding bootcamp. The application was completed start to finish in the two final weeks of the program.
Users can sign into the application after creating a personalized username and password, which once signed in is stored as a JWT to allow for users to use the site without having to sign in again until clearing their cookies. Once signed in, users can search through workout programs created by other users that they have shared or can create their own. By selecting 'Make a Workout' users can search through our database of exercises and add them to a workout with their desired sets and reps. Once finished adding exercies users can give the workout a name and choose whether to make that workout public so other users can select it aswell. Once saved all public workouts, plus the signed in users private workouts, will be visable on the find a workout tab. From this page users can view workouts and delete workouts that they have created themselves. 

## Packages Used
- React / React Router
- JWT (JSON Web Tokens)
- Node.js
- Express
- MongoDB
- Axios
- Material UI

## Other Notes
- Project front-end and back-endwas hosted on AWS EC2 instance during the final project presentation allowing users to create their own accounts. 
- Exercise search function custom built to allow mutlitple filters when querrying database of exercises.
