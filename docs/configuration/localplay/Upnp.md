# Upnp Localplay

Upnp is a protocol for remote controlling a music/video player over a network. Commonly it's found in TVs network media players and software like Kodi. If you use a controller like [BubbleUPnP](https://play.google.com/store/apps/details?id=com.bubblesoft.android.bubbleupnp&hl=en_US) you can control the renderer remotely.

## Testing Upnp

After you have enabled UPnP as your localplay instance you need to find a renderer to serve to.

With BubbleUPnP you can search your local network and find your local renderer.

![image](https://user-images.githubusercontent.com/1305249/87518475-ac4ef700-c6c3-11ea-84b1-a7104c63d96d.png)

For example; there is a local renderer on my network running on Kodi so the URL for my Upnp instance is:

```URL
http://192.168.1.18:1221
```

You can then also try and load that link in a browser and you should be getting an XML response.

![image](https://user-images.githubusercontent.com/1305249/87518170-4498ac00-c6c3-11ea-872a-7aa5ef2e77d4.png)

Now that you've found a local URL on your LAN you can try playing from the Ampache UI!
