#!/usr/bin/python
from operator import itemgetter
from datetime import datetime, date
from google_spreadsheet.api import SpreadsheetAPI
from config import GOOGLE_SPREADSHEET


def get_festivals(sheet_key='1DC5i2FD4bwZFQu-BplE3vfpEUNVezy3TC2NVmKeXGkM', sheet_id='od6'):
    """Uses python_google_spreadsheet API to read sheet"""
    api = SpreadsheetAPI(GOOGLE_SPREADSHEET['USER'],
        GOOGLE_SPREADSHEET['PASSWORD'],
        GOOGLE_SPREADSHEET['SOURCE'])
    sheet = api.get_worksheet(sheet_key, sheet_id)
    full_list = sheet.get_rows()
    festivals = restructure_festivals(full_list)
    return festivals


def restructure_festivals(sheet_data):
    # If a festival has already happened, mark as past for filter
    now = date.today()
    now = date(2014, 07, 22)
    festival_names = []
    new_list = []
    for festival in sheet_data:
        name = festival['name']
        end_date = datetime.strptime(festival['enddate'], "%m/%d/%Y").date()
        start_date = datetime.strptime(festival['startdate'], "%m/%d/%Y").date()
        ongoing = False
        if now >= start_date and now <= end_date:
            ongoing = True
        past = False
        if end_date < now:
            past = True
        event = {'start_date': start_date,
            'end_date': end_date,
            'past': past,
            'address': festival['address'],
            'city': festival['city'],
            'state': festival['state']}

        if name not in festival_names:
            festival_names.append(name)

            this_fest = {'name': name,
                'dates': [[start_date, end_date]],
                'city': festival['city'],
                'state': festival['state'],
                'genre': festival['genre'],
                'start_date': start_date,
                'end_date': end_date,
                'ongoing': ongoing,
                'events': [event]}
            new_list.append(this_fest)
        else:
            for existing in new_list:
                if name == existing['name']:
                    if festival['city'] != existing['city']:
                        existing['city'] = 'Multiple Locations'
                    if festival['state'] != existing['state']:
                        existing['state'] = False
                    existing['events'].append(event)
                    print existing['name'], existing['start_date'], start_date
                    if start_date < existing['start_date']:
                        existing['start_date'] = start_date
                    if end_date > existing['end_date']:
                        existing['end_date'] = end_date

                    if ongoing:
                        existing['ongoing'] = True

    festival['past'] = False
    for festival in new_list:
        if festival['end_date'] < now:
            festival['past'] = True
            # below line allows me to keep date ordering but moves old festivals
            # to bottom
            festival['start_date'] = festival['start_date'].replace(year=2020)
        elif festival['start_date'] < now:
            if festival['ongoing']:
                festival['start_date'] = now
            else:
                for event in festival['events']:
                    if event['start_date'] > now:
                        festival['start_date'] = event['start_date']
                        break

    festivals = sorted(new_list, key=itemgetter('start_date'))
    return festivals
