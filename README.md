# NUSexchange

## Devpost
[Checkout our Devpost submission!](https://devpost.com/software/exchangenus)

## Hosting
We are currently hosting the application at https://exchangenus.com

## Getting Started	

#### 1. Fork and git clone this repo

#### 2. npm install dependencies for both `backend` and `client` folders

#### 3. There are a couple of paths that have to be changed:

1. `backend/routes/getResults.js` : Change `pythonPath` and `PythonShell.run()` 
2. `backend/routes/getPdf.js` : Change `pythonPath` and `PythonShell.run()`
3. `backend/routes/getPdf.py` : Change `PdfFileReader()` and `dest` path
4. `backend/routes/getNlp.js` : Change `pythonPath` and `PythonShell.run()`



