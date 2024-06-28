#!/bin/bash

# Variables
JDBC_URL="https://jdbc.postgresql.org/download/postgresql-42.7.3.jar"
JDBC_PATH="./postgresql.jar"

# Download the JDBC driver
if [ ! -f "$JDBC_PATH" ]; then
  echo "Downloading PostgreSQL JDBC driver..."
  wget $JDBC_URL -O $JDBC_PATH
fi

# Run Liquibase
liquibase --changeLogFile=db.changelog.xml \
          --url=jdbc:postgresql://localhost:5432/ffc_grants_desirability_scoring \
          --username=postgres \
          --password=ppp \
          --driver=org.postgresql.Driver \
          --classpath=$JDBC_PATH \
          update
