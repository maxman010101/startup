# Free Chat
[My Notes](notes.md)

Free Chat is an online discussion board where users can create and view discussions on various topics, from favorite restaraunts to best music. Users can create an account by adding their username on the main page. Users click on a discussion in the list to enter that discussion and can add their comments. Comment amounts are displayed next to each discussion so users can see how active their discussion is. The info tab will describe what the user can do on the main page and how to do them.


> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] Proper use of Markdown
- [X] A concise and compelling elevator pitch
- [X] Description of key features
- [X] Description of how you will use each technology
- [X] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Have you ever endlessly debated with your friends about different topics, or be discussion important things in a team meeting, only to run out of time and have to pause the discussion? The Free Chat application makes it so a group of people can pull out their phones, clearly see active discussions, and pick up wherre the discussion left off, as well as create many new discussions. As each user makes their discussions, they are automatically added and displayed in realtime to all the other app users. Once someone adds a comment, the total amoutn of that discussion's comments will be displayed on the main page.

### Design

![Design image](image0(7).jpeg)

### Diagram

Here is how a user would make a discussion and how making a comment would work with the backend of the app when commenting on a discussion. User makes new discussion, everyone else can see it, another comments in said discussion, that comment can be viewed by others and the number of that discussion's comments goes up.

```mermaid
sequenceDiagram
    actor You
    actor Bob
    actor Jack
    actor Server
    You->>Server: New Discussion(discussion 1)
    Server->>You: discussion 1(on main page)
    Server->>Bob: discussion 1(on main page)
    Server->>Jack: discussion 1(on main page)
    Bob->>Server: comments on disc. 1
    Server->>Bob: disc 1 comments + 1 and can see comment in disc 1
    Server->>Jack: disc 1 comments + 1 and can see comment in disc 1
    Server->>You: disc 1 comments + 1 and can see comment in disc 1


```

### Key features

- Secure login over https
- Abity to select and create discussions
- Ability to comment in a discussion
- Display of made discussions and their total comments
- Display of comments within discussion sleected
- Comments and total comments displayed in real time
- discussions and comments persistently stored
- ability of users to edit and delete their comments
- ability of admin to delete discussions

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct html structure for app. Two pages, one main for login and discussion choice/creation, and one for the discussion itself with the comments.
- **CSS** - Styling that looks simple yet good, good use of whitespce and contrast, easily readable layout of titles and interactable elements such as the creat tab and individual discussions.
- **React** - Provides login, discussion display and main page display, creating a new discussion, commenting, display other users comments and the individual comment total for each discussion, and use of React for routing and components.
- **Service** - Backend service with endpoints for:
login
retrieving discussions 
creating discussions
commenting
retrieving total comments for each discussion
Will use a third party news API to allow users to find the latest news topics as a way of finding discussion tpics for new chats
- **DB/Login** - Store users, discussions, and comments/comment totals in database. Register and login users. Credentials securely stored in database. Can't comment or create discussions unless authenticated.
- **WebSocket** -  As each user comments or creates discussions, their discussions are broadcast to all other users on the main page. As they comment, those comments are broadcast to everyone within the discussion while the total amount of that discussion's comments are updated and broadcast on the main page to every user.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
