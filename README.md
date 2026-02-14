# Reskin test

## Main requirements

- [x] Redesign the front page
- [x] The user should be able to choose between new and top posts
- [x] The posts can be shown in any way you like (grid/list etc.)
- [x] How you handle **pagination** of the posts to display is up to you, but you should be able to load as many posts as the API permits while achieving a clean UX
- [ ] add tests

## TODO

- [x] Setup tests (vitest, react testing library, msw)
- [x] Setup style and component (tailwindcss and ShadCN)
- [x] setup server state management (ReactQuery)
  - [ ] setup runtime validations (zod)
- [x] Deploy to github pages
- [x] Create frontpage
  - [x] fetch top posts for front page
  - [x] fetch new posts for front page
  - [x] style the front page
    - [ ] add skeleton loader
    - [x] Create story card component
  - [x] add types for the api
- [x] Add a way to filter between new and top posts (tabs)
- [x] Add pagination capabilities
- [ ] add tests
- [ ] Dark mode toggle
- [ ] improve StoryCard styling

## Bugs

- [ ] page jumps when changing page size

## Original prompt

Using Angular, React, Vue or other modern Javascript frameworks, utilise the HackerNews API to
create a redesigned hacker news web application.

Minimum requirements:

- Redesign the front page
- The user should be able to choose between new and top posts
- The posts can be shown in any way you like (grid/list etc.)
- How you handle pagination of the posts to display is up to you, but you should be able to
load as many posts as the API permits while achieving a clean UX

What we’re looking for:

- A clean, easy to use UI
- Use of best practices in the framework of your choice
- Readable and DRY code
- We value test coverage
- Make the code available in a Git-based source code repository e.g. Github. (Please make the
repository name a random string and avoid references to Genesys to prevent others copying
your code in the future.)
- State any assumptions that you made
- Please include a readme file for your solution in the repo

Aside from what is outlined above, you have free reign in any design decisions and
implementation details.

Naturally, StackOverflow and coding assistants like ChatGPT exist. While we cannot prevent you
from using these, we expect that you fully own any code you submit and can talk to it
comprehensively in a follow-up interview. In your day-to-day work, knowing your dependencies
and the rationale of design decisions is crucial, and we expect the same of you in your coding
challenge.
