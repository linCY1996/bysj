(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/reg/reg"],{"5e97":function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return i})},"5fd5":function(t,n,e){"use strict";(function(t,o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;i(e("f317"));function i(t){return t&&t.__esModule?t:{default:t}}var a=function(){return e.e("components/m-input").then(e.bind(null,"dedd"))},u={components:{mInput:a},data:function(){return{account:"",password:"",email:"",phone:""}},methods:{register:function(){this.account.length>5?t.showToast({icon:"none",title:"用户名最多5个字符"}):this.password.length<6?t.showToast({icon:"none",title:"密码最短为 6 个字符"}):this.email.length<3||!~this.email.indexOf("@")?t.showToast({icon:"none",title:"邮箱地址不合法"}):/^1\d{10}$/.test(this.phone)?this.$http.register({username:this.account,pass:this.password,email:this.email,tel:this.phone}).then(function(t){console.log(o(t," at pages\\reg\\reg.vue:83"))}):t.showToast({icon:"none",title:"电话号码不合法"})}}};n.default=u}).call(this,e("6e42")["default"],e("0de9")["default"])},"9a2e":function(t,n,e){"use strict";e.r(n);var o=e("5e97"),i=e("b38b");for(var a in i)"default"!==a&&function(t){e.d(n,t,function(){return i[t]})}(a);e("9b88");var u=e("2877"),s=Object(u["a"])(i["default"],o["a"],o["b"],!1,null,null,null);n["default"]=s.exports},"9b88":function(t,n,e){"use strict";var o=e("ae65"),i=e.n(o);i.a},ae65:function(t,n,e){},b38b:function(t,n,e){"use strict";e.r(n);var o=e("5fd5"),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);n["default"]=i.a}},[["ad7b","common/runtime","common/vendor"]]]);