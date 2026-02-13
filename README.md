# Reskin test

## Main requirements

- [ ] Redesign the front page
- [ ] The user should be able to choose between new and top posts
- [ ] The posts can be shown in any way you like (grid/list etc.)
- [ ] How you handle pagination of the posts to display is up to you, but you should be able to
load as many posts as the API permits while achieving a clean UX

## TODO

- [x] Setup tests (vitest, react testing library, msw)
- [x] Setup style and component (tailwindcss and ShadCN)
- [ ] setup server state management (ReactQuery)
  - [ ] setup runtime validations (zod)
- [ ] Deploy to github pages
- [ ] Create frontpage
- [ ] Create Post component
  - [ ] add types for the api
  - [ ] add tests
- [ ] Add a way to filter between new and top posts (maybe tabs/quick filters?)
- [ ] Add pagination capabilities

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
