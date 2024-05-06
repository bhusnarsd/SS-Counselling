#!/bin/bash

# BACKUP_FILE="../dbs/dump.zip"

# mongorestore --host localhost --port 27017 --db MHEDU_Server --archive=$BACKUP_FILE --gzip




#!/bin/bash

# Extract the zip file directly into the ../dbs directory
# unzip -j -o ../dbs/dump.zip -d ../dbs

# Restore the database
mongorestore --host localhost --port 27017 --db MHEDU_Server ../dbs/MHEDU_Server


# mongorestore --username root --password VRuAd2Nvmp4ELHh5 --authenticationDatabase admin --archive=$BACKUP_FILE --gzip --drop


#!/bin/bash

# BACKUP_FILE="../dbs/dump.zip"

# mongorestore --host localhost --port 27017 --db MHEDU_Server ../dbs/MHEDU_Server

# mongorestore --host localhost --port 27017  --archive=$BACKUP_FILE --gzip --nsInclude=MHEDU_Server.*
