export default {
  props: {
    width: {
      type: Number,
      default: 5
    },
    height: {
      type: Number,
      default: 5
    }
  },
  computed: {
    class () {
      return [
        `w-${this.width}`,
        `h-${this.height}`
      ]
    }
  }
}
