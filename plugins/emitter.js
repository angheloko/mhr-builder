import emitter from 'tiny-emitter/instance'
export default ({ app }, inject) => {
  inject('emitter', emitter)
}
