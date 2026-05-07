# Learn Your 123s

An AI-powered handwriting practice app for children — draw digits on a canvas and get instant feedback from a trained recognition model, guided by an animated mascot.

## Features

## Getting started

The project consist of 3 key parts: ML model for handwriting recognition, frontend with learning modes, canvas and other functionalities, and backend supporting communication between frontend and inference.

### ML

```bash
cd ml                                                                                                             
python -m venv .venv && source .venv/bin/activate                                                                   
pip install -r requirements.txt                                                                                     
python train.py       
```

### Frontend

```bash
cd frontend
npm install                                                                                                        
npm run dev 
```

### Backend

```bash
cp -r frontend/dist backend/static
python -m venv .venv && source .venv/bin/activate                                                                   
pip install -r requirements.txt                  
uvicorn main:app --reload 
```

The app's UI can be accessed on `localhost:5173`

## Roadmap

- [x] Learn 123s — guided digit tracing with a character guide overlay and instant AI feedback
- [x] Practice 123s — free-draw digit recognition with per-digit confidence results
- [x] Mascot — animated character with mood-reactive expressions and speech bubbles
- [x] Settings — theme picker (pink/blue/yellow), sound effects toggle, and animation toggle
- [ ] Learn ABCs — trace alphabet letters with guided outlines and AI feedback
- [ ] Practice ABCs — spell out words letter by letter
- [ ] Counting Practice — see a group of objects and write how many there are
- [ ] Quiz & Points — timed digit challenges with a score and streak system
- [ ] Stats & History — track accuracy, digits practiced, and longest streaks