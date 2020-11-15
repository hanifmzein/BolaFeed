var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BLX8dYQneWp-1Lmm7j7HybJFjO_JdnrpV3zDlpDobXq0lOdwKIUXyxM9obnn_Uq1IJ7Z9mXEIkBofzSgPCXJ8eI",
    "privateKey": "ZW2N8FXU7A91iSY2RtqVOlEUq5gJJPYIX-nAGeADISU"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eg_VSB2uDM4:APA91bH9EnF-Hkg7V7mPLb5x55Y1s-wnzLJpZPmDrMr6vJTK0bXuPp1KlAKakBrdrftQM5cv3w6JkjTpcJowv80jPMDe4lzO5iHUkfP5lM4AqBtyXbK_4K93SD5_AaDZGkNUiuxtx5FS",
    "keys": {
        "p256dh": "BN6ikWS/4kkZOYxtqACW2jEFHHv9TkxGX1FWbbW8a+DZUY3v22HlWb7j2gZyb+DkFLsulNwSl0FOgkIZIAGoMnA=",
        "auth": "KQUZsK5SuvsVmODup2ptJQ=="
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