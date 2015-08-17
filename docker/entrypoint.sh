#!/bin/sh
set -e
cd /usr/src/app
sed -i "s,app_id [^ ]*,app_id $API_APP_ID," package.json
sed -i "s,app_key [^ ]*,app_key $API_APP_KEY," package.json
sed -i "s,app_url [^ ]*,app_url $API_URL," package.json
exec "$@"
