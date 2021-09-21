import json
import os
import requests
from bs4 import BeautifulSoup

url = 'https://nus.edu.sg'
x = requests.get('https://www.nus.edu.sg/gro/global-programmes/student-exchange/partner-universities')
soup = BeautifulSoup(x.content, 'html.parser')

data = {}
table_headers = []
count = 0

for section in soup.find_all('div', class_='accordion-list'):
    for row in section.find_all('h4'):
        data[row.text] = []
        table_headers.append(row.text)

for section in soup.find_all('div', class_='show-more'):
    for row in section.find_all('li'):
        name = ""
        if row.a.text == "" or row.a.text == "T":
            for a in row.find_all('a'):
                name = name + a.text
        else:
            name = row.a.text

        if "nus.edu.sg" in row.a.get('href'):
            link = row.a.get('href')
        else:
            link = url + row.a.get('href')

        temp = {
            'University': " ".join(name.split()),
            'Link': link
        }

        data[table_headers[count]].append(temp)
    count = count + 1


print(data)

json_data = json.dumps(data)

if not os.path.exists('output'):
    os.makedirs('output')
with open('output/universitydata.json', 'w') as outfile:
    json.dump(data, outfile, indent=4)