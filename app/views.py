from index import app
from flask import render_template, request
from config import BASE_URL
from query import get_festivals


@app.route('/')
def index():
    page_url = BASE_URL + request.path
    page_title = 'Summer Music Festivals'
    festivals = get_festivals()

    social = {
        'title': "Summer Music Festivals In Vermont",
        'subtitle': "",
        'img': "static/img/vpr-benny-golson-discover-jazz.jpg",
        'description': "See what music festivals are happening in and around Vermont. Classical, jazz, folk and more.",
        'twitter_text': "Summer music festivals in and around Vermont",
        'twitter_hashtag': ""
    }

    return render_template('content.html',
        page_title=page_title,
        social=social,
        festivals=festivals,
        page_url=page_url)
