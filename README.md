# React PDF Viewer

A full-stack web application for uploading, managing, and viewing PDF documents through an intuitive browser-based interface.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Express](https://img.shields.io/badge/Express-4.18.2-000000?logo=express)
![Node.js](https://img.shields.io/badge/Node.js-14+-339933?logo=node.js)

## Features

- **PDF Upload** - Upload PDF files with custom names and priority weights
- **Embedded Viewer** - View PDFs directly in the browser via iframe
- **File Management** - Paginated file directory (15 items per page)
- **Upload Progress** - Real-time progress indicator during uploads
- **Duplicate Prevention** - Server-side validation prevents duplicate files

## Tech Stack

**Frontend**
- React 18
- Axios (HTTP client)
- SCSS (styling)

**Backend**
- Node.js + Express
- express-fileupload
- CORS

## Project Structure

```
React-PDF-Viewer/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.js          # Main component with state management
│   │   ├── components/
│   │   │   ├── FileUpload.jsx
│   │   │   └── FileDirectory.jsx
│   │   └── styles.scss
│   └── package.json
│
├── server/                 # Express backend
│   ├── server.js           # API endpoints
│   ├── public/             # Uploaded PDFs (gitignored)
│   ├── entries.json        # File metadata (gitignored)
│   ├── example_entries.json
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 14+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/React-PDF-Viewer.git
   cd React-PDF-Viewer
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Set up server data**
   ```bash
   # In the server directory
   cp example_entries.json entries.json
   mkdir public
   ```

### Running the Application

Start both servers in separate terminals:

```bash
# Terminal 1 - Backend (http://localhost:4500)
cd server
npm start

# Terminal 2 - Frontend (http://localhost:3000)
cd client
npm start
```

The application will open automatically at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint  | Description                            |
|--------|-----------|----------------------------------------|
| POST   | `/upload` | Upload a PDF file with metadata        |
| POST   | `/ls`     | List all files in the public directory |
| POST   | `/entries`| Get file metadata from entries.json    |

### Upload Request Body

```
FormData:
  - file: PDF file
  - name: Display name
  - weight: Priority value (10-10000)
```

## Usage

1. **Upload a PDF** - Use the form on the right sidebar to select a file, enter a name, and set a weight value
2. **Browse Files** - Navigate through uploaded files using the paginated directory
3. **View PDF** - Click any file in the list to open it in the viewer panel

## Configuration

The server runs on port `4500` by default. To change this, modify `server/server.js`:

```javascript
const PORT = 4500;
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- File uploads handled by [express-fileupload](https://github.com/richardgirges/express-fileupload)