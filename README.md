# Allison-AI-assessment

- This project is an Allison AI interview assessment.
- Python & Flask are used for the back-end and TypeScript & React for the front-end.
- Please use a python version >=3.8.
- Please use a node version >=12.

## Installation

1. Clone the repository

### Back-end

2. In the back-end folder, use the package manager [pipenv](https://pipenv-es.readthedocs.io/es/stable/)

- To install pipenv:

```bash
pip install --user pipenv
```

- and run the following commands:

```bash
pipenv shell
pipenv install
flask run
```

By default, the back-end development server listens on [http://127.0.0.1:5000](http://127.0.0.1:5000)

### Front-end

3. In the front-end folder, use the package manager [yarn](https://yarnpkg.com/) or [nodejs-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and run the following commands:

```bash
yarn install
yarn start
```

By default, the front-end development server listens on [http://127.0.0.1:3000](http://127.0.0.1:3000)

## Static analysis

For back-end analysis, go to the back-end folder and run:

```bash
pipenv run pylint {{name of the file}}
```

For front-end analysis, go to the front-end folder and run:

```bash
yarn run check
```

## Notes:

- Please note that I never used python professionnally and I don't have the same habits/good practices as in Typescript. I am willing to learn them. ;)
- First time in my life I use matplotlib. :p
- Remaining pylint feedbacks come from fast-marching code copied from [https://github.com/imcohen/segment-brain-mri](https://github.com/imcohen/segment-brain-mri).

I really hope you enjoy it :D
