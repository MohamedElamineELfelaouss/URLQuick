from flask import (
    Blueprint,
    request,
    jsonify,
    render_template,
    url_for,
    session,
    redirect,
)
from app import db
from app.models import URLMap
import string
import random

main = Blueprint("main", __name__)


def generate_short_url():
    characters = string.ascii_letters + string.digits
    while True:
        short_url = "".join(random.choice(characters) for _ in range(6))
        if not URLMap.query.filter_by(short_url=short_url).first():
            return short_url


@main.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        data = request.get_json()
        url = data.get("url")
        custom_alias = data.get("custom_alias")
        if not url:
            return jsonify({"error": "URL is required"}), 400

        if custom_alias:
            existing_url = URLMap.query.filter_by(short_url=custom_alias).first()
            if existing_url:
                return jsonify({"error": "Custom alias already in use"}), 400
            short_url = custom_alias
        else:
            short_url = generate_short_url()

        new_url = URLMap(original_url=url, short_url=short_url)
        db.session.add(new_url)
        db.session.commit()

        if "urls" not in session:
            session["urls"] = []
        session["urls"].append({"original_url": url, "short_url": short_url})
        session.modified = True

        return jsonify({"original_url": url, "short_url": short_url}), 201
    return render_template("index.html")


@main.route("/<short_url>")
def redirect_url(short_url):
    link = URLMap.query.filter_by(short_url=short_url).first_or_404()
    return redirect(link.original_url)


@main.route("/my_urls")
def my_urls():
    if "urls" not in session:
        session["urls"] = []
    urls = URLMap.query.filter(
        URLMap.short_url.in_([url["short_url"] for url in session["urls"]])
    ).all()
    urls_data = [
        {
            "original_url": url.original_url,
            "short_url": url.short_url,
            "created_at": url.created_at,
        }
        for url in urls
    ]
    return jsonify(urls_data)
