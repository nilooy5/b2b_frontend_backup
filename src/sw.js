self.addEventListener('push', function(event) {
    const notification_data = JSON.parse(event.data.text());
    const title = notification_data.title || "Attention!";
    const options = {
        tag : 'sheba-push-notification',
        data: {
            link: notification_data.link
        }
    };

    event.waitUntil(
        clients.matchAll({
            includeUncontrolled: true
        }).then(function(own_clients) {
            let show_notification = true;
            if(own_clients.length) {
                for(let i = 0; i < own_clients.length; i++ ) {
                    if(own_clients[i].visibilityState === "visible") {
                        show_notification = false;
                        break;
                    }
                }
            }
            if(show_notification) {
               var x=self.registration.showNotification(title, options);
               event.waitUntil(x)
            }
        })
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({
            includeUncontrolled: true
        }).then(function(own_clients) {
            let open_link = true;
            if(own_clients.length) {
                for(let i = 0; i < own_clients.length; i++ ) {
                    if(own_clients[i].url === event.notification.data.link) {
                        own_clients[i].focus();
                        open_link = false;
                        break;
                    }
                }
            }
            if(open_link) {
                clients.openWindow(event.notification.data.link);
            }
        })
    );
});

