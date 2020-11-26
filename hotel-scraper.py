from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from pyvirtualdisplay import Display
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import ElementNotInteractableException
from selenium.webdriver.common.action_chains import ActionChains
import time, json, random, string
import pandas as pd

df = pd.read_csv (r'C:\Users\prana\Desktop\Stuff\AP\hotels.csv')
url_list = df['URL'].tolist()
chrome_options = webdriver.ChromeOptions()
driver = webdriver.Chrome(options=chrome_options)
jdat = {}
hotel_list = []
with open('progress.txt', 'r') as fp:
    progress = int(fp.read())
new_progress = progress
for i in range(progress,len(url_list)):
    new_progress+=1
    url = url_list[i]
    print(url)
    driver.get(url)
    content = driver.find_elements_by_class_name("ssr-init-26f")
    info = driver.find_element_by_xpath("//script[@type='application/ld+json']")
    json_info = json.loads(info.get_attribute('innerHTML'))
    try:
        name = json_info["name"]
    except:
        print('skipped')
        continue
    city = json_info["address"]["addressRegion"]
    address = json_info["address"]['streetAddress']+" "+json_info["address"]['addressLocality']+" "+json_info["address"]['postalCode']
    try:
        rating = json_info["aggregateRating"]["ratingValue"]
    except:
        rating = "5"
    try:
        price = driver.find_element_by_xpath("//div[@data-provider='Agoda']").get_attribute("data-pernight")
    except:
        price = "NaN"
    image_url = ""
    for each in content:
        response = each.get_attribute('data-ssrev-handlers')
        response = json.loads(response)
        if("Description" in response["load"]):
            description = response["load"][3]['locationDescription']
        if("default" in response["load"]):
            room = response["load"][3]['amenities']['highlightedAmenities']['roomFeatures'] + response["load"][3]['amenities']['nonHighlightedAmenities']['roomFeatures']
            room = [x["amenityNameLocalized"] for x in room]
            room_type = response["load"][3]['amenities']['highlightedAmenities']['roomTypes'] + response["load"][3]['amenities']['nonHighlightedAmenities']['roomTypes']
            room_type = [x["amenityNameLocalized"] for x in room_type]
            hotel = response["load"][3]['amenities']['highlightedAmenities']['propertyAmenities'] + response["load"][3]['amenities']['nonHighlightedAmenities']['propertyAmenities']
            hotel = [x["amenityNameLocalized"] for x in hotel]
        if("Photos" in response["load"]):
            image_url = response["load"][3]["photos"][0]["photo"]["photoSizes"][-1]["url"]
    # print(name,"\n\n",city,"\n\n",address,"\n\n",rating,"\n\n",price,"\n\n",description,"\n\n",room,"\n\n",room_type,"\n\n",hotel,"\n\n",url,"\n\n",image_url)
    data = {}
    data['uniq_id'] = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(33))
    data['property_name'] = name
    data['city'] = city
    data['address'] = address
    data['room_types'] = room_type
    data['hotel_overview'] = description
    data['hotel_star_rating'] = rating
    data['per_person_price'] = price
    data['image_urls'] = image_url
    data['pageurl'] = url
    data['room'] = room
    data['hotel'] = hotel
    hotel_list.append(data)
    # leave = input("exit?")
    print(new_progress)
    with open("progress.txt", "w") as fp:
        fp.write(str(new_progress))
    # if(leave):
        # break
    jdat['hotel'] = hotel_list
    with open('data.json', 'w') as fp:
        json.dump(jdat, fp)
driver.close()
input()
