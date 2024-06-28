"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[577],{4577:(q,v,u)=>{u.r(v),u.d(v,{BackofficeModule:()=>W});var h=u(177),f=u(6217),e=u(3953),o=u(1224);const k=r=>({background:r}),y=r=>[r],j=r=>({color:r});function x(r,l){if(1&r&&(e.j41(0,"ion-col",9)(1,"ion-card",12)(2,"ion-card-content")(3,"div",13),e.nrm(4,"ion-icon",14),e.k0s(),e.j41(5,"div",15),e.EFF(6),e.k0s()()()()),2&r){const t=l.$implicit;e.R7$(),e.Y8G("ngStyle",e.eq3(6,k,t.background))("routerLink",e.eq3(8,y,t.enlace)),e.R7$(3),e.Y8G("ngStyle",e.eq3(10,j,t.color))("name",t.icono),e.R7$(),e.Y8G("ngStyle",e.eq3(12,j,t.color)),e.R7$(),e.SpI(" ",t.nombre," ")}}function S(r,l){if(1&r&&(e.j41(0,"ion-item",11),e.nrm(1,"ion-icon",16),e.j41(2,"ion-label"),e.EFF(3),e.k0s()()),2&r){const t=l.$implicit;e.Y8G("routerLink",e.eq3(3,y,t.enlace)),e.R7$(),e.Y8G("name",t.icono),e.R7$(2),e.SpI(" ",t.nombre,"")}}let P=(()=>{class r{constructor(){this.menu=F}ngOnInit(){}static#e=this.\u0275fac=function(i){return new(i||r)};static#t=this.\u0275cmp=e.VBU({type:r,selectors:[["app-ajustes"]],decls:18,vars:2,consts:[[3,"translucent"],["color","light"],["slot","start"],["menu","main"],["color","light",3,"fullscreen"],["collapse","condense"],["size","large"],["fixed",""],[1,"ion-justify-content-center"],["size","6","size-md","3","size-xl","2"],["inset",""],["button","","detail","","routerDirection","forward",3,"routerLink"],["mode","ios","button","","routerDirection","forward",3,"ngStyle","routerLink"],[1,"ion-text-center"],["size","large",3,"ngStyle","name"],[1,"ion-text-center",3,"ngStyle"],["slot","start",3,"name"]],template:function(i,n){1&i&&(e.j41(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-title"),e.EFF(3,"Ajustes"),e.k0s(),e.j41(4,"ion-buttons",2),e.nrm(5,"ion-menu-button",3),e.k0s()()(),e.j41(6,"ion-content",4)(7,"ion-header",5)(8,"ion-toolbar",1)(9,"ion-title",6),e.EFF(10,"Ajustes"),e.k0s()()(),e.j41(11,"ion-grid",7)(12,"ion-row",8),e.Z7z(13,x,7,14,"ion-col",9,e.Vm6),e.k0s()(),e.j41(15,"ion-list",10),e.Z7z(16,S,4,5,"ion-item",11,e.Vm6),e.k0s()()),2&i&&(e.Y8G("translucent",!0),e.R7$(6),e.Y8G("fullscreen",!0),e.R7$(7),e.Dyx(n.menu),e.R7$(3),e.Dyx(n.menu))},dependencies:[h.B3,f.Wk,o.eU,o.BC,o.QW,o.iq,o.ai,o.W9,o.MC,o.lO,o.ln,o.hU,o.gf,o.b_,o.I9,o.uz,o.he,o.nf]})}return r})();const F=[{nombre:"Categorias",enlace:"/backoffice/ajustes/categorias",icono:"text",color:"#ffffff",background:"#2196f3"},{nombre:"Productos",enlace:"/backoffice/ajustes/productos",icono:"cube",color:"#ffffff",background:"#00bcd4"}];var d=u(467),p=u(7553),_=u(9146),b=u(9826);function $(r,l){if(1&r){const t=e.RV6();e.j41(0,"ion-buttons",4)(1,"ion-button",9),e.bIt("click",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.delete())}),e.nrm(2,"ion-icon",17),e.k0s()()}}function E(r,l){if(1&r){const t=e.RV6();e.j41(0,"ion-item",18),e.bIt("click",function(){const n=e.eBV(t).$implicit,s=e.XpG();return e.Njj(s.editCategorie(n))})("contextmenu",function(n){const s=e.eBV(t).$implicit,a=e.XpG();return e.Njj(a.showOptions(n,s))}),e.j41(1,"ion-label",19),e.EFF(2),e.j41(3,"p"),e.EFF(4),e.k0s()()()}if(2&r){const t=l.$implicit;e.R7$(2),e.SpI(" ",t.name," "),e.R7$(2),e.JRh(t.description)}}function T(r,l){1&r&&(e.j41(0,"div",16),e.nrm(1,"ion-spinner",20),e.k0s())}let I=(()=>{class r{constructor(t){this.router=t,this.firestoreService=(0,e.WQX)(_.B),this.interactionService=(0,e.WQX)(b.y),this.enableOptions=!1,this.loadCategories()}ngOnInit(){}ngOnDestroy(){this.s?.unsubscribe()}loadCategories(){var t=this;return(0,d.A)(function*(){t.categories$=t.firestoreService.getDocumentsQueryChanges(p.B.Tienda.pathCategories,[[]],{orderParam:"date"})})()}newCategorie(){this.router.navigate(["/backoffice/ajustes/categoria-detalle"])}editCategorie(t){this.enableOptions?this.enableOptions=!1:(console.log("editCategorie -> ",t.id),this.router.navigate(["/backoffice/ajustes/categoria-detalle"],{queryParams:{id:t.id}}))}showOptions(t,i){t.preventDefault(),console.log("mousedown"),this.enableOptions=!0,this.categorySelected=i}delete(){var t=this;return(0,d.A)(function*(){if(console.log("delete -> "),yield t.interactionService.presentAlert("Importante","\xbfSeguro que deseas eliminar esta categoria?","Cancelar","Eliminar")){const n=p.B.Tienda.pathCategories;yield t.interactionService.showLoading("Eliminando..."),yield t.firestoreService.deleteDocument(`${n}/${t.categorySelected.id}`),t.interactionService.dismissLoading(),t.interactionService.showToast("Eliminado con \xe9xito")}t.enableOptions=!1,t.categorySelected=null})()}static#e=this.\u0275fac=function(i){return new(i||r)(e.rXU(f.Ix))};static#t=this.\u0275cmp=e.VBU({type:r,selectors:[["app-categorias"]],decls:23,vars:6,consts:[[3,"translucent"],["color","light"],["slot","start"],["defaultHref","/backoffice/ajustes"],["slot","end"],["color","light",3,"click","fullscreen"],["collapse","condense"],["size","large"],["vertical","bottom","horizontal","end","slot","fixed"],[3,"click"],["name","add"],["fixed",""],[1,"ion-justify-content-center"],["size","12","sizeMd","8","sizeLg","6"],["inset","","mode","ios"],["detail","","button",""],[1,"ion-text-center"],["slot","icon-only","name","trash","color","danger"],["detail","","button","",3,"click","contextmenu"],[1,"ion-text-nowrap"],["name","bubbles"]],template:function(i,n){1&i&&(e.j41(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-title"),e.EFF(3,"Categorias"),e.k0s(),e.j41(4,"ion-buttons",2),e.nrm(5,"ion-back-button",3),e.k0s(),e.DNE(6,$,3,0,"ion-buttons",4),e.k0s()(),e.j41(7,"ion-content",5),e.bIt("click",function(){return n.enableOptions=!1}),e.j41(8,"ion-header",6)(9,"ion-toolbar",1)(10,"ion-title",7),e.EFF(11,"Categorias"),e.k0s()()(),e.j41(12,"ion-fab",8)(13,"ion-fab-button",9),e.bIt("click",function(){return n.newCategorie()}),e.nrm(14,"ion-icon",10),e.k0s()(),e.j41(15,"ion-grid",11)(16,"ion-row",12)(17,"ion-col",13)(18,"ion-list",14),e.Z7z(19,E,5,2,"ion-item",15,e.Vm6,!1,T,2,0,"div",16),e.nI1(22,"async"),e.k0s()()()()()),2&i&&(e.Y8G("translucent",!0),e.R7$(6),e.vxM(n.enableOptions?6:-1),e.R7$(),e.Y8G("fullscreen",!0),e.R7$(12),e.Dyx(e.bMT(22,4,n.categories$)))},dependencies:[o.eU,o.BC,o.QW,o.Jm,o.iq,o.ai,o.W9,o.el,o.lO,o.ln,o.hU,o.uz,o.he,o.nf,o.Q8,o.YW,o.w2,h.Jj]})}return r})();function w(r,l){if(1&r){const t=e.RV6();e.j41(0,"ion-buttons",5)(1,"ion-button",10),e.bIt("click",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.delete())}),e.nrm(2,"ion-icon",20),e.k0s()()}}function D(r,l){if(1&r){const t=e.RV6();e.j41(0,"ion-item",21),e.bIt("click",function(){const n=e.eBV(t).$implicit,s=e.XpG();return e.Njj(s.editProduct(n.data()))})("contextmenu",function(n){const s=e.eBV(t).$implicit,a=e.XpG();return e.Njj(a.showOptions(n,s.data()))}),e.j41(1,"ion-label",22),e.EFF(2),e.j41(3,"p"),e.EFF(4),e.k0s(),e.j41(5,"p")(6,"ion-badge",3),e.EFF(7),e.nI1(8,"currency"),e.k0s()()()()}if(2&r){const t=l.$implicit;e.R7$(2),e.SpI(" ",t.data().name," "),e.R7$(2),e.JRh(t.data().description),e.R7$(3),e.JRh(e.bMT(8,3,t.data().price))}}function B(r,l){1&r&&(e.j41(0,"div",17),e.nrm(1,"ion-spinner",23),e.k0s())}function R(r,l){}let G=(()=>{class r{constructor(t){this.router=t,this.firestoreService=(0,e.WQX)(_.B),this.interactionService=(0,e.WQX)(b.y),this.enableOptions=!1,this.numItems=9,this.enableMore=!0}ngOnInit(){}ionViewDidEnter(){this.products=[],this.loadProducts()}loadProducts(){var t=this;return(0,d.A)(function*(){console.log("loadProducts");const i=p.B.Tienda.pathProducts,n={orderParam:"date",directionSort:"desc",limit:t.numItems};t.products&&(n.startAfter=t.products[t.products.length-1]);const s=yield t.firestoreService.getDocumentsQuery(i,[[]],n);console.log("res -> ",s.docs),s.size&&(t.products?t.products.push(...s.docs):t.products=s.docs),t.enableMore=s.size==t.numItems})()}loadMore(t){var i=this;return(0,d.A)(function*(){console.log("loadMore"),yield i.loadProducts(),t.target.complete()})()}addProduct(){this.router.navigate(["backoffice/ajustes/producto-detalle"])}editProduct(t){this.enableOptions?this.enableOptions=!1:(console.log("editProduct -> ",t.id),this.router.navigate(["/backoffice/ajustes/producto-detalle"],{queryParams:{id:t.id}}))}showOptions(t,i){t.preventDefault(),console.log("showOptions"),this.enableOptions=!0,this.productSelected=i}delete(){var t=this;return(0,d.A)(function*(){if(console.log("delete -> ",t.productSelected),yield t.interactionService.presentAlert("Importante","\xbfSeguro que deseas eliminar este producto?","Cancelar","Eliminar")){const n=p.B.Tienda.pathProducts;yield t.interactionService.showLoading("Eliminando..."),yield t.firestoreService.deleteDocument(`${n}/${t.productSelected.id}`),t.interactionService.dismissLoading(),t.interactionService.showToast("Eliminado con \xe9xito");const s=t.products.findIndex(a=>t.productSelected.id==a.data().id);console.log("index to delete -> ",s),s>=0&&t.products.splice(s,1)}t.enableOptions=!1,t.productSelected=null})()}static#e=this.\u0275fac=function(i){return new(i||r)(e.rXU(f.Ix))};static#t=this.\u0275cmp=e.VBU({type:r,selectors:[["app-productos"]],decls:26,vars:6,consts:[["infiniteScroll",""],[3,"translucent"],["color","light"],["slot","start"],["defaultHref","/backoffice/ajustes"],["slot","end"],["color","light",3,"click","fullscreen"],["collapse","condense"],["size","large"],["vertical","bottom","horizontal","end","slot","fixed"],[3,"click"],["name","add"],["fixed",""],[1,"ion-justify-content-center"],["size","12","sizeMd","8","sizeLg","6"],["inset","","mode","ios"],["detail","","button",""],[1,"ion-text-center"],["threshold","25%","position","bottom",3,"ionInfinite","disabled"],["loadingSpinner","bubbles"],["slot","icon-only","name","trash","color","danger"],["detail","","button","",3,"click","contextmenu"],[1,"ion-text-nowrap"],["name","bubbles"]],template:function(i,n){if(1&i){const s=e.RV6();e.j41(0,"ion-header",1)(1,"ion-toolbar",2)(2,"ion-title"),e.EFF(3,"Productos"),e.k0s(),e.j41(4,"ion-buttons",3),e.nrm(5,"ion-back-button",4),e.k0s(),e.DNE(6,w,3,0,"ion-buttons",5),e.k0s()(),e.j41(7,"ion-content",6),e.bIt("click",function(){return e.eBV(s),e.Njj(n.enableOptions=!1)}),e.j41(8,"ion-header",7)(9,"ion-toolbar",2)(10,"ion-title",8),e.EFF(11,"Productos"),e.k0s()()(),e.j41(12,"ion-fab",9)(13,"ion-fab-button",10),e.bIt("click",function(){return e.eBV(s),e.Njj(n.addProduct())}),e.nrm(14,"ion-icon",11),e.k0s()(),e.j41(15,"ion-grid",12)(16,"ion-row",13)(17,"ion-col",14)(18,"ion-list",15),e.Z7z(19,D,9,5,"ion-item",16,e.Vm6,!1,B,2,0,"div",17),e.k0s(),e.DNE(22,R,0,0),e.j41(23,"ion-infinite-scroll",18,0),e.bIt("ionInfinite",function(m){return e.eBV(s),e.Njj(n.loadMore(m))}),e.nrm(25,"ion-infinite-scroll-content",19),e.k0s()()()()()}2&i&&(e.Y8G("translucent",!0),e.R7$(6),e.vxM(n.enableOptions?6:-1),e.R7$(),e.Y8G("fullscreen",!0),e.R7$(12),e.Dyx(n.products),e.R7$(3),e.vxM(n.enableMore?22:-1),e.R7$(),e.Y8G("disabled",!n.enableMore))},dependencies:[o.eU,o.BC,o.QW,o.Jm,o.iq,o.ai,o.W9,o.el,o.lO,o.ln,o.hU,o.uz,o.he,o.nf,o.Q8,o.YW,o.w2,o.Ax,o.Hp,o.In,h.oe]})}return r})();var c=u(4341);let z=(()=>{class r{constructor(t,i){this.router=t,this.route=i,this.firestoreService=(0,e.WQX)(_.B),this.interactionService=(0,e.WQX)(b.y),this.categoria=new c.gE({name:new c.MJ("",[c.k0.required]),description:new c.MJ("")}),this.getQueryParams()}ngOnInit(){}save(){var t=this;return(0,d.A)(function*(){if(t.categoria.valid)try{yield t.interactionService.showLoading("Guardando...");const i=t.categoria.value;console.log("data -> ",i);const n=p.B.Tienda.pathCategories;t.categoriaExist?(yield t.firestoreService.updateDocument(`${n}/${t.categoriaExist.id}`,i),yield t.saveCategoryInProducts()):yield t.firestoreService.createDocument(n,i),t.interactionService.dismissLoading(),t.interactionService.showToast("Guardado con \xe9xito"),t.router.navigate(["/backoffice/ajustes/categorias"])}catch(i){console.error(i),t.interactionService.dismissLoading(),t.interactionService.presentAlert("Error","No se pudo guardar")}})()}getQueryParams(){this.route.queryParams.subscribe(t=>{t.id&&this.loadCategory(t.id)})}loadCategory(t){var i=this;return(0,d.A)(function*(){yield i.interactionService.showLoading("Cargando...");const n=p.B.Tienda.pathCategories,s=yield i.firestoreService.getDocument(`${n}/${t}`);i.interactionService.dismissLoading(),s.exists()&&(i.categoriaExist=s.data(),i.categoria.setValue({name:i.categoriaExist.name,description:i.categoriaExist.description}))})()}saveCategoryInProducts(){var t=this;return(0,d.A)(function*(){const i=p.B.Tienda.pathProducts,n=t.categoria.value,a={category:{name:n.name,description:n.description,id:t.categoriaExist.id}},m=yield t.firestoreService.getDocumentsQuery(i,[["category.id","==",t.categoriaExist.id]]);if(m.size){const g=[];m.docs.forEach(function(){var U=(0,d.A)(function*(C){const J=t.firestoreService.updateDocument(`${i}/${C.id}`,a);g.push(J)});return function(C){return U.apply(this,arguments)}}()),yield Promise.all(g)}})()}static#e=this.\u0275fac=function(i){return new(i||r)(e.rXU(f.Ix),e.rXU(f.nX))};static#t=this.\u0275cmp=e.VBU({type:r,selectors:[["app-categoria-detail"]],decls:28,vars:4,consts:[["formC",""],[3,"translucent"],["color","light"],["slot","start"],["defaultHref","/backoffice/ajustes/categorias"],["color","light",3,"fullscreen"],["collapse","condense"],["size","large"],["fixed",""],[1,"ion-justify-content-center"],["size","11","sizeMd","6"],[3,"ngSubmit","formGroup"],["type","text","label","Nombre","placeholder","","fill","outline","mode","md","labelPlacement","floating","errorText","Este campo es requerido","formControlName","name"],["type","text","label","Descripci\xf3n","placeholder","","fill","outline","mode","md","labelPlacement","floating","formControlName","description","autoGrow",""],["fixed","",1,"ion-no-padding"],[1,"ion-justify-content-end"],["size","12","sizeMd","6","sizeLg","4",1,"ion-no-padding"],["type","submit","expand","block","shape","round",3,"form"]],template:function(i,n){if(1&i){const s=e.RV6();e.j41(0,"ion-header",1)(1,"ion-toolbar",2)(2,"ion-title"),e.EFF(3,"Categoria"),e.k0s(),e.j41(4,"ion-buttons",3),e.nrm(5,"ion-back-button",4),e.k0s()()(),e.j41(6,"ion-content",5)(7,"ion-header",6)(8,"ion-toolbar",2)(9,"ion-title",7),e.EFF(10,"Categoria"),e.k0s()()(),e.j41(11,"ion-grid",8)(12,"ion-row",9)(13,"ion-col",10)(14,"form",11,0),e.bIt("ngSubmit",function(){return e.eBV(s),e.Njj(n.save())}),e.nrm(16,"br")(17,"ion-input",12)(18,"br")(19,"ion-textarea",13)(20,"br"),e.k0s()()()()(),e.j41(21,"ion-footer")(22,"ion-toolbar")(23,"ion-grid",14)(24,"ion-row",15)(25,"ion-col",16)(26,"ion-button",17),e.EFF(27," Guardar "),e.k0s()()()()()()}if(2&i){const s=e.sdS(15);e.Y8G("translucent",!0),e.R7$(6),e.Y8G("fullscreen",!0),e.R7$(8),e.Y8G("formGroup",n.categoria),e.R7$(12),e.Y8G("form",s)}},dependencies:[c.qT,c.BC,c.cb,c.j4,c.JD,o.eU,o.M0,o.BC,o.QW,o.Jm,o.ai,o.W9,o.el,o.lO,o.ln,o.hU,o.$w,o.nc]})}return r})();var M=u(2662),V=u(8040);function O(r,l){if(1&r&&(e.j41(0,"ion-select-option",18),e.EFF(1),e.k0s()),2&r){const t=l.$implicit;e.Y8G("value",t.data().id),e.R7$(),e.JRh(t.data().name)}}function N(r,l){1&r&&(e.j41(0,"div")(1,"ion-text",31),e.EFF(2," Este campo es requerido "),e.k0s()())}function A(r,l){if(1&r){const t=e.RV6();e.j41(0,"div",20),e.nrm(1,"img",32),e.j41(2,"ion-icon",33),e.bIt("click",function(){const n=e.eBV(t),s=n.$implicit,a=n.$index,m=e.XpG();return e.Njj(m.deleteImage(s,a))}),e.k0s()()}if(2&r){const t=l.$implicit;e.R7$(),e.Y8G("src",t,e.B4B)}}function Y(r,l){if(1&r){const t=e.RV6();e.j41(0,"div",20),e.nrm(1,"img",32),e.nI1(2,"filetourl"),e.j41(3,"ion-icon",33),e.bIt("click",function(){const n=e.eBV(t).$index,s=e.XpG();return e.Njj(s.remove(n))}),e.k0s()()}if(2&r){const t=l.$implicit;e.R7$(),e.Y8G("src",e.bMT(2,1,t),e.B4B)}}const X=[{path:"ajustes",component:P},{path:"ajustes/categorias",component:I},{path:"ajustes/productos",component:G},{path:"ajustes/categoria-detalle",component:z},{path:"ajustes/producto-detalle",component:(()=>{class r{constructor(t,i){this.router=t,this.route=i,this.firestoreService=(0,e.WQX)(_.B),this.interactionService=(0,e.WQX)(b.y),this.storageService=(0,e.WQX)(M.n),this.product=new c.gE({name:new c.MJ("",[c.k0.required]),description:new c.MJ(""),price:new c.MJ(null,[c.k0.required]),enlacePermanente:new c.MJ("",[c.k0.required]),images:new c.MJ([]),category:new c.MJ(null,[c.k0.required])}),this.images=[],this.getQueryParams(),this.loadCategories()}ngOnInit(){}save(){var t=this;return(0,d.A)(function*(){if(console.log("this.product.valid -> ",t.product.valid),t.product.valid)try{yield t.interactionService.showLoading("Guardando..."),yield t.saveImages();const i=t.product.value;console.log("data -> ",i);const n=p.B.Tienda.pathProducts,s=t.categories.docs.find(a=>a.data().id==i.category);i.category=s.data(),t.productExist?yield t.firestoreService.updateDocument(`${n}/${t.productExist.id}`,i):yield t.firestoreService.createDocument(n,i),t.interactionService.dismissLoading(),t.interactionService.showToast("Guardado con \xe9xito")}catch(i){console.error(i),t.interactionService.dismissLoading(),t.interactionService.presentAlert("Error","No se pudo guardar")}})()}loadCategories(){var t=this;return(0,d.A)(function*(){const i=p.B.Tienda.pathCategories;t.categories=yield t.firestoreService.getDocuments(i)})()}getQueryParams(){this.route.queryParams.subscribe(t=>{t.id&&this.loadProduct(t.id)})}loadProduct(t){var i=this;return(0,d.A)(function*(){yield i.interactionService.showLoading("Cargando...");const n=p.B.Tienda.pathProducts,s=yield i.firestoreService.getDocument(`${n}/${t}`);i.interactionService.dismissLoading(),s.exists()&&(i.productExist=s.data(),console.log(" this.productExist -> ",i.productExist),i.product.setValue({name:i.productExist.name,description:i.productExist.description,price:i.productExist.price,enlacePermanente:i.productExist.enlacePermanente?i.productExist.enlacePermanente:"",category:i.productExist.category.id,images:i.productExist.images}))})()}viewPreview(t){var i=this;return(0,d.A)(function*(){if(t.files.length){for(let n=0;n<t.files.length;n++){const s=t.files.item(n);i.images.push(s)}console.log("viewPreview files -> ",i.images)}})()}remove(t){this.images.splice(t,1)}saveImages(){var t=this;return(0,d.A)(function*(){const i=p.B.Tienda.folderProducts,n=t.product.controls.images.value;for(let s=0;s<t.images.length;s++){const a=t.images[s],m=yield t.storageService.uploadFile(i,a.name,a),g=yield t.storageService.getDownloadURL(m.ref.fullPath);n.push(g)}t.product.controls.images.setValue(n),t.images=[]})()}deleteImage(t,i){var n=this;return(0,d.A)(function*(){if(yield n.interactionService.presentAlert("Importante","\xbfSeguro que desea eliminar esta imagen?","Cancelar","Eliminar"))try{yield n.interactionService.showLoading("Eliminando..."),yield n.storageService.deleteFile(t);const a=n.product.controls.images.value;a.splice(i,1);const m={images:a},g=p.B.Tienda.pathProducts;yield n.firestoreService.updateDocument(`${g}/${n.productExist.id}`,m),n.interactionService.dismissLoading()}catch(a){console.error(a),n.interactionService.presentAlert("Error","No se pudo eliminar")}})()}static#e=this.\u0275fac=function(i){return new(i||r)(e.rXU(f.Ix),e.rXU(f.nX))};static#t=this.\u0275cmp=e.VBU({type:r,selectors:[["app-producto-detail"]],decls:52,vars:5,consts:[["formP",""],["inputFile",""],[3,"translucent"],["color","light"],["slot","start"],["defaultHref","/backoffice/ajustes/productos"],["color","light",3,"fullscreen"],["collapse","condense"],["size","large"],["fixed",""],[1,"ion-justify-content-center"],["size","11","sizeMd","6"],[3,"ngSubmit","formGroup"],["type","text","label","Nombre","placeholder","","fill","outline","mode","md","labelPlacement","floating","errorText","Este campo es requerido","formControlName","name"],["type","text","label","Descripci\xf3n","placeholder","","fill","outline","mode","md","labelPlacement","floating","formControlName","description","autoGrow",""],["type","number","label","Precio","placeholder","","fill","outline","mode","md","labelPlacement","floating","errorText","Este campo es requerido","formControlName","price"],["type","text","label","Enlace permanente","placeholder","","fill","outline","mode","md","labelPlacement","floating","errorText","Este campo es requerido","formControlName","enlacePermanente"],["formControlName","category","label","Categoria","placeholder","Selecciona una categoria","fill","outline","mode","md","cancelText","Cancelar","err",""],[3,"value"],[1,"content-images"],[2,"position","relative"],["type","file","multiple","","accept","image/*",2,"display","none",3,"change"],["mode","ios"],["lines","none"],["slot","end"],[3,"click"],["slot","icon-only","name","images"],["fixed","",1,"ion-no-padding"],[1,"ion-justify-content-end"],["size","12","sizeMd","6","sizeLg","4",1,"ion-no-padding"],["type","submit","expand","block","shape","round",3,"form"],["color","danger"],["alt","",3,"src"],["name","close","color","ligth",1,"icon-remove",3,"click"]],template:function(i,n){if(1&i){const s=e.RV6();e.j41(0,"ion-header",2)(1,"ion-toolbar",3)(2,"ion-title"),e.EFF(3,"Producto"),e.k0s(),e.j41(4,"ion-buttons",4),e.nrm(5,"ion-back-button",5),e.k0s()()(),e.j41(6,"ion-content",6)(7,"ion-header",7)(8,"ion-toolbar",3)(9,"ion-title",8),e.EFF(10,"Producto"),e.k0s()()(),e.j41(11,"ion-grid",9)(12,"ion-row",10)(13,"ion-col",11)(14,"form",12,0),e.bIt("ngSubmit",function(){return e.eBV(s),e.Njj(n.save())}),e.nrm(16,"br")(17,"ion-input",13)(18,"br")(19,"ion-textarea",14)(20,"br")(21,"ion-input",15)(22,"br")(23,"br")(24,"ion-input",16)(25,"br"),e.j41(26,"ion-select",17),e.Z7z(27,O,2,2,"ion-select-option",18,e.Vm6),e.k0s(),e.DNE(29,N,3,0,"div"),e.j41(30,"div",19),e.Z7z(31,A,3,1,"div",20,e.Vm6),e.k0s(),e.j41(33,"input",21,1),e.bIt("change",function(){e.eBV(s);const m=e.sdS(34);return e.Njj(n.viewPreview(m))}),e.k0s(),e.j41(35,"ion-card",22)(36,"ion-item",23)(37,"ion-label"),e.EFF(38,"A\xf1adir im\xe1genes"),e.k0s(),e.j41(39,"ion-buttons",24)(40,"ion-button",25),e.bIt("click",function(){e.eBV(s);const m=e.sdS(34);return e.Njj(m.click())}),e.nrm(41,"ion-icon",26),e.k0s()()()(),e.j41(42,"div",19),e.Z7z(43,Y,4,3,"div",20,e.Vm6),e.k0s()()()()()(),e.j41(45,"ion-footer")(46,"ion-toolbar")(47,"ion-grid",27)(48,"ion-row",28)(49,"ion-col",29)(50,"ion-button",30),e.EFF(51," Guardar "),e.k0s()()()()()()}if(2&i){const s=e.sdS(15);e.Y8G("translucent",!0),e.R7$(6),e.Y8G("fullscreen",!0),e.R7$(8),e.Y8G("formGroup",n.product),e.R7$(13),e.Dyx(null==n.categories?null:n.categories.docs),e.R7$(2),e.vxM(n.product.controls.category.hasError("required")?29:-1),e.R7$(2),e.Dyx(n.product.controls.images.value),e.R7$(12),e.Dyx(n.images),e.R7$(7),e.Y8G("form",s)}},dependencies:[c.qT,c.BC,c.cb,c.j4,c.JD,o.eU,o.M0,o.BC,o.QW,o.Jm,o.iq,o.ai,o.W9,o.el,o.lO,o.ln,o.hU,o.b_,o.uz,o.he,o.$w,o.nc,o.Nm,o.Ip,o.IO,V.R],styles:[".content-images[_ngcontent-%COMP%]{display:flex;overflow:auto}img[_ngcontent-%COMP%]{margin:10px;max-width:200px;padding:10px;border:1px dotted var(--ion-color-primary)}.icon-remove[_ngcontent-%COMP%]{position:absolute;top:10px;right:10px;border-radius:100%;background:var(--ion-color-dark);padding:5px}"]})}return r})()}];let L=(()=>{class r{static#e=this.\u0275fac=function(i){return new(i||r)};static#t=this.\u0275mod=e.$C({type:r});static#o=this.\u0275inj=e.G2t({imports:[f.iI.forChild(X),f.iI]})}return r})();var Q=u(3887);let W=(()=>{class r{static#e=this.\u0275fac=function(i){return new(i||r)};static#t=this.\u0275mod=e.$C({type:r});static#o=this.\u0275inj=e.G2t({imports:[h.MD,L,c.YN,c.X1,o.eU,o.M0,o.BC,o.QW,o.Jm,o.iq,o.ai,o.W9,o.MC,o.el,o.lO,o.ln,o.hU,o.b_,o.I9,o.uz,o.he,o.nf,o.AF,o.Q8,o.YW,o.$w,o.nc,o.w2,o.Nm,o.Ip,o.IO,o.Ax,o.Hp,o.In,Q.G]})}return r})()}}]);