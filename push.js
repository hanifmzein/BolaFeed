var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BDSHLXI2iOOVUzwJZUYdofvgsihBo42UzxhsJAETf1Bn1ULHdAwQCBhERyDs4dynUntcKihQOC7N4RAotJ3np-o",
    "privateKey": "I5DCZKDP46z9W01Aw_tkzwVtEcUJa51vKlo__e6Y59g"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cjmtY9vfc1U:APA91bHqvhbPum8cHhZk0rIG8956f9aYHgyPTBHSfJv9lx1YMy7ExGiHf3DBzeESz-scrrAhjGRVQE_Kl5uNGwJULMYY3x5MNQVbn5d0IYgdiWBeSS-zOLIG9GpMZDv9ruYHWBfuEmWA",
    "keys": {
        "p256dh": "BNvD4+1mPv0ntXFwoHV5Lj1gEaRIu14S6Bnv/AhEbra70Mj/DYHgkr6jL1OaKPUtOsdRBEP7nqHNr7+082uX/Hs=",
        "auth": "5LeMB7mHiVHMiJ7WCm87qg=="
    }
};

var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '605731017969',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);