## JobTrack

This tool seeks to provide access to a central repository where users can store and manage job postings independent of their job application workflow, without fear about the postings being removed, deleted or becoming otherwise unreachable.
Use tags and the search functionality to filter your job postings.
Edit fields to update with contact information, or additional notes at a later time.





## Tools Used
 - NextJS: https://nextjs.org/
 - TypeScript: https://github.com/microsoft/TypeScript
 - Prisma (ORM): https://www.prisma.io/
 - Postgres: https://www.postgresql.org/
 - Auth0: https://auth0.com/
 - Railway: https://railway.app

# Features

 - Interactive and responsive UI
 - Filter jobs using a live search.
 - Tags can also be used to filter jobs, they can be added on initial job creation, or added/removed later.
 - Editable fields, many fields can be updated after the initial job creation, or added if they were left off the initial job.
 - Persistent data storage in a PostgreSQL database when authenticated with Auth0.
 - RESTful API through NextJS.

# Jobs

Each job has room for the following fields, many of which can be updated at any time:

 - Job Title
 - Company
 - Location
 - Link
 - Posting / Closing dates
 - Notes
 - Tags
 - Job Description

# Adding jobs

Simply copy & paste the relevant information into the input fields.
Add tags, contact information, and any other relevant information in the notes section.
Search & Filter jobs as required.

![Screenshot from 2021-04-12 20-06-13](https://user-images.githubusercontent.com/22286436/114491923-58c6f680-9bcc-11eb-996b-f99cb70e4747.png)

![Screenshot from 2021-04-12 20-06-43](https://user-images.githubusercontent.com/22286436/114491900-4f3d8e80-9bcc-11eb-8b77-9e271f1d7270.png)
