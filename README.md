Boilerplate-App
===============

This is an more or less empty standalone boilerplate node application. You can use this as a starting point for your node applications. Modify package.json add node binaries to the bin/ directory.
You can also add other binaries like redis, etc.

It is intended to interact with your app through the bin/app shell script. Its configured to call 'index.js' with the node binary from the bin/ dir. 
Besides that it is also possible to set the scripts hash in your package.json (see provided package.json) and call it through npm. For instance npm start from within this dir.
