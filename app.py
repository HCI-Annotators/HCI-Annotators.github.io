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
from flask import send_file

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

@app.route('/manager-login/')
def manager_login():
    return render_template('manager-login.html')

@app.route('/annotator-login/')
def annotator_login():
    return render_template('annotator-login.html')

@app.route('/annotator-task/')
def annotator_task():
    return render_template('annotator-task.html')

@app.route('/annotator-done/')
def annotator_done():
    return render_template('annotator-done.html')

@app.route('/task-view/')
def task_view():
    return render_template('task-view.html')

@app.route('/task-add/')
def task_add():
    return render_template('task-add.html')

# @app.route('/upload')
# def upload_file():
#    return render_template('upload.html')

@app.route('/annotator')
def tagger():
    if (app.config["HEAD"] == len(app.config["FILES"])):
        return redirect(url_for('bye'))
    directory = app.config['IMAGES']
    image = app.config["FILES"][app.config["HEAD"]]
    labels = app.config["LABELS"]
    not_end = not(app.config["HEAD"] == len(app.config["FILES"]) - 1)
    print(not_end)
    return render_template('annotator1.html')

@app.route("/bye")
def bye():
    print("done")
    # return send_file("taf.gif", mimetype='image/gif')

@app.route('/upload', methods = ['GET', 'POST'])
def upload():
    uploaded_files = flask.request.files.getlist("file[]")
    print(uploaded_files)
    return 'file uploaded successfully'
		
if __name__ == '__main__':
   app.run(debug = True)

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
    app.config["LABELS"] = []
    app.run(debug=True)
