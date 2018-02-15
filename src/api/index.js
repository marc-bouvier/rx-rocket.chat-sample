import {RealTimeAPI} from 'rocket.chat.realtime.api.rxjs'

export default {
  connectToRocketChat(rocketChatRealTimeApiUrl) {
    return new RealTimeAPI (rocketChatRealTimeApiUrl)
  }
}
