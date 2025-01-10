# Existence of CCTVsys
This was my personal webpage intended for streaming surveillance system (through local or public RTSP). It was locally hosted with free tunneling services (serveo and localtunnel instead of configuring ports or NGROK which changing subdomain name requires you to subscribe to their plan.

# Mechanism
This webpage shows RTSP live stream from local or public networks. In the hood, it is processed by the ffmpeg to handle raw video and convert it into HLS to support playback in browsers like Chrome. It records stream as buffers and saves as segmented files with specific time duration and file limit.

# What you need?
I recommend any Linux distributions although any NT (Windows), Be and UNIX-like systems will do. I'm sure you already know how to install binaries from terminal.

1. Install the binaries: `ffmpeg`, `nodejs` and `npm`

2. Then install the Node.js dependencies by doing `npm install express fluent-ffmpeg http-server cors`
3. You may also need to create a directory to store saved buffers by doing `mkdir -pv public/videos/camera1` and so on.

# Source Configuration
You need to configure apps.js to specify address located at `const rtspStream1 = 'EDITME';` 

Change EDITME into something like this: rtsp://192.168.1.1/blah/blah. You may add or modify ffmpeg options to suit your needs. It is located at line 16.

You should change the html contents but not the scripts.
# How to run the server?
Do `node app.js` and open the link provided. It usually http://localhost:3000

# Serve the Server into Public
Now it's up to you on how to do it. But if you can't open a port because you are behind a specific internet service provider, you may route it into tunneling services. I do not recommend serveo.net because it is now unstable as hell.
