#!/bin/bash
echo `date +%FT%T%Z` "- docker-entrypoint.sh started !"
set -e

list=$(find /usr/share/nginx/html -name 'main.*.js')

# usage: file_env VAR [DEFAULT]
#    ie: file_env 'XYZ_DB_PASSWORD' 'example'
# (will allow for "$XYZ_DB_PASSWORD_FILE" to fill in the value of
#  "$XYZ_DB_PASSWORD" from a file, especially for Docker's secrets feature)
file_env() {

        local var="$1"
        local fileVar="${var}_FILE"
        local def="${2:-}"
        if [ "${!var:-}" ] && [ "${!fileVar:-}" ]; then
                echo >&2 "error: both $var and $fileVar are set (but are exclusive)"
                exit 1
        fi
        local val="$def"
        if [ "${!var:-}" ]; then
                val="${!var}"
        elif [ "${!fileVar:-}" ]; then
                val="$(< "${!fileVar}")"
        fi
        export "$var"="$val"
        unset "$fileVar"
}
file_env 'BASEURL' 'research'
file_env 'RESEARCH_APIURL'
file_env 'HR_APIURL'
file_env 'KEYCLOAK_PUBLIC_JSON'

# Verificando se o arquivo original ja existe e se nao o criando.
if [ -f "${list}.ORIG" ]
then
  cp "${list}.ORIG" ${list}
else
  cp ${list} "${list}.ORIG"
fi

# Defining environment variables
sed -i "s;<research_apiurl>;$RESEARCH_APIURL;g" ${list}
sed -i "s;<hr_apiurl>;$HR_APIURL;g" ${list}
sed -i "s;\"<keycloak_public_json>\";'$KEYCLOAK_PUBLIC_JSON';g" ${list}

if grep "try_files" ./etc/nginx/conf.d/default.conf;
then
  echo "Try file already configured"
else
  sed -i "/index  index.html index.htm;/a \        try_files \$uri \$uri/ \/$BASEURL\/index.html;" ./etc/nginx/conf.d/default.conf
  sed -i "s/location \/ {/location \/$BASEURL {/g" ./etc/nginx/conf.d/default.conf

  mv /usr/share/nginx/html/ /usr/share/nginx/html$BASEURL
  mkdir /usr/share/nginx/html
  mv /usr/share/nginx/html$BASEURL/ /usr/share/nginx/html/$BASEURL
fi

echo `date +%FT%T%Z` "- docker-entrypoint.sh finished..."

exec "$@"
