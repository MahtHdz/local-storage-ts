#!/bin/bash
set -m

# Start mongod in the background
mongod --replSet rs-storage --dbpath /data/db --bind_ip_all &

# Wait for MongoDB to start
sleep 5

# Run the replica set configuration script
mongosh < /scripts/replicaSet.js

# Bring mongod to the foreground
fg
