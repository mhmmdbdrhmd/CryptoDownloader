from flask import Flask, render_template, request, jsonify 
from downloader import downloader
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit_data', methods=['POST'])
def handle_data_submission():
    data = request.get_json()  # Get data sent from JS
    
    
    # Example of accessing specific data
    print("Currency:", data['currency'])
    print("From Date:", data['fromDate'])
    print("To Date:", data['toDate'])
    print()
    downloader(data)
    # Add more print statements as necessary for other data fields

    

if __name__ == '__main__':
    app.run(debug=True)
