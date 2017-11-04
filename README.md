# PoTeSt
Portable Television Studio

A WebRTC-based television studio you can operate with a few phones and a laptop! Seems to work ok in Safari and Chrome.

## How to install:

* Download and install

```npm install```

* App is SSL-only so buy a wildcard cert or generate a Let's Encrypt cert pair and place them in the directory:

Filenames are:

`domain.cert.pem` and `private.key.pem`

...or generate some fake ones yourself and add a browser exception when you get an error!

```./signalmaster/generate-ssl-certs.sh```

OK, now you can run it!

```node server.js```

That starts it on port 8080

Want to run it on port 443 like a real SSL genius? On Mac at least, you need root to access low port numbers

```sudo node server.js -p 443```

Want to redirect port 80 to 443 for seamless browser experience?

```sudo node server.js -p 443 -r```

That's it! Connect the PC and open a viewer, connect multiple phones and start a camera session. Tap once on the camera to fullscreen and lock orientation. Double click or type f to fullscreen the viewer. Now stream it!

Potential problems:
I was warned at https://gitter.im/andyet/SimpleWebRTC of one potential issue I ignored. Here's how the convo went down:

```
The Karaoke Research Council @karaokeresearch Oct 09 09:51
@StudioInteractive thank you. How do I actually stop the communication with the peer I do not wish to communicate with? I couldn't find a function on the peer object that is like "stop talking to me."

StudioInteractive @StudioInteractive Oct 12 01:22
@karaokeresearch You can't stop a comminication, because all of your peer(TVSender/TvReciever) are in the same room, and they have to talk with each other. But you can stop/remove the stream in the TVSenders for all TVSenders Peers after they connected to each other. So you can save a lot of Bandwidth . Pseudo code would be something like: simplewebrtc.on('videoAdded', function(video,peer){}) on the TVSender Side : foreach peer that have nick: TVSender . peer.pc.pc.removeStream(simplewebrtc.webrtc.localstreams[0]). after this you have to send a new offer to the peer with peer.pc.offer(config,function(err,expandedOffer){//react on error});

StudioInteractive @StudioInteractive Oct 12 01:24
Better Pseudocode: simplewebrtc.on('videoAdded', function(video,peer){ peer.pc.pc.removeStream(simplewebrtc.webrtc.localstreams[0]); peer.pc.offer(config,function(err,expandedOffer){//react on error});})

StudioInteractive @StudioInteractive Oct 12 01:31
and you have to check peer.nick = "TVSender"

The Karaoke Research Council @karaokeresearch Oct 15 19:30
@StudioInteractive holy moly it works! Thank you! Just to be clear, nothing bad will happen if I don't send a new offer, right? If I don't need to talk to them ever again, I can just removeStream and forget it?

StudioInteractive @StudioInteractive Oct 16 01:18
@karaokeresearch Its better to send the offer, because this is how you inform the other peer, that there are changes with the stream. It can cause error, when a peer is waiting for a stream but never gets one
```

In camera.html when another camera connects to the channel, we stop sending to it:

```peer.pc.pc.removeStream(webrtc.webrtc.localStreams[0]);```

but then I don't "send the offer" because I don't quite know what that means because WebRTC=hard. Will this have a negative impact? Who knows.

One solution to this would be to just use seperate channels for each cameras and use iframes on the viewer for each camera. Or maybe another framework is better suited? Who knows!!! Enjoy PoTeSt!!!

Thanks to SimpleWebRTC!!!!!!!!!!!!!