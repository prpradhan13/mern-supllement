"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[244],{8244:(e,s,a)=>{a.r(s),a.d(s,{default:()=>o});var t=a(5294),r=(a(7162),a(2791)),l=a(7689),n=a(3402),c=a(184);const o=()=>{const[e,s]=(0,r.useState)(""),[a,o]=(0,r.useState)(""),[i,m]=(0,r.useState)(""),u=(0,l.s0)();return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)("div",{className:"signup_page",children:[(0,c.jsx)("h2",{children:" Login "}),(0,c.jsxs)("form",{className:"form",onSubmit:async s=>{s.preventDefault();try{const s=await t.Z.post("/api/v1/auth/forgot-password",{email:e,newPassword:i,answer:a});s&&s.data.success?(n.ZP.success(s.data&&s.data.message),u("/login")):n.ZP.error(s.data.message)}catch(r){n.ZP.error("Something went wrong")}},children:[(0,c.jsxs)("div",{className:"form-sec",children:[(0,c.jsx)("label",{className:"form-label",children:"Email address:"}),(0,c.jsx)("input",{type:"email",value:e,onChange:e=>s(e.target.value),className:"form-input"})]}),(0,c.jsxs)("div",{className:"form-sec",children:[(0,c.jsx)("label",{className:"form-label",children:"Answer:"}),(0,c.jsx)("input",{type:"text",value:a,onChange:e=>o(e.target.value),className:"form-input"})]}),(0,c.jsxs)("div",{className:"form-sec",children:[(0,c.jsx)("label",{className:"form-label",children:"Password:"}),(0,c.jsx)("input",{type:"password",value:i,onChange:e=>m(e.target.value),className:"form-input"})]}),(0,c.jsx)("button",{type:"submit",className:"form_btn",children:"Submit"})]})]})})}},7162:()=>{}}]);
//# sourceMappingURL=244.2d73eb6b.chunk.js.map