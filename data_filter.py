# import module 
import csv
# read the csv file 
csvFile = csv.reader(open('./data/DECENNIALPL2020.P1-Data_BlockID_Extracted.csv',"r"))

i = 0
for row in csvFile:
        # if i > 3: break
        if i > 0:
            row[0] = row[0][:-3]
        i += 1

for row in csvFile:
    print(row[0])