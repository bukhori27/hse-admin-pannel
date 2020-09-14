export const pluktime = {
  data () {
    return {
      pluktimeIsDevMode: false,
      pluktimeInfo: '',
      pluktimeUserRegister: {},
      pluktimeUserRegisterAndroid: {
        username: '',
        email: '',
        phoneNumber: ''
      },
      pluktimeUserRegisterIOS: {
        username: '',
        email: '',
        phoneNumber: ''
      }
    }
  },
  methods: {
    pluktimeGetDeviceInfo () {
      let deviceCordova = window.device
      // console.log(deviceCordova)
      this.deviceInfo = deviceCordova
      return deviceCordova
    },
    pluktimeGetAppInfo () {
      let acnAppInfo = window.acnAppInfo
      let appInfo = {
        app_name: acnAppInfo.appName,
        package_name: acnAppInfo.packageName,
        version: acnAppInfo.version,
        version_code: acnAppInfo.versionCode,
        hash_code: acnAppInfo.hashCode,
        installer: acnAppInfo.installer
      }
      return appInfo
    },
    initDevModeRegistration () {
      if (this.pluktimeIsDevMode) {
        if (this.$q.platform.is.ios) {
          this.pluktimeUserRegister = this.pluktimeUserRegisterIOS
        } else {
          this.pluktimeUserRegister = this.pluktimeUserRegisterAndroid
        }
        this.username = this.pluktimeUserRegister.username
        this.email = this.pluktimeUserRegister.email
        this.phoneNumber = this.pluktimeUserRegister.phoneNumber
      }
    },
    storeDeviceInfo () {
      let pluktimeDeviceInfo = this.pluktimeGetDeviceInfo()
      this.$q.localStorage.set('pluktime_device_info', pluktimeDeviceInfo)
    },
    storeAppInfo () {
      let pluktimeAppInfo = this.pluktimeGetAppInfo()
      this.$q.localStorage.set('pluktime_app_info', pluktimeAppInfo)
    },
    isAuth () {
      let personalAccounts = this.$q.localStorage.get.item('pluktime_personalaccounts')
      if (personalAccounts && personalAccounts.phonenumber !== '') {
        console.log('Authenticated...')
        this.$router.push('/home/timeline')
      } else {
        this.$router.push('')
      }
    },
    pluktimeCheckBackgroundMode () {
      if (!window.cordova.plugins.backgroundMode.isEnabled) {
        window.cordova.plugins.backgroundMode.enable()
        console.log(window.cordova.plugins.backgroundMode.isEnabled())
      }
    }
  }
}
