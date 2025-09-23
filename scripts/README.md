## Scripts

This folder contains scripts which are associated with running your project and establishing a baseline for your pipeline.

`pipeline.sh` holds a list of the steps your configured CI pipeline with run. This is common for the connjenk pipelines and can be used within a travis.yml files also if using travis integration on whitewater.

Pipeline should run

- Build step (typscript, babel, webpack)
- Test (Jasmine unit tests)
- Lint (Eslint check of your source)

TBD
- Docker publish steps
- NPM publish steps
- Enhance scripts with placeholder for Super user creds.
