# Music Library - Angular Technical Test

This is a simple Angular application for managing songs, artists, and record companies. The application uses `ngx-translate` for multi-language support and `json-server` for mock data.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tomashervas/music-library.git
   cd ./music-library
    
2. Install the dependencies:
  ```bash
   npm install
  ```
   
3. Install json-server globally if you haven't already:
```bash
  npm install -g json-server
```
## Usage
1. Running the Application
Start the json-server with mock data:

```bash
json-server --watch src/assets/mock.json --delay 1000
```

2. In a separate terminal, start the Angular application:
```bash
ng serve
```
3. Open your browser and navigate to http://localhost:4200.

## Features
- Songs Management: View, add, edit, and delete songs.
- GLobal state management with NGXS.
- Styles with Tailwind CSS.
- Multi-language Support: Switch between English and Spanish using ngx-translate.

## License
This project is licensed under the MIT License.
