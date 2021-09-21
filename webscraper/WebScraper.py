import json
import os
import time
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup

##NUS credential
userName = ""
password = "" 

## wait_time for loading page
wait_time = 60
longer_wait_time = 600

## launch webDriver and access modreg
DRIVER_PATH = 'chromedriver.exe'
driver = webdriver.Chrome(executable_path=DRIVER_PATH)
driver.get('https://myedurec.nus.edu.sg')

# logging in modreg
WebDriverWait(driver, wait_time).until(EC.element_to_be_clickable((By.CLASS_NAME, 'nus_sso_login_box'))).click()
driver.find_element_by_id("userNameInput").send_keys(userName)
driver.find_element_by_id("passwordInput").send_keys(password)
driver.find_element_by_id("submitButton").click()

#accessing to find module mapping
WebDriverWait(driver, wait_time).until(EC.presence_of_element_located((By.ID, 'N_STDACAD_SHORTCUT'))).click()
WebDriverWait(driver, wait_time).until(EC.presence_of_element_located((By.ID, 'win0groupletPTNUI_LAND_REC_GROUPLET$11'))).click()
time.sleep(2) # hard-coded 2 seconds of sleep due to clicking before javascript is fully loaded
WebDriverWait(driver, wait_time).until(EC.presence_of_element_located((By.ID, 'win3divSCC_NAV_TAB_row$1'))).click()

#switching frame to access html on the page
driver.switch_to.frame(driver.find_element_by_id('main_target_win2'))

#filter the mappings
driver.find_element_by_id("N_EXSP_DRVD_ACAD_GROUP").send_keys("003")

#longer waiting time for the site to retrieve data and to prevent premature timeout
WebDriverWait(driver, wait_time).until(EC.presence_of_element_located((By.ID, 'N_EXSP_DRVD_SEARCH'))).click()
WebDriverWait(driver, longer_wait_time).until(EC.presence_of_element_located((By.ID, 'trN_EXSP_DRVD$0_row2')))

# Extracting data
soup = BeautifulSoup(driver.page_source, 'html.parser')
table = soup.find("table", {"id":"N_EXSP_DRVD$scroll$0"})
table_headers = []
for headers in table.find_all('th'):
    table_headers.append(headers['abbr']) # extract headers

data = {}
count = 1
rows = table.find_all('tr')[3:]

for row in rows:
    i = 0
    mapping = {}
    # use headers as key and data as values
    for row_data in row.find_all('td'): 
        if table_headers[i] == "Pre Approved?":
            if row.find('input', attrs={"checked":"checked"}):
                temp = {
                    table_headers[i]:"Yes"
                }
            else:
                temp = {
                    table_headers[i]:"No"
                }
        else:
            temp = {
                table_headers[i]:row_data.text.strip()
            }
        mapping.update(temp) #combine the key value pairs to one dict
        i = i + 1

    data['Mapping ' + str(count)] = mapping #add the mapping to data
    count = count + 1

json_data = json.dumps(data)

#writes data to json file
if not os.path.exists('output'):
    os.makedirs('output')
with open('output/data.json', 'w') as outfile:
    json.dump(data, outfile, indent=4)

#exit driver
driver.quit()