# Flask Server which allows the user to get a random password

#
# First Flask and HTML project, i suck at CSS
#

import flask_frozen
from flask import Flask, request, render_template
import random
import string

app = Flask(__name__, template_folder='templates')
app.config['DEBUG'] = False

@app.route('/')
def index():
    return render_template('index.html')
    
@app.route('/password', methods=['GET'])
def password():
    try:
        length = int(request.args.get('length'))
        password = ""
        for i in range(length):
            password += random.choice(string.ascii_letters)
        if request.args.get('number') == 'true':
            password += random.choice(string.digits)
        if request.args.get('symbol') == 'true':
            password += random.choice(string.punctuation)
        if request.args.get('capital') == 'true':
            password += random.choice(string.ascii_uppercase)
        if request.args.get('lowercase') == 'true':
            password += random.choice(string.ascii_lowercase)
        return {"password": password}
    except:
        return {"error": "Invalid length"}


if __name__ == '__main__':
    app.config['FREEZER_DESTINATION'] = 'templates'
    app.config['FREEZER_BASE_URL'] = 'https://anthony01m.github.io/password-gen/'

    # freeze the app
    freezer = flask_frozen.Freezer(app)

freezer.freeze()
