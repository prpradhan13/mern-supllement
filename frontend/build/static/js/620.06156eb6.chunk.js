"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[620],{8696:(e,t,a)=>{a.d(t,{Z:()=>c});a(5563);var r=a(1087),s=a(184);const c=()=>(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:"admin_page_left",children:[(0,s.jsx)("h1",{children:" Admin Pannel "}),(0,s.jsxs)("div",{className:"admin_page_left_btn",children:[(0,s.jsx)(r.rU,{to:"/profile/admin/create-category",children:(0,s.jsx)("button",{className:"btns",children:"Create Category"})}),(0,s.jsx)(r.rU,{to:"/profile/admin/create-product",children:(0,s.jsx)("button",{className:"btns",children:"Create Products"})}),(0,s.jsx)(r.rU,{to:"/profile/admin/products",children:(0,s.jsx)("button",{className:"btns",children:"All Products"})}),(0,s.jsx)(r.rU,{to:"/profile/admin/admin-order",children:(0,s.jsx)("button",{className:"btns",children:"Orders"})})]})]})})},620:(e,t,a)=>{a.r(t),a.d(t,{default:()=>h});a(4015),a(5765);var r=a(2791),s=a(8696),c=a(5294),d=a(3402),n=a(1013),o=a(7689),l=a(1909),i=a(6041),u=a(184);const{Option:p}=n.default,h=()=>{const e=(0,o.s0)(),t=(0,o.UO)(),[a,h]=(0,r.useState)([]),[m,x]=(0,r.useState)(""),[g,j]=(0,r.useState)(""),[f,v]=(0,r.useState)(""),[N,y]=(0,r.useState)(""),[b,P]=(0,r.useState)(""),[S,w]=(0,r.useState)(""),[C,_]=(0,r.useState)(""),[Z,k]=(0,r.useState)("");(0,r.useEffect)((()=>{(async()=>{try{const{data:e}=await c.Z.get("/api/v1/product/get-product/".concat(t.slug));j(e.product.name),k(e.product._id),v(e.product.description),y(e.product.price),w(e.product.quantity),P(e.product.isFeatured),x(e.product.category._id)}catch(e){d.ZP.error("Something went wrong")}})()}),[]);(0,r.useEffect)((()=>{(async()=>{try{const{data:e}=await c.Z.get("/api/v1/category/allcategory");null!==e&&void 0!==e&&e.success&&h(null===e||void 0===e?void 0:e.category)}catch(e){d.ZP.error("Something went wrong getting category")}})()}),[]);return(0,u.jsxs)("div",{className:"admin_page",children:[(0,u.jsx)("div",{className:"admin_menu",children:(0,u.jsx)(s.Z,{})}),(0,u.jsxs)("div",{className:"admin_prod_right",children:[(0,u.jsx)("h1",{children:" Update Product "}),(0,u.jsxs)("div",{className:"admin_prod_cont",children:[(0,u.jsxs)("div",{className:"prod-form",children:[(0,u.jsx)("h5",{children:"category:"}),(0,u.jsx)(n.default,{placeholder:"Select Category",size:"large",showSearch:!0,onChange:e=>{x(e)},value:m,children:null===a||void 0===a?void 0:a.map((e=>(0,u.jsx)(p,{value:e._id,children:e.name},e._id)))})]}),(0,u.jsxs)("div",{className:"prod-form",children:[(0,u.jsx)("h5",{children:"Image:"}),(0,u.jsx)("div",{className:"photo-btn",children:(0,u.jsxs)("label",{children:[C?C.name:"Select Product Image",(0,u.jsx)("input",{type:"file",name:"photo",accept:"image/*",onChange:e=>_(e.target.files[0]),hidden:!0})]})})]}),(0,u.jsxs)("div",{className:"prod-form",children:[(0,u.jsx)("h5",{children:"Name:"}),(0,u.jsx)("input",{type:"text",value:g,placeholder:"Product Name",className:"prod-form-input",onChange:e=>j(e.target.value)})]}),(0,u.jsxs)("div",{className:"prod-form",children:[(0,u.jsx)("h5",{children:"description:"}),(0,u.jsx)("input",{type:"text",value:f,placeholder:"Product Description",className:"prod-form-input",onChange:e=>v(e.target.value)})]}),(0,u.jsxs)("div",{className:"prod-form",children:[(0,u.jsx)("h5",{children:"price:"}),(0,u.jsx)("input",{type:"number",value:N,placeholder:"Product Price",className:"prod-form-input",onChange:e=>y(e.target.value)})]}),(0,u.jsxs)("div",{className:"prod-form",children:[(0,u.jsx)("h5",{children:"isFeatured:"}),(0,u.jsxs)(n.default,{variant:"false",placeholder:"Select Featured",size:"large",showSearch:!0,onChange:e=>{P(e)},value:b,className:"prod-form-select",children:[(0,u.jsx)(p,{value:"0",children:" No "}),(0,u.jsx)(p,{value:"1",children:" Yes "})]})]}),(0,u.jsxs)("div",{className:"prod-form",children:[(0,u.jsx)("h5",{children:"Quantity:"}),(0,u.jsx)("input",{type:"number",value:S,placeholder:"Quantity",className:"prod-form-input",onChange:e=>w(e.target.value)})]}),(0,u.jsxs)("button",{className:"prod-form-btn update",onClick:async t=>{t.preventDefault();try{const t=new FormData;t.append("name",g),t.append("description",f),t.append("category",m),t.append("price",N),t.append("isFeatured",b),t.append("quantity",S),C&&t.append("photo",C);const{data:a}=await c.Z.put("/api/v1/product/update-product/".concat(Z),t);null!==a&&void 0!==a&&a.success?(d.ZP.success("Product created successfully"),e("/profile/admin/products")):d.ZP.error("Product creation failed")}catch(a){d.ZP.error("Something went wrong creating product")}},children:[(0,u.jsx)(i.TBd,{className:"delete-icon"}),"update porduct"]}),(0,u.jsxs)("button",{className:"prod-form-btn delete",onClick:async()=>{try{const{data:t}=await c.Z.delete("/api/v1/product/delete-product/".concat(Z));d.ZP.success("Product deleted successfully"),e("/profile/admin/products")}catch(t){d.ZP.error("Something went wrong deleting product")}},children:[(0,u.jsx)(l.ZkW,{className:"delete-icon"}),"delete porduct"]})]})]})]})}},4015:()=>{},5563:()=>{},5765:()=>{}}]);
//# sourceMappingURL=620.06156eb6.chunk.js.map