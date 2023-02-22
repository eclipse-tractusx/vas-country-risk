#!/bin/bash


custom_env_vars='{REACT_URL_ENV:"'$REACT_URL_ENV'",REACT_APP_AUTH_URL:"'$REACT_APP_AUTH_URL'"}'
custom_env_vars_anchor='{REACT_URL_ENV:"http://localhost:8080",REACT_APP_AUTH_URL:"http://localhost:8080/auth"}'

index_html_reference=`cat /usr/share/nginx/html/index.html.reference`
index_html=${index_html_reference//$custom_env_vars_anchor/$custom_env_vars}
echo "$index_html" > /usr/share/nginx/html/index.html