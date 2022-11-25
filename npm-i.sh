#!/bin/bash

cd client
npm i &
# process_id1=$!

cd ../server
npm i &
# process_id2=$!

cd ../dev 
npm i
