"use strict";(self.webpackChunksetoxarts=self.webpackChunksetoxarts||[]).push([[224],{6224:(e,t,r)=>{r.r(t),r.d(t,{ContactPage:()=>q});var a=r(2791);const s={_origin:"https://api.emailjs.com"},n=(e,t,r)=>{if(!e)throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t)throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!r)throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";return!0};class o{constructor(e){this.status=e?e.status:0,this.text=e?e.responseText:"Network Error"}}const i=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new Promise(((a,n)=>{const i=new XMLHttpRequest;i.addEventListener("load",(e=>{let{target:t}=e;const r=new o(t);200===r.status||"OK"===r.text?a(r):n(r)})),i.addEventListener("error",(e=>{let{target:t}=e;n(new o(t))})),i.open("POST",s._origin+e,!0),Object.keys(r).forEach((e=>{i.setRequestHeader(e,r[e])})),i.send(t)}))},l=(e,t,r,a)=>{const o=a||s._userID,l=(e=>{let t;if(t="string"===typeof e?document.querySelector(e):e,!t||"FORM"!==t.nodeName)throw"The 3rd parameter is expected to be the HTML form element or the style selector of form";return t})(r);n(o,e,t);const d=new FormData(l);return d.append("lib_version","3.12.1"),d.append("service_id",e),d.append("template_id",t),d.append("user_id",o),i("/api/v1.0/email/send-form",d)},d="Form_form__nYddx",c="Form_info__c+s1f",m="Form_contactForm__lAD68";var u=r(1418),p=r.n(u),h=r(5646),f=r(795),g=r(2509),v=r(5624),x=r(7645),y=r(6721),_=r(7840),w=r(184);const j=e=>{let{desc:t}=e;const r=(0,a.useRef)(null),{isMobileOrTablet:s,isLaptop:n}=(0,v.w_)(),[o,i]=(0,a.useState)(""),[u]=(0,x.KO)(y.cE),j=(0,_.F)(u),[b,q]=(0,a.useState)(!1),k=()=>{var e,t;const a=null===(e=r.current)||void 0===e?void 0:e.querySelectorAll("input[required]"),s=null===(t=r.current)||void 0===t?void 0:t.querySelectorAll("textarea[required]"),n=Array.from(a||[]).every((e=>""!==e.value.trim()))&&Array.from(s||[]).every((e=>""!==e.value.trim()));q(n)};return(0,w.jsxs)(g.Z,{width100:!0,flex:{direction:s||n?"column":"row",y:"flex-start"},gapArray:[4],children:[(0,w.jsx)(f.P,{...t,mode:"paragraph",textAlign:"center"}),(0,w.jsxs)("form",{ref:r,className:p()(d,m),onSubmit:e=>{e.preventDefault(),b?l("gmail","contact-seto",r.current,"bVxK7PZwLIutCAifw").then((e=>{console.log("sent")}),(e=>{console.error("didint work",e)})):alert("Please fill out all required fields.")},children:[(0,w.jsxs)("div",{className:c,children:[(0,w.jsx)("input",{type:"text",name:"user_name",required:!0,placeholder:j.form.name,onChange:k}),(0,w.jsx)("input",{type:"email",name:"user_email",required:!0,placeholder:j.form.email,onChange:k})]}),(0,w.jsxs)("div",{className:c,children:[(0,w.jsx)("input",{type:"text",name:"company_name",placeholder:j.form.companyName,onChange:k}),(0,w.jsx)("input",{type:"text",name:"budget",placeholder:j.form.budget,onChange:e=>{const t=e.target.value.replace(/[^0-9.]/g,"");i("CAD ".concat(t))},value:o})]}),(0,w.jsx)("textarea",{onKeyDown:e=>{e.target.style.height="inherit",e.target.style.height="".concat(e.target.scrollHeight,"px")},onChange:k,name:"message",placeholder:j.form.message,required:!0}),(0,w.jsx)(h.z,{variant:"fancy",disabled:!b,children:j.buttons.send})]})]})};var b=r(8574);const q=e=>e&&(0,w.jsx)(b.g,{variant:"dark",strokes:!0,title:null===e||void 0===e?void 0:e.title,children:(0,w.jsx)(j,{...null===e||void 0===e?void 0:e.form})})}}]);
//# sourceMappingURL=224.259119d7.chunk.js.map