// replicaSet.js
config = {
  "_id": "rs-storage",
  "members": [
    { "_id": 0, "host": "host.docker.internal:27017" },
    { "_id": 1, "host": "host.docker.internal:27018" },
    { "_id": 2, "host": "host.docker.internal:27019" }
  ]
};
rs.initiate(config);
rs.status();
