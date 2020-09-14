export const ringtones = {
  data () {
    return {
      ringtoneUrl: 'statics/Ringtones/xylophone.mp3',
      elAudio: ''
    }
  },
  methods: {
    initAudio () {
      this.elAudio = document.getElementById('myAudio')
    },
    playAudio () {
      this.elAudio.play()
    },
    stopAudio () {
      this.elAudio.pause()
    }
  },
  mounted () {
    this.initAudio()
  }
}
