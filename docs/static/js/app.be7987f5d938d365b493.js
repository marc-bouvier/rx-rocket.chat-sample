webpackJsonp([1],{GjiO:function(e,t){},NHnr:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s("7+uW"),o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var a=s("VU/8")({name:"App"},o,!1,function(e){s("GjiO")},null,null).exports,r=s("/ocq"),i=s("FZ+h"),d=function(e){return new i.RealTimeAPI(e)},u=null,c={name:"Chat",data:function(){return{webSocketUrl:"wss://open.rocket.chat/websocket",connectedToApi:!0,loggedIn:!1,userId:"",authToken:"",username:"",password:"",roomName:"sandbox",roomId:"Drjw54ftqGa4antMW",roomConnected:!1,newMessage:"",messages:[],errors:[]}},mounted:function(){var e=this;(u=d(this.webSocketUrl)).onError(function(t){return e.errors.push(t)}),u.onCompletion(function(){return console.log("finished")}),u.onMessage(function(t){e.messages.push(t)}),u.connectToServer().subscribe(function(){u.keepAlive()},function(t){e.errors.push(t)})},methods:{decoWs:function(){},recoWs:function(){},login:function(){var e=this;this.loggedIn||u.loginWithAuthToken(this.authToken).subscribe(function(t){"result"===t.msg&&(e.messages.push(t.msg),e.loggedIn=!0)},function(t){e.errors.push(t)})},loginBasic:function(){var e=this;this.loggedIn||u.login(this.username,this.password).subscribe(function(t){"result"===t.msg&&(e.messages.push(t.msg),e.loggedIn=!0)},function(t){e.errors.push(t)})},connectRoom:function(){this.roomConnected||u.sendMessage({msg:"sub",id:""+(new Date).getTime(),name:"stream-room-messages",params:[this.roomId,!1]})},sendMessage:function(){u.sendMessage({msg:"method",method:"sendMessage",id:""+(new Date).getTime(),params:[{_id:""+(new Date).getTime(),rid:this.roomId,msg:this.newMessage}]}),this.newMessage=""},formatMessage:function(e){var t={message:e};return void 0!==e.fields&&void 0!==e.fields.args&&e.fields.args.length>0&&void 0!==e.fields.args[0].ts&&void 0!==e.fields.args[0].ts.$date&&(t.formattedDate=new Date(e.fields.args[0].ts.$date)),t}}},m={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"chat"},[e._m(0),e._v(" "),s("div",[e._v("Rocket.Chat websocket URL : "+e._s(e.webSocketUrl)+"\n    ")]),e._v(" "),s("table",[s("tbody",[s("tr",[s("th",[e._v("Token auth")]),e._v(" "),s("td",[e._v("UserId : "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.userId,expression:"userId"}],attrs:{type:"text",disabled:e.loggedIn},domProps:{value:e.userId},on:{input:function(t){t.target.composing||(e.userId=t.target.value)}}})]),e._v(" "),s("td",[e._v("Auth Token : "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.authToken,expression:"authToken"}],attrs:{type:"text",disabled:e.loggedIn},domProps:{value:e.authToken},on:{input:function(t){t.target.composing||(e.authToken=t.target.value)}}})]),e._v(" "),s("td",[e.loggedIn?e._e():s("button",{on:{click:e.login}},[e._v("Login")])])]),e._v(" "),s("tr",[s("th",[e._v("Basic auth")]),e._v(" "),s("td",[e._v("Username : "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{id:"login",type:"text",disabled:e.loggedIn},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}})]),e._v(" "),s("td",[e._v("Password : "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{id:"password",type:"password",disabled:e.loggedIn},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),e._v(" "),s("td",[e.loggedIn?e._e():s("button",{on:{click:e.loginBasic}},[e._v("Login")])])]),e._v(" "),s("tr",[s("th",[e._v("Connect to room")]),e._v(" "),s("td",[e._v("Room id (default sandbox) : "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.roomId,expression:"roomId"}],attrs:{type:"text"},domProps:{value:e.roomId},on:{input:function(t){t.target.composing||(e.roomId=t.target.value)}}})]),e._v(" "),s("td",[e.roomConnected?e._e():s("button",{on:{click:e.connectRoom}},[e._v("Subscribe to room")])])])])]),e._v(" "),s("div",[s("h2",[e._v("Messages")]),e._v(" "),s("div",[e._v("\n        Send message : "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.newMessage,expression:"newMessage"}],attrs:{type:"text"},domProps:{value:e.newMessage},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.sendMessage(t)},input:function(t){t.target.composing||(e.newMessage=t.target.value)}}}),e._v(" "),s("button",{on:{click:e.sendMessage}},[e._v("Send")])]),e._v(" "),s("div",{staticStyle:{"max-height":"400px","overflow-y":"scroll"},attrs:{id:"messages"}},e._l(e.messages,function(t,n){return s("div",{key:n,staticClass:"message"},[e.formatMessage(t).formattedDate?s("b",[e._v("\n            "+e._s(e.formatMessage(t).formattedDate))]):e._e(),e._v(" "),s("code",[e._v(e._s(t))])])}))]),e._v(" "),s("div",[s("button",{on:{click:e.decoWs}},[e._v("Deco Ws")]),e._v(" "),s("button",{on:{click:e.recoWs}},[e._v("Reco Ws")])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("p",[this._v("Use Rocket.Chat REST API to get your userId and token")]),this._v(" "),t("div",[t("pre",[t("code",[this._v('curl -X "POST" "https://chat.myserver.com/api/v1/login" \\\n-H "Content-Type: application/json; charset=utf-8" \\\n-d $\'{\n"username": "my_username",\n"password": "my_password"\n  }\'')])])])])}]};var l=s("VU/8")(c,m,!1,function(e){s("p4kr")},null,null).exports;n.a.use(r.a);var v=new r.a({routes:[{path:"/",name:"Chat",component:l}]});n.a.config.productionTip=!1,new n.a({el:"#app",router:v,components:{App:a},template:"<App/>"})},p4kr:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.be7987f5d938d365b493.js.map