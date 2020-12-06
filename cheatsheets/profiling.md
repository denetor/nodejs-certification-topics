# Profiling
Profiling example:
Prepare a profile-login.json file containing the data that will be posted:
```json
{"email":"johndoe@example.com","password":"password"}
```
Then run the server with `--prof` option to enable profiling:
```
$ node --prof main.js
```
Now use `ab` utility to send multiple requests:
```
$ ab -k -c 20 -n 250  -H  "accept: */*" -p profile-login.json -T "application/json" http://localhost:3000/auth/login

This is ApacheBench, Version 2.3 <$Revision: 1807734 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 100 requests
Completed 200 requests
Finished 250 requests


Server Software:        
Server Hostname:        localhost
Server Port:            3000

Document Path:          /auth/login
Document Length:        158 bytes

Concurrency Level:      20
Time taken for tests:   1.719 seconds
Complete requests:      250
Failed requests:        0
Keep-Alive requests:    250
Total transferred:      102000 bytes
Total body sent:        56750
HTML transferred:       39500 bytes
Requests per second:    145.47 [#/sec] (mean)
Time per request:       137.490 [ms] (mean)
Time per request:       6.874 [ms] (mean, across all concurrent requests)
Transfer rate:          57.96 [Kbytes/sec] received
                        32.25 kb/s sent
                        90.21 kb/s total

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       0
Processing:    82  135  26.2    131     211
Waiting:       82  135  26.2    131     211
Total:         82  135  26.2    131     211

Percentage of the requests served within a certain time (ms)
  50%    131
  66%    145
  75%    152
  80%    157
  90%    171
  95%    183
  98%    202
  99%    205
 100%    211 (longest request) 
```
As output there will be also file called `isolate-xxxxxxxxxxxx-v8.log`
It can be conferted in readable form with:
```
$ node --prof-process isolate-0x3ec63c0-8805-v8.log > processed.txt
```
Some parts of its content:
```
 [Shared libraries]:
   ticks  total  nonlib   name
   1410   62.5%          /usr/local/bin/node
    110    4.9%          /lib/x86_64-linux-gnu/libc-2.27.so
      3    0.1%          /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.25
      1    0.0%          [vdso]

 [JavaScript]:
   ticks  total  nonlib   name
      8    0.4%    1.1%  LazyCompile: *resolve path.js:973:10
      3    0.1%    0.4%  LazyCompile: *self /home/nicola/nodeprojects/smartrms/node_modules/cli-color/bare.js:71:16
      3    0.1%    0.4%  LazyCompile: *<anonymous> /home/nicola/nodeprojects/smartrms/node_modules/typeorm/query-builder/transformer/RawSqlResultsToEntityTransformer.js:110:43
      2    0.1%    0.3%  LazyCompile: *printMessage /home/nicola/nodeprojects/smartrms/node_modules/@nestjs/common/services/logger.service.js:77:24
      2    0.1%    0.3%  LazyCompile: *normalizeString path.js:52:25
      2    0.1%    0.3%  LazyCompile: *debug /home/nicola/nodeprojects/smartrms/node_modules/@nestjs/common/services/logger.service.js:55:17

 [C++]:
   ticks  total  nonlib   name
    105    4.7%   14.3%  node::contextify::ContextifyContext::CompileFunction(v8::FunctionCallbackInfo<v8::Value> const&)
     51    2.3%    7.0%  epoll_pwait
     35    1.6%    4.8%  node::native_module::NativeModuleEnv::CompileFunction(v8::FunctionCallbackInfo<v8::Value> const&)
     33    1.5%    4.5%  void node::StreamBase::JSMethod<&(int node::StreamBase::WriteString<(node::encoding)1>(v8::FunctionCallbackInfo<v8::Value> const&))>(v8::FunctionCallbackInfo<v8::Value> const&)
     
 [Summary]:
   ticks  total  nonlib   name
     29    1.3%    4.0%  JavaScript
    700   31.0%   95.6%  C++
    113    5.0%   15.4%  GC
   1524   67.6%          Shared libraries
      3    0.1%          Unaccounted

 [C++ entry points]:
   ticks    cpp   total   name
    359   30.7%   15.9%  v8::internal::Builtin_DatePrototypeToLocaleString(int, unsigned long*, v8::internal::Isolate*)
    292   25.0%   12.9%  v8::internal::Builtin_HandleApiCall(int, unsigned long*, v8::internal::Isolate*)
    267   22.8%   11.8%  node::task_queue::RunMicrotasks(v8::FunctionCallbackInfo<v8::Value> const&)
     22    1.9%    1.0%  fwrite
     21    1.8%    0.9%  write
```
Further down the file there is the full tree of calls, where we can search for expensive calls found in the first part.

### Profiling resources
- https://nodejs.org/en/docs/guides/simple-profiling

