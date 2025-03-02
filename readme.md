# Chess Game

A full-stack chess game featuring three gameplay modes:
- **AI vs AI**
- **AI vs Human**
- **Human vs Human**

## Tech Stack

- **Frontend:** React.js
- **Backend:** Flask API
- **AI Model:** PyTorch

## Features
- **Interactive UI:** A user-friendly chessboard built with React.js
- **AI-powered Chess Engine:** A deep learning-based chess AI using PyTorch
- **RESTful API:** Flask-based API to manage game state and AI computations
- **Multiplayer Mode:** Supports both AI and human opponents

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- Python 3
- pip

### Setup

#### 1. Clone the Repository
```sh
git clone https://github.com/Coder1010ayush/chess.git
```

#### 2. Setup the Backend (Flask API)
```sh
cd chess
pip install -r requirements.txt
python app.py
```

#### 3. Setup the Frontend (React.js)
```sh
cd frontend
npm install
npm start
```

## API Endpoints

| Method | Endpoint       | Description                  |
|--------|--------------|------------------------------|
| GET    | `/api/status` | Check server status          |
| POST   | `/api/move`   | Send move and get AI move    |
| POST   | `/api/newgame` | Start a new chess game       |

## AI Model
The AI model is implemented in PyTorch and integrated into the Flask API. It evaluates board states and suggests optimal moves using a deep learning approach.

## Contributing
Feel free to open issues or contribute by submitting pull requests.

## License
This project is licensed under the MIT License.

