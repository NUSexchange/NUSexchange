##########
# This script returns the list of possible partner unis ranked based on the total number of mappable mods #
##########
import json
import sys

# Read database JSON file
with open("./routes/results/Database.json","r") as f:
    database = json.load(f)

# take input from the javascript
info = json.loads(sys.argv[1])
mods = info["modules"]
countries = [info["countryFilter"]]

if countries[0] == "All countries":
    countries = ['Australia', 'Austria', 'Belgium', 'Canada', 'China',
    'Denmark','England','Estonia','Finland','Germany', 'Hong Kong',
    'Hungary', 'Ireland', 'Israel', 'Italy', 'Japan', 'Mexico', 'Netherlands', 
    'New Zealand', 'Norway', 'Poland', 'Scotland', 'Singapore',
    'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Taiwan',
    'Thailand', 'Turkey', 'USA']
    
# function to rank unis

def rank_unis(mods, countries):
    result = {}

    for mod in mods:

        # See if the mod is even available for exchange, if not then alert and look at next mod
        try:
            country_dict = database[mod]

        except KeyError as err:
            #             print(f"{mod} not offered for exchange")
            continue

        #         name,credits = NUS_mod_lookup[mod]["Title"],NUS_mod_lookup[mod]["Credits"]
        #         mod_name = f"{mod} {credits} {name}"
        for country in countries:
            # See if the mod is available in this country, if not then alert and continue
            try:
                partner_unis = country_dict[country]

            except KeyError as err:
                #                 print(f"{mod} not offered in {country}")
                continue

            for pu in partner_unis.keys():
                try:  # If this fails it means the uni has not been installed in results
                    result[pu]['Total Mappable'] += 1
                except KeyError as err:
                    result[pu] = {"University": pu,
                                  "Total Mappable": 1,
                                  "Country": country,
                                  "Modules": []}
                finally:
                    item = {"Module": mod,
                            "Title": database[mod]["Title"],
                            "Credits": database[mod]["Credits"],
                            "Partner Modules": partner_unis[pu]["Modules"]}

                    result[pu]["Modules"].append(item)
    #     return result

    # Order the results and put them into a list
    order = sorted(result, key=lambda k: result[k]["Total Mappable"], reverse=True)
    final = []

    for pu in order:
        final.append(result[pu])

    print(final)
    return final

# mods to map

# Function to rank unis based on input fields and export them to a json file
def output(mods,countries):
    result = rank_unis(mods,countries)
    # out_file = open("./output.json", "w")
    # json.dump(result, out_file, indent = 2)
    # out_file.close()

# Uncomment to run code on test case
output(mods, countries) 