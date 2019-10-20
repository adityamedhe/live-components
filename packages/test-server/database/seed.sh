#! /bin/bash

mongoimport -v --jsonArray --drop -c companies companies.json
mongoimport -v --jsonArray --drop -c stockinfos stockinfos.json