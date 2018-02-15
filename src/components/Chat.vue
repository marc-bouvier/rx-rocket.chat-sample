<template>
  <div class="chat">
    <div>
      <p>Use Rocket.Chat REST API to get your userId and token</p>
      <div><pre><code>curl -X "POST" "https://chat.myserver.com/api/v1/login" \
-H "Content-Type: application/json; charset=utf-8" \
-d $'{
"username": "my_username",
"password": "my_password"
  }'</code></pre>
      </div>
    </div>
    <div>Rocket.Chat websocket URL : {{webSocketUrl}}
    </div>
    <div>UserId : <input type="text" v-model="userId" :disabled="loggedIn"/>
      Auth Token : <input type="text" v-model="authToken" :disabled="loggedIn"/>
      <button v-if="!loggedIn" v-on:click="login">Login</button>
    </div>
    <div>Username : <input id="login" type="text" v-model="username" :disabled="loggedIn"/>
      Password : <input id="password" type="password" v-model="password" :disabled="loggedIn"/>
      <button v-if="!loggedIn" v-on:click="loginBasic">Login</button>
    </div>
    <div>Room id (default sandbox) : <input type="text" v-model="roomId"/>
      <button v-if="!roomConnected" v-on:click="connectRoom">Subscribe to room</button>
    </div>
    <div>
      Send message : <input type="text" v-on:keyup.enter="sendMessage" v-model="newMessage"/>
      <button v-on:click="sendMessage">Send</button>
    </div>
    <div id="messages" style="max-height: 400px;overflow-y: scroll">
      <div class="message" v-for="(message,messageIndex) in messages" :key="messageIndex">
        <b v-if="formatMessage (message).formattedDate">
          {{formatMessage (message).formattedDate}}</b>
        <code>{{message}}</code>
      </div>
    </div>
  </div>
</template>

<script>
  import rcApi from '../api'

  let api = null
  export default {
    name: 'Chat',
    data() {
      return {
        webSocketUrl: 'wss://open.rocket.chat/websocket',
        connectedToApi: true,
        loggedIn: false,
        userId: '',
        authToken: '',
        username:'',
        password:'',
        roomName: 'sandbox',
        roomId: 'Drjw54ftqGa4antMW',
        roomConnected: false,
        newMessage: '',
        messages: [],
        errors: []
      }
    },
    mounted() {
      api = rcApi.connectToRocketChat (this.webSocketUrl)
      api.onError (error => this.errors.push (error))
      api.onCompletion (() => console.log ("finished"))
      api.onMessage (message => {
        this.messages.push (message)
      })
      api.connectToServer ()
        .subscribe (() => {
            api.keepAlive () // Ping Server
          },
          (error) => {
            this.errors.push (error)
          }
        )
    },
    methods: {
      login() {
        if (!this.loggedIn) {
          api.loginWithAuthToken (this.authToken)
            .subscribe (apiEvent => {
              if (apiEvent.msg === 'result') {
                // success
                this.messages.push (apiEvent.msg)
                this.loggedIn = true
              }
            }, (error) => {
              this.errors.push (error)
            })
        }
      },
      loginBasic() {
        if (!this.loggedIn) {
          api.login (this.username,this.password)
            .subscribe (apiEvent => {
              if (apiEvent.msg === 'result') {
                // success
                this.messages.push (apiEvent.msg)
                this.loggedIn = true
              }
            }, (error) => {
              this.errors.push (error)
            })
        }
      },
      connectRoom() {
        if (!this.roomConnected) {
          api.sendMessage ({
            "msg": "sub",
            "id": '' + new Date ().getTime (),
            "name": "stream-room-messages",
            "params": [
              this.roomId,
              false
            ]
          })
        }
      },
      sendMessage() {
        api.sendMessage ({
          "msg": "method",
          "method": "sendMessage",
          "id": '' + new Date ().getTime (),
          "params": [
            {
              "_id": '' + new Date ().getTime (),
              "rid": this.roomId,
              "msg": this.newMessage
            }
          ]
        })
        this.newMessage = ''
      },
      formatMessage(message) {
        let result = {message}
        if (message.fields !== undefined &&
          message.fields.args !== undefined &&
          message.fields.args.length > 0 &&
          message.fields.args[0].ts !== undefined &&
          message.fields.args[0].ts.$date !== undefined
        ) {
          result.formattedDate = new Date (message.fields.args[0].ts.$date)
        }
        return result
      }
    }
  }
</script>

<style>
</style>
