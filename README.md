
# URL Shortener

A simple and elegant URL shortener application built with Flask, SQLAlchemy, and Bootstrap. This application allows users to shorten long URLs and manage their shortened links within a session.

![Screenshot](static/images/screenshot.png)

## Features

- Shorten long URLs with or without a custom alias.
- View all shortened URLs created during the current session.
- User-friendly interface with Bootstrap styling.
- Persistent storage of URLs using SQLite.

## Installation

### Prerequisites

- Python 3.x
- Virtualenv

### Steps

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/url_shortener.git
    cd url_shortener
    ```

2. Create a virtual environment:
    ```sh
    python -m venv venv
    ```

3. Activate the virtual environment:

    - On Windows:
        ```sh
        venv\Scripts\activate
        ```

    - On macOS/Linux:
        ```sh
        source venv/bin/activate
        ```

4. Install the dependencies:
    ```sh
    pip install -r requirements.txt
    ```

5. Initialize the database:
    ```sh
    python reset_db.py
    ```

## Usage

1. Run the Flask application:
    ```sh
    python run.py
    ```

2. Open your web browser and navigate to `http://127.0.0.1:5000`.

### Screenshots

![Main Page](static/images/main_page.png)
*Main Page for URL shortening*

![URL List](static/images/url_list.png)
*List of URLs created during the session*

## Project Structure

```
url_shortener/
│
├── app/
│   ├── __init__.py
│   ├── models.py
│   ├── routes/
│   │   ├── __init__.py
│   │   └── main.py
│   └── static/
│       ├── css/
│       │   └── styles.css
│       ├── js/
│       │   └── scripts.js
│       └── images/
│           ├── screenshot.png
│           ├── main_page.png
│           └── url_list.png
│   └── templates/
│       ├── index.html
│       └── result.html
├── instance/
│   └── config.py
├── migrations/
├── venv/
├── config.py
├── README.md
├── requirements.txt
├── reset_db.py
└── run.py
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Flask](https://flask.palletsprojects.com/)
- [Bootstrap](https://getbootstrap.com/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
