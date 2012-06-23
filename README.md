Node Boilerplate App
====================

The Node Boilerplate App is intended to use for starting a standalone node.js application. (It is not a boilerplate for any node module you would publish to npm)

Look at the package.json file and modify it to fit your needs. Add a node binary to the `bin/{Linux,Darwin}-{x86_64,arm,x86}` (e.g.: `bin/Linux-x86_64` or `bin/Darwin-x86_64`) directory. Depending on the platforms your app will and should run. 
You should also add all other binaries your app needs like redis, etc. If you want you can also rename the `bin/app` to whatever you like.
In the end everything needed to run your application should be in your application (this) directory. In this way it should be possible to pack it, copy it to another host machine, unpack it and run it.

To interact with your app (start, stop, etc.), call the `bin/app` shell script. It call a configured script (Default: `index.js`) with the node binary provided in the `bin/` directory. 
Besides that it is also possible to set the scripts and config hash in your `package.json` (see provided package.json) and interact with your app through npm. For instance call `npm start` or `npm stop` to start and stop your application. This would call `bin/app` start in fact.

When calling `bin/app` the first time it will also create symlinks to the binaries found in bin/{PLATFORM} to bin/ and `node_modules/.bin/` to bin/.


LICENSE
=======

The MIT License

Copyright (c) 2012 Thomas Fritz

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
