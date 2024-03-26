from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from tqdm import tqdm
import concurrent.futures
import requests
import os
import hashlib
import zipfile
import re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from tqdm import tqdm
import concurrent.futures
import requests
import os
import hashlib
import zipfile
from cryptography.fernet import Fernet
from webdriver_manager.chrome import ChromeDriverManager
from datetime import datetime

# Function to filter URLs by date range
def filter_urls_by_date(urls, start_date, end_date):
    # Compile a regex pattern to extract the date part from the URL
    date_pattern = re.compile(r'(\d{4}-\d{2}-\d{2})')
    filtered_urls = []
    
    # Convert start_date and end_date to datetime objects for comparison
    if start_date=="" or end_date=="":
        return urls;
    start_date_dt = datetime.strptime(start_date, '%Y-%m-%d')
    end_date_dt = datetime.strptime(end_date, '%Y-%m-%d')
    
    for url in urls:
        # Search for the date in the URL
        match = date_pattern.search(url)
        if match:
            url_date = datetime.strptime(match.group(1), '%Y-%m-%d')
            # Check if the date is within the start and end dates
            if start_date_dt <= url_date <= end_date_dt:
                filtered_urls.append(url)
    
    return filtered_urls




def downloader(data):
    cipher_suite = Fernet("NVNQ4v8HLRscMW22dkduC5pEvOSe-urm_DFN8-xsF6A=")
    base_url=cipher_suite.decrypt("gAAAAABmAhCNBojQN-siARrFo9mUgidkcxSBbG9HuqHbfqYYC55vhzAbogzFWsy9OPO8e2fPGaigt3qRVRXIKlBKpI3lRzfvkSPRKk7b2Wq4a0dUMpT8evQ=").decode()
    
    print("Started Collecting file informations.")
    symbol = data['currency']  # Example of expected data format: {"symbol": "BTCUSDT"}
    timeframe = data['interval']
    
    
    # Construct the URL with the user input
    url_prefix = f"{base_url}?prefix=data/spot/daily/klines/{symbol}/{timeframe}/"
    
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Makes Chrome headless

    
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)


    

    driver.get(url_prefix)

    try:
        # Wait until the a element is present or timeout after 20 seconds
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/table/tbody/tr[1]/td[1]/a"))
        )
    except TimeoutException:
        print("Timed out waiting for page to load")
        driver.quit()

    # Find all link elements
    elements = driver.find_elements(By.TAG_NAME, 'a')

    urls = [element.get_attribute('href') for element in elements if 'zip' in element.get_attribute('href')]
    driver.quit()
    urls = filter_urls_by_date(urls, data['fromDate'], data['toDate'])

# Print the filtered URLs


    def download_file(url, progress=None):
        filename = url.split('/')[-1]
        filepath = os.path.join(data_dir, filename)
        response = requests.get(url)
        with open(filepath, 'wb') as file:
            file.write(response.content)
        if progress:
            progress.update(1)
        return filepath if not url.endswith('.CHECKSUM') else None

    data_dir = "data"
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)

    print("Downloading %d Files:", len(urls))
    # Setup progress bar
    progress = tqdm(total=len(urls), unit='file', desc='Downloading files', unit_scale=False)

    # Use ThreadPoolExecutor to download files in parallel and update progress bar
    downloaded_files = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=200) as executor:
        futures = [executor.submit(download_file, url, progress) for url in urls]
        for future in concurrent.futures.as_completed(futures):
            filepath = future.result()
            if filepath:
                downloaded_files.append((filepath, filepath + '.CHECKSUM'))

    progress.close()


    # Verification logic follows here
    print("Verifying and Extracting Files:")
    def verify_file_integrity(args):
        filepath, checksum_file = args
        with open(checksum_file, 'r') as f:
            checksum_expected = f.read().strip().split()[0]
        sha256_hash = hashlib.sha256()
        with open(filepath, 'rb') as f:
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)
        calculated_checksum = sha256_hash.hexdigest()
        if calculated_checksum == checksum_expected:
            with zipfile.ZipFile(filepath, 'r') as zip_ref:
                zip_ref.extractall(os.path.dirname(filepath))
            # Remove the original zip file and its checksum file
            os.remove(filepath)
            os.remove(checksum_file)
            return f"Verification successful for file: {filepath}"

        else:
            return f"Verification failed for file: {filepath}"


    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        verification_results = list(executor.map(verify_file_integrity, downloaded_files))

    failed_verifications = [result for result in verification_results if "Verification failed for file:" in result]

    if failed_verifications:
        for failure in failed_verifications:
            print(failure)
    else:
        print("All files verified successfully.")