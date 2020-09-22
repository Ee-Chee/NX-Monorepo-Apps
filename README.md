# NX CRUD Application (Address Book + Todos Apps)
* This is a NX monorepo project which consists of several apps/projects in one repository.
* These apps can be divided into two categories:
   1) Frontend
   Angular (directory: apps/address-book): Address-book management plus a sub-app, Todos
   2) Backend
   Nestjs + Sequelize.Postgresql (directory: apps/api): A RESTful API to manage the data exchange for Todos
   Firebase - Cloud Firestore: Used to manage the data exchange for address management app
   Nodejs + Express + Docker (directory: apps/address-book-ssr): Server Side Rendering with Angular Universal (in progress...)

## Functionalities
* These apps enable users to register themselves by inserting their infos into a form. The registered user will be then brought to the homepage where a table list resides. Each row shows only the registered user's name and address. For more detailed infos about the user, one can click on the row and the detailed-info page is then navigated. On this page, user can check the corresponding person's infos, update or delete them from the list. 
* In addition, there is a special To-dos column on the table. Each row/user has their own todos-list. By clicking the 'list' icon, the user's todos-list will be presented and this is where the user is able to create, read, update and delete their need-to-be-done tasks.    

Homepage
<img src="/images/homepage.png">

User Registration Form
<img src="/images/registration-form.png">

Detailed Info Page/Form
<img src="/images/detailed-info-page.png">

Todos List
<img src="/images/todos-list.png">

## Main Features
1) User registration form
- Reactive form
- Create user and add user's detailed infos
- Form validatons and customized validator for postcode
- Date follows german format
- The birth of date has a range of 120 years, starting from last year 
(registered user must be at least one year old and less than 120 years old)
- Auto-completed postcode feature, starting from second digit
- Auto-filtered valid city-options displayed once a valid postcode is given

2) Registed users table list
- Read all registered users
- Searchable keywords (case insensitive) and filtering
- Pagination (disabled in mobile view though)

3) User's detailed-info page
- Reuse the component from registration form mentioned above
- Update or delete user actions can be done here

4) Todos list
- Template driven form
- Create, read, update and delete features
- Input-required form validation

5) Firestore as backend API service for address management

6) Nestjs as backend API service for Todos
- Restful API
- Sequelize.Postgresql as database
- Server side error handling

## Additional Features
1) Flexlayout, Angular Material, header and side navigation (responsive design)
<img src="/images/responsive-list.png"> <img src="/images/responsive-menu-side-nav.png">
2) Lazy-loaded routes (feature modules)
3) Shared module
4) Loading and error handling
5) NgRx effects and entity store (feature stores)
6) Customized directives, pipes and interfaces

## Oncoming Features (Work in progress...)
1) Server side rendering
2) Dockerized SSR app
3) Angular i18n Internationalization

<img src="/images/structure.png">

**_NOTES_**:
* Coding technologies:
   1) Frontend: HTML, CSS, Angular(Reactive form, Template Driven form, Angular Material, Flex-layout, Angular Universal), RxJS, NgRx
   2) Backend: Nodejs, Nestjs, Express, Sequelize, Postgresql, Docker
   3) Third parties or common: NX monorepo, Firebase (Cloud Firestore), Javascript, Typescript