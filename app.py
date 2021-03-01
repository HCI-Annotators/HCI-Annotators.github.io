'''
To run on command line:
export FLASK_APP=app.py
export FLASK_ENV=development
flask run
'''
from flask import Flask, request, Response
from flask import render_template
from flask_cors import CORS
from flask_restful import Api

import db
from views import tasks

app = Flask(__name__)
CORS(app)
db.init_database_connection(app)
api = Api(app)

# connect your routes to your app:
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/manager-view/')
def manager_view():
    return render_template('manager-view.html')

#@app.route('/add-post/')
#def create_post():
#    return render_template('create-post.html')
#
#@app.route('/post/')
#def get_single_post():
#    return render_template('post-detail.html')

# routes from other files:
tasks.initialize_routes(api)


if __name__ == "__main__":
    print('running!')
    app.run(debug=True)
