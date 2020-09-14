export const fcm = {
  data () {
    return {
      fcmInfo: ''
    }
  },
  methods: {
    fcmGetToken () {
      let self = this
      window.FirebasePlugin.getToken(function (token) {
        self.$q.localStorage.set('pluktime_fcm_token', token)
      }, function (error) {
        console.log(error)
      })
    },
    fcmOnNotifOpen () {
      let self = this
      console.log('On Notification Open Event..')
      window.FirebasePlugin.onNotificationOpen(function (notification) {
        console.log(notification)
        let notif = {
          id: notification.id,
          title: notification.title,
          body: notification.body
        }
        let pluktimePhoneLogs = self.$q.localStorage.get.item('pluktime_phoneLogs')
        if (!pluktimePhoneLogs) pluktimePhoneLogs = []
        // push the object
        pluktimePhoneLogs.push(notification)
        self.$q.localStorage.set('pluktime_phoneLogs', pluktimePhoneLogs)
        if (self.$q.platform.is.ios) {
          notif = {
            id: notification.id,
            title: notification.aps.alert.title,
            body: notification.aps.alert.body
          }
        }
        if (notif.title) {
          self.$q.notify({
            type: 'info',
            position: 'top',
            message: notif.body,
            icon: 'call'
          })
        }
        let messageNotif = notification.type + '... From ' + notification.from_data + '...'
        if (notification.type === 'incoming_call') {
          messageNotif += ' play Ringing....'
          // self.$router.push('/sip/incoming_call')
          self.$q.localStorage.set('pluktime_lastCallIncoming', notification)
          self.$router.push({
            name: 'incoming_call',
            params: {
              from_data: notification.from_data,
              call_uuid: notification.call_uuid,
              call_timestamp: notification._fcm_api_sent_timestamp,
              isVideoCall: false
            }
          })
        } else if (notification.type === 'incoming_call_rejecting') {
          console.log('REJECTING CALL...')
          self.$router.push('/home/contact')
        } else if (notification.type === 'incoming_call_pickup_by_other') {
          console.log('PICKUP CALL BY OTHER...')
          self.$router.push('/home/contact')
        }
        console.log(messageNotif)
      }, function (error) {
        console.log(error)
      })
    },
    fcmGetIosPermission () {
      if (this.$q.platform.is.ios) {
        window.FirebasePlugin.grantPermission()
      }
    },
    fcmGetToken2 () {
      let self = this
      window.FirebasePlugin.getToken(function (token) {
        if (self.$q.platform.is.ios) {
          self.$q.localStorage.set('pluktime_fcm_token', token)
          console.log(token)
        }
        if (!self.$q.localStorage.has('pluktime_fcm_token')) {
          self.$q.localStorage.set('pluktime_fcm_token', token)
          console.log(token)
        }
      }, function (error) {
        console.log(error)
      })
    }
  }
}
