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
 
@app.route('/password', methods=['POST'])
def password():
    password = ''
    symbol = request.form['symbol']
    number = request.form['number']
    capital = request.form['capital']
    length = request.form['length']
    if length == '':
        length = 8
    else:
        length = int(length)
    for i in range(length):
        if symbol:
            password += random.choice(string.punctuation)
        if number:
            password += random.choice(string.digits)
        if capital:
            password += random.choice(string.ascii_uppercase)
        password += random.choice(string.ascii_lowercase)
    password = ''.join(random.sample(password, len(password)))
    return render_template('index.html', password=password)

@app.route('/generate', methods=['POST'])
def generate():
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
    flask_frozen.Freezer(app).freeze()
