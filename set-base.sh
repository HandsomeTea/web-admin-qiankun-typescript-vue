#!/bin/bash
oldstr="<head>"
nsid=${NAMESPACE_ID}
refstr="/"${nsid}"/myconsole/"
newstr="<head><base href=\""${refstr}"\"/>"
sed -i "s#${oldstr}#${newstr}#" /usr/share/nginx/html/index.html
sed -i "s#${oldstr}#${newstr}#" /usr/share/nginx/html/viewmodule/confmodule/index.html

# start nginx
service nginx start
tail -f /var/log/nginx/access.log
