FROM node:0.12-onbuild

# URI for API (without trailing /)
ENV API_URL https://beta.openphacts.org/1.5
# Get your own key at https://dev.openphacts.org/admin/access_details
ENV API_APP_ID 1c22cbe7
ENV API_APP_KEY 167a3a3d8539b5d85280e7178f4e62ab

RUN chmod 755 docker/entrypoint.sh
ENTRYPOINT ["/usr/src/app/docker/entrypoint.sh"]

CMD ["npm", "test"]
