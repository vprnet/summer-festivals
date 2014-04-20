from index import app
from flask import render_template, request
from config import BASE_URL
from query import get_festivals


@app.route('/')
def index():
    page_url = BASE_URL + request.path
    page_title = 'Summer Festivals'
    festivals = get_festivals()

    social = {
        'title': "",
        'subtitle': "",
        'img': "",
        'description': "",
        'twitter_text': "",
        'twitter_hashtag': ""
    }

    return render_template('content.html',
        page_title=page_title,
        social=social,
        festivals=festivals,
        page_url=page_url)
