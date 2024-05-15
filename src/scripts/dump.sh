#!/bin/bash
BACKUP_FILE="../dbs"

# rm $BACKUP_FILE

# mongodump --host localhost --port 27017 --db MHEDU_Server --out ../dbs


#!/bin/bash

# Run mongodump command to create dump files
mongodump --host localhost --port 27017 --db DMF --out ../dbs

# Zip the contents of the MHEDU_Server directory
cd ../dbs
zip -r dump.zip DMF/*



# mongodump --host localhost --port 27017 --db MHEDU_Server --archive=$BACKUP_FILE --gzip

# mongodump --username root --password VRuAd2Nvmp4ELHh5 --authenticationDatabase admin --archive=$BACKUP_FILE --gzip