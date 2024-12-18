# BRIGHTMIND

**A student-driven approach to learning.**

Students are able to join courses created by administrators, work through the lessons at their leisure, and take assessments based on the lessons that are automatically graded.

## User Stories

- **As a guest**, I want to see the landing page, be able to sign in, and sign up.
- **AAG**, I want to see the courses, their descriptions, and lesson titles.
- **AAG**, I want to see the About page.
- **As a user**, I want to see my Dashboard that contains my joined Courses and my Todo list.
- **AAU**, I want to be able to see and join Courses.
- **AAU**, I want to see the lessons of the courses that I have joined.
- **AAU**, I want to create Todos that have a due date, that can be edited, deleted, or marked as complete.

## Stretch Goal

- **AAU**, when I am ready, I want to view the lesson assessment, complete it, and get a grade.
- **AAU**, I want to see my current grades on the Dashboard.
- **As an administrator**, I want to add courses, lessons, and assessments.

## Wireframe

#### SignInPage
![SignInPage](/assets/SignInPage.png)
#### SignUpPage
![SignUpPage](/assets/SignUpPage.png)
#### GuestView
![GuestView](/assets/GuestView.png)
#### Dashboard
![Dashboard](/assets/Dashboard.png)
#### CoursesPage
![CoursesPage](/assets/CoursesPage.png)
#### LessonPage
![LessonPage](/assets/LessonPage.png)

## Component Heirarchy
![ComponentHeirarchy](/assets/ComponentHeirarchy.png)

## ERD
![ERD](/assets/BrightMind%20ERD.png)

## Routing Table
| Name               | Route                                       | Use                        | Method |
|--------------------|----------------------------------------------|----------------------------|--------|
| getCourses         | /courses                                    | Get all courses            | GET    |
| getCourse          | /courses/:courseId                         | Get a course               | GET    |
| signIn             | /users                                      | Sign into app              | POST   |
| signUp             | /users/signup                              | Create user                | POST   |
| getUserCourses     | /users/:userId/courses                    | View all courses as user   | GET    |
| addCourse          | /users/:userId/courses/:courseId          | Add course to user         | PUT    |
| dropUserCourse     | /users/:userId/courses/:courseId          | Drop enrolled course       | PUT    |
| getUserTodos       | /users/:userId/todos                      | Get all user todos         | GET    |
| createUserTodo     | /users/:userId/todos                      | Create user todo           | POST   |
| editUserTodo       | /users/:userId/todos/:todoId              | Edit user todo             | PUT    |
| deleteUserTodo     | /users/:userId/todos/:todoId              | Delete user todo           | DELETE |
| getLessons         | /users/:userId/courses/:courseId/:lessonId| Get single lesson          | GET    |
| submitAssessment   | /users/:userId/courses/:courseId/:lessonId| Submit assessment          | POST   |

## Timeline
|Day|Task|Person|
|---|---|---|
|Wed, Dec 18|Get approval|Together|
||Init Github|Tony|
||Create user model|Tony|
||Add Authentication|Joemer|
|Thr, Dec 19|Create todo model|Tony|
||Create dashboard and render todo|Joemer|
||Create other models|Tony|
|Fri, Dec 20|Load database with fake data|Tony|
||Create all courses, course, and lesson components|Joemer|
|Sat, Dec 21|Create about component|Joemer|
||Create backend routes|Tony|
|Mon, Dec 23| Create frontend service|Tony|
||Add component styling|Joemer|
|Thr, Jan 2|Meet up to complete deliverables|Together|
||Make sure frontend and backend are connected|Together|
|Mon, Jan 6|Publish App to heroku and netlify|Together|
|Tue, Jan 7|Present|Together|

## Project Management
[TrelloLink](https://trello.com/invite/b/6762d847a8c34c2934d30d0e/ATTI8c67db5b1f1e1838d55b101f54326c4a90DA209F/brightmind)