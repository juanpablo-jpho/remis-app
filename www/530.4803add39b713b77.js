"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[530],{9169:(w,g,l)=>{l.d(g,{N:()=>c,q:()=>h});var r=l(467),t=l(2709);class h{constructor(L){this.southwest=L.southwest,this.center=L.center,this.northeast=L.northeast}contains(L){var m=this;return(0,r.A)(function*(){return(yield t.P.mapBoundsContains({bounds:m,point:L})).contains})()}extend(L){var m=this;return(0,r.A)(function*(){const a=yield t.P.mapBoundsExtend({bounds:m,point:L});return m.southwest=a.bounds.southwest,m.center=a.bounds.center,m.northeast=a.bounds.northeast,m})()}}var c=function(o){return o.Normal="Normal",o.Hybrid="Hybrid",o.Satellite="Satellite",o.Terrain="Terrain",o.None="None",o}(c||{})},2709:(w,g,l)=>{l.d(g,{P:()=>t});const t=(0,l(5083).F3)("CapacitorGoogleMaps",{web:()=>l.e(190).then(l.bind(l,1190)).then(h=>new h.CapacitorGoogleMapsWeb)});t.addListener("isMapInFocus",h=>{var c;const m=document.elementFromPoint(h.x,h.y),y=(null===(c=m?.dataset)||void 0===c?void 0:c.internalId)===h.mapId;t.dispatchMapEvent({id:h.mapId,focus:y})})},530:(w,g,l)=>{l.r(g),l.d(g,{MapDireccionPedidoComponent:()=>T});var r=l(467),t=l(3953),h=l(9169),c=l(5083),o=l(2709);class L extends HTMLElement{constructor(){super()}connectedCallback(){if(this.innerHTML="","ios"==c.Ii.getPlatform()){this.style.overflow="scroll",this.style["-webkit-overflow-scrolling"]="touch";const n=document.createElement("div");n.style.height="200%",this.appendChild(n)}}}customElements.define("capacitor-google-map",L);class m{constructor(n){this.element=null,this.resizeObserver=null,this.handleScrollEvent=()=>this.updateMapBounds(),this.id=n}static create(n,e){return(0,r.A)(function*(){const i=new m(n.id);if(!n.element)throw new Error("container element is required");void 0===n.config.androidLiteMode&&(n.config.androidLiteMode=!1),i.element=n.element,i.element.dataset.internalId=n.id;const s=yield m.getElementBounds(n.element);if(n.config.width=s.width,n.config.height=s.height,n.config.x=s.x,n.config.y=s.y,n.config.devicePixelRatio=window.devicePixelRatio,"android"==c.Ii.getPlatform()&&i.initScrolling(),c.Ii.isNativePlatform()){n.element={};const d=()=>{var C,k;const M=null!==(k=null===(C=i.element)||void 0===C?void 0:C.getBoundingClientRect())&&void 0!==k?k:{};return{x:M.x,y:M.y,width:M.width,height:M.height}},f=()=>{o.P.onDisplay({id:i.id,mapBounds:d()})},b=()=>{o.P.onResize({id:i.id,mapBounds:d()})},p=i.element.closest(".ion-page");"ios"===c.Ii.getPlatform()&&p&&(p.addEventListener("ionViewWillEnter",()=>{setTimeout(()=>{f()},100)}),p.addEventListener("ionViewDidEnter",()=>{setTimeout(()=>{f()},100)}));const v={width:s.width,height:s.height,isHidden:!1};i.resizeObserver=new ResizeObserver(()=>{if(null!=i.element){const C=i.element.getBoundingClientRect(),k=0===C.width&&0===C.height;k||(v.isHidden?"ios"===c.Ii.getPlatform()&&!p&&f():(v.width!==C.width||v.height!==C.height)&&b()),v.width=C.width,v.height=C.height,v.isHidden=k}}),i.resizeObserver.observe(i.element)}if(yield new Promise((d,f)=>{setTimeout((0,r.A)(function*(){try{yield o.P.create(n),d(void 0)}catch(b){f(b)}}),200)}),e){const d=yield o.P.addListener("onMapReady",f=>{f.mapId==i.id&&(e(f),d.remove())})}return i})()}static getElementBounds(n){return(0,r.A)(function*(){return new Promise(e=>{let i=n.getBoundingClientRect();if(0==i.width){let s=0;const d=setInterval(function(){0==i.width&&s<30?(i=n.getBoundingClientRect(),s++):(30==s&&console.warn("Map size could not be determined"),clearInterval(d),e(i))},100)}else e(i)})})()}enableTouch(){var n=this;return(0,r.A)(function*(){return o.P.enableTouch({id:n.id})})()}disableTouch(){var n=this;return(0,r.A)(function*(){return o.P.disableTouch({id:n.id})})()}enableClustering(n){var e=this;return(0,r.A)(function*(){return o.P.enableClustering({id:e.id,minClusterSize:n})})()}disableClustering(){var n=this;return(0,r.A)(function*(){return o.P.disableClustering({id:n.id})})()}addMarker(n){var e=this;return(0,r.A)(function*(){return(yield o.P.addMarker({id:e.id,marker:n})).id})()}addMarkers(n){var e=this;return(0,r.A)(function*(){return(yield o.P.addMarkers({id:e.id,markers:n})).ids})()}removeMarker(n){var e=this;return(0,r.A)(function*(){return o.P.removeMarker({id:e.id,markerId:n})})()}removeMarkers(n){var e=this;return(0,r.A)(function*(){return o.P.removeMarkers({id:e.id,markerIds:n})})()}addPolygons(n){var e=this;return(0,r.A)(function*(){return(yield o.P.addPolygons({id:e.id,polygons:n})).ids})()}addPolylines(n){var e=this;return(0,r.A)(function*(){return(yield o.P.addPolylines({id:e.id,polylines:n})).ids})()}removePolygons(n){var e=this;return(0,r.A)(function*(){return o.P.removePolygons({id:e.id,polygonIds:n})})()}addCircles(n){var e=this;return(0,r.A)(function*(){return(yield o.P.addCircles({id:e.id,circles:n})).ids})()}removeCircles(n){var e=this;return(0,r.A)(function*(){return o.P.removeCircles({id:e.id,circleIds:n})})()}removePolylines(n){var e=this;return(0,r.A)(function*(){return o.P.removePolylines({id:e.id,polylineIds:n})})()}destroy(){var n=this;return(0,r.A)(function*(){var e;return"android"==c.Ii.getPlatform()&&n.disableScrolling(),c.Ii.isNativePlatform()&&(null===(e=n.resizeObserver)||void 0===e||e.disconnect()),n.removeAllMapListeners(),o.P.destroy({id:n.id})})()}setCamera(n){var e=this;return(0,r.A)(function*(){return o.P.setCamera({id:e.id,config:n})})()}getMapType(){var n=this;return(0,r.A)(function*(){const{type:e}=yield o.P.getMapType({id:n.id});return h.N[e]})()}setMapType(n){var e=this;return(0,r.A)(function*(){return o.P.setMapType({id:e.id,mapType:n})})()}enableIndoorMaps(n){var e=this;return(0,r.A)(function*(){return o.P.enableIndoorMaps({id:e.id,enabled:n})})()}enableTrafficLayer(n){var e=this;return(0,r.A)(function*(){return o.P.enableTrafficLayer({id:e.id,enabled:n})})()}enableAccessibilityElements(n){var e=this;return(0,r.A)(function*(){return o.P.enableAccessibilityElements({id:e.id,enabled:n})})()}enableCurrentLocation(n){var e=this;return(0,r.A)(function*(){return o.P.enableCurrentLocation({id:e.id,enabled:n})})()}setPadding(n){var e=this;return(0,r.A)(function*(){return o.P.setPadding({id:e.id,padding:n})})()}getMapBounds(){var n=this;return(0,r.A)(function*(){return new h.q(yield o.P.getMapBounds({id:n.id}))})()}fitBounds(n,e){var i=this;return(0,r.A)(function*(){return o.P.fitBounds({id:i.id,bounds:n,padding:e})})()}initScrolling(){const n=document.getElementsByTagName("ion-content");for(let e=0;e<n.length;e++)n[e].scrollEvents=!0;window.addEventListener("ionScroll",this.handleScrollEvent),window.addEventListener("scroll",this.handleScrollEvent),window.addEventListener("resize",this.handleScrollEvent),screen.orientation?screen.orientation.addEventListener("change",()=>{setTimeout(this.updateMapBounds,500)}):window.addEventListener("orientationchange",()=>{setTimeout(this.updateMapBounds,500)})}disableScrolling(){window.removeEventListener("ionScroll",this.handleScrollEvent),window.removeEventListener("scroll",this.handleScrollEvent),window.removeEventListener("resize",this.handleScrollEvent),screen.orientation?screen.orientation.removeEventListener("change",()=>{setTimeout(this.updateMapBounds,1e3)}):window.removeEventListener("orientationchange",()=>{setTimeout(this.updateMapBounds,1e3)})}updateMapBounds(){if(this.element){const n=this.element.getBoundingClientRect();o.P.onScroll({id:this.id,mapBounds:{x:n.x,y:n.y,width:n.width,height:n.height}})}}setOnCameraIdleListener(n){var e=this;return(0,r.A)(function*(){e.onCameraIdleListener&&e.onCameraIdleListener.remove(),e.onCameraIdleListener=n?yield o.P.addListener("onCameraIdle",e.generateCallback(n)):void 0})()}setOnBoundsChangedListener(n){var e=this;return(0,r.A)(function*(){e.onBoundsChangedListener&&e.onBoundsChangedListener.remove(),e.onBoundsChangedListener=n?yield o.P.addListener("onBoundsChanged",e.generateCallback(n)):void 0})()}setOnCameraMoveStartedListener(n){var e=this;return(0,r.A)(function*(){e.onCameraMoveStartedListener&&e.onCameraMoveStartedListener.remove(),e.onCameraMoveStartedListener=n?yield o.P.addListener("onCameraMoveStarted",e.generateCallback(n)):void 0})()}setOnClusterClickListener(n){var e=this;return(0,r.A)(function*(){e.onClusterClickListener&&e.onClusterClickListener.remove(),e.onClusterClickListener=n?yield o.P.addListener("onClusterClick",e.generateCallback(n)):void 0})()}setOnClusterInfoWindowClickListener(n){var e=this;return(0,r.A)(function*(){e.onClusterInfoWindowClickListener&&e.onClusterInfoWindowClickListener.remove(),e.onClusterInfoWindowClickListener=n?yield o.P.addListener("onClusterInfoWindowClick",e.generateCallback(n)):void 0})()}setOnInfoWindowClickListener(n){var e=this;return(0,r.A)(function*(){e.onInfoWindowClickListener&&e.onInfoWindowClickListener.remove(),e.onInfoWindowClickListener=n?yield o.P.addListener("onInfoWindowClick",e.generateCallback(n)):void 0})()}setOnMapClickListener(n){var e=this;return(0,r.A)(function*(){e.onMapClickListener&&e.onMapClickListener.remove(),e.onMapClickListener=n?yield o.P.addListener("onMapClick",e.generateCallback(n)):void 0})()}setOnPolygonClickListener(n){var e=this;return(0,r.A)(function*(){e.onPolygonClickListener&&e.onPolygonClickListener.remove(),e.onPolygonClickListener=n?yield o.P.addListener("onPolygonClick",e.generateCallback(n)):void 0})()}setOnCircleClickListener(n){var e=this;return(0,r.A)(function*(){e.onCircleClickListener&&e.onCircleClickListener.remove(),e.onCircleClickListener=n?yield o.P.addListener("onCircleClick",e.generateCallback(n)):void 0})()}setOnMarkerClickListener(n){var e=this;return(0,r.A)(function*(){e.onMarkerClickListener&&e.onMarkerClickListener.remove(),e.onMarkerClickListener=n?yield o.P.addListener("onMarkerClick",e.generateCallback(n)):void 0})()}setOnPolylineClickListener(n){var e=this;return(0,r.A)(function*(){e.onPolylineClickListener&&e.onPolylineClickListener.remove(),e.onPolylineClickListener=n?yield o.P.addListener("onPolylineClick",e.generateCallback(n)):void 0})()}setOnMarkerDragStartListener(n){var e=this;return(0,r.A)(function*(){e.onMarkerDragStartListener&&e.onMarkerDragStartListener.remove(),e.onMarkerDragStartListener=n?yield o.P.addListener("onMarkerDragStart",e.generateCallback(n)):void 0})()}setOnMarkerDragListener(n){var e=this;return(0,r.A)(function*(){e.onMarkerDragListener&&e.onMarkerDragListener.remove(),e.onMarkerDragListener=n?yield o.P.addListener("onMarkerDrag",e.generateCallback(n)):void 0})()}setOnMarkerDragEndListener(n){var e=this;return(0,r.A)(function*(){e.onMarkerDragEndListener&&e.onMarkerDragEndListener.remove(),e.onMarkerDragEndListener=n?yield o.P.addListener("onMarkerDragEnd",e.generateCallback(n)):void 0})()}setOnMyLocationButtonClickListener(n){var e=this;return(0,r.A)(function*(){e.onMyLocationButtonClickListener&&e.onMyLocationButtonClickListener.remove(),e.onMyLocationButtonClickListener=n?yield o.P.addListener("onMyLocationButtonClick",e.generateCallback(n)):void 0})()}setOnMyLocationClickListener(n){var e=this;return(0,r.A)(function*(){e.onMyLocationClickListener&&e.onMyLocationClickListener.remove(),e.onMyLocationClickListener=n?yield o.P.addListener("onMyLocationClick",e.generateCallback(n)):void 0})()}removeAllMapListeners(){var n=this;return(0,r.A)(function*(){n.onBoundsChangedListener&&(n.onBoundsChangedListener.remove(),n.onBoundsChangedListener=void 0),n.onCameraIdleListener&&(n.onCameraIdleListener.remove(),n.onCameraIdleListener=void 0),n.onCameraMoveStartedListener&&(n.onCameraMoveStartedListener.remove(),n.onCameraMoveStartedListener=void 0),n.onClusterClickListener&&(n.onClusterClickListener.remove(),n.onClusterClickListener=void 0),n.onClusterInfoWindowClickListener&&(n.onClusterInfoWindowClickListener.remove(),n.onClusterInfoWindowClickListener=void 0),n.onInfoWindowClickListener&&(n.onInfoWindowClickListener.remove(),n.onInfoWindowClickListener=void 0),n.onMapClickListener&&(n.onMapClickListener.remove(),n.onMapClickListener=void 0),n.onPolylineClickListener&&(n.onPolylineClickListener.remove(),n.onPolylineClickListener=void 0),n.onMarkerClickListener&&(n.onMarkerClickListener.remove(),n.onMarkerClickListener=void 0),n.onPolygonClickListener&&(n.onPolygonClickListener.remove(),n.onPolygonClickListener=void 0),n.onCircleClickListener&&(n.onCircleClickListener.remove(),n.onCircleClickListener=void 0),n.onMarkerDragStartListener&&(n.onMarkerDragStartListener.remove(),n.onMarkerDragStartListener=void 0),n.onMarkerDragListener&&(n.onMarkerDragListener.remove(),n.onMarkerDragListener=void 0),n.onMarkerDragEndListener&&(n.onMarkerDragEndListener.remove(),n.onMarkerDragEndListener=void 0),n.onMyLocationButtonClickListener&&(n.onMyLocationButtonClickListener.remove(),n.onMyLocationButtonClickListener=void 0),n.onMyLocationClickListener&&(n.onMyLocationClickListener.remove(),n.onMyLocationClickListener=void 0)})()}generateCallback(n){const e=this.id;return i=>{i.mapId==e&&n(i)}}}var a=l(1224),y=l(5312);function A(u,n){if(1&u){const e=t.RV6();t.j41(0,"ion-item",3)(1,"ion-label"),t.EFF(2),t.j41(3,"p"),t.EFF(4),t.k0s()()(),t.j41(5,"div",4)(6,"ion-button",5),t.bIt("click",function(){t.eBV(e);const s=t.XpG();return t.Njj(s.setLocation())}),t.EFF(7," Establacer esta ubicaci\xf3n "),t.k0s()()}if(2&u){const e=t.XpG();t.R7$(2),t.SpI(" ",e.place.name," "),t.R7$(2),t.JRh(e.place.description)}}let D=(()=>{class u{constructor(e){this.modalController=e}ngOnInit(){}dismiss(){this.modalController.dismiss()}setLocation(){this.modalController.dismiss({place:this.place})}static#e=this.\u0275fac=function(i){return new(i||u)(t.rXU(a.W3))};static#n=this.\u0275cmp=t.VBU({type:u,selectors:[["app-place-detail"]],inputs:{place:"place"},standalone:!0,features:[t.aNF],decls:9,vars:1,consts:[["slot","end"],[3,"click"],["slot","icon-only","name","close"],["lines","none"],[1,"ion-text-center"],["shape","round",3,"click"]],template:function(i,s){1&i&&(t.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),t.EFF(3,"Marcador"),t.k0s(),t.j41(4,"ion-buttons",0)(5,"ion-button",1),t.bIt("click",function(){return s.dismiss()}),t.nrm(6,"ion-icon",2),t.k0s()()()(),t.j41(7,"ion-content"),t.DNE(8,A,8,2),t.k0s()),2&i&&(t.R7$(8),t.vxM(s.place?8:-1))},dependencies:[a.eU,a.ai,a.QW,a.Jm,a.iq,a.W9,a.uz,a.he,a.BC]})}return u})();var I=l(177);const P=(0,c.F3)("Geolocation",{web:()=>l.e(920).then(l.bind(l,2920)).then(u=>new u.GeolocationWeb)});var S=l(9826),O=l(4374),B=l(6217);const W=u=>({"--background":u}),_=y.c.firebaseConfig.apiKey;let T=(()=>{class u{constructor(e,i,s,d){this.menuController=e,this.modalController=i,this.router=s,this.route=d,this.transparency=!1,this.disableButtonMyLocation=c.Ii.isNativePlatform(),this.interactionService=(0,t.WQX)(S.y),this.carritoService=(0,t.WQX)(O.a)}ionViewDidEnter(){this.menuController.enable(!1,"main"),this.transparency=!0,this.initMap()}ionViewDidLeave(){this.menuController.enable(!0,"main"),this.transparency=!1,this.map?.destroy()}ngOnInit(){}initMap(){var e=this;return(0,r.A)(function*(){e.map=yield m.create({id:"my-map",element:document.getElementById("map"),apiKey:_,language:"es",config:{center:{lat:-2.861306136001268,lng:-78.99730914182649},zoom:15}}),c.Ii.isNativePlatform&&e.map.enableCurrentLocation(!0),e.setMyLocation(),e.getQueryParams()})()}getQueryParams(){const e=this.route.snapshot.queryParams;console.log("queryParams -> ",e),e.lat&&e.lng&&this.setMarkerMyPosition(+e.lat,+e.lng)}setMarkerDemo(){this.map.addMarker({coordinate:{lat:-2.9045937,lng:-78.9836343}})}setPlacesDemo(){var e=this;E.forEach(function(){var i=(0,r.A)(function*(s){const d=yield e.map.addMarker(s.marker);s.id=d});return function(s){return i.apply(this,arguments)}}())}addListeners(){this.map.setOnMapClickListener(e=>{console.log("MapClickListener -> ",e),this.map.addMarker({title:"hola mundo",snippet:"un texto m\xe1s largo",draggable:!0,coordinate:{lat:e.latitude,lng:e.longitude}})}),this.map.setOnInfoWindowClickListener(e=>{console.log("InfoWindowClickListener -> ",e)}),this.map.setOnMarkerClickListener(e=>{console.log("MarkerClickListener -> ",e);const i=E.find(s=>s.id==e.markerId);i&&this.showDetailMarker(i)})}setMyLocation(){var e=this;this.map.setOnMapClickListener(function(){var i=(0,r.A)(function*(s){console.log("MapClickListener -> ",s),e.setMarkerMyPosition(s.latitude,s.longitude)});return function(s){return i.apply(this,arguments)}}()),this.map.setOnMarkerDragEndListener(i=>{console.log("MarkerDragEndListener -> ",i),this.myLocation.marker.coordinate={lat:i.latitude,lng:i.longitude},this.showDetailMarker(this.myLocation),this.centerMarkerWithBounds(this.myLocation.marker)}),this.map.setOnMarkerClickListener(i=>{console.log("setMyLocation MarkerClickListener -> ",i),i.markerId==this.myLocation.id&&this.showDetailMarker(this.myLocation)}),this.map.setOnMyLocationClickListener(i=>{console.log("MyLocationClickListener -> ",i),this.setMarkerMyPosition(i.latitude,i.longitude)}),this.map.setOnMyLocationButtonClickListener(i=>{console.log("MyLocationButtonClickListener -> ",i),this.getCurrentPosition()})}showDetailMarker(e){var i=this;return(0,r.A)(function*(){const s=yield i.modalController.create({component:D,componentProps:{place:e},initialBreakpoint:.25,breakpoints:[0,.25]});yield s.present();const{data:d}=yield s.onWillDismiss();if(d){const f=d.place;console.log("dismiss modal -> ",d),i.carritoService.setCoordenadasPedido(f.marker.coordinate),i.router.navigate(["/store/carrito"])}})()}setMarkerMyPosition(e,i){var s=this;return(0,r.A)(function*(){s.myLocation?.id&&s.map.removeMarker(s.myLocation.id),s.myLocation={name:"Mi Ubicaci\xf3n",description:"Enviar pedido a est\xe1 ubicaci\xf3n",marker:{title:"Mi Ubicaci\xf3n",snippet:"Enviar pedido a est\xe1 ubicaci\xf3n",draggable:!0,coordinate:{lat:e,lng:i}}};const d=yield s.map.addMarker(s.myLocation.marker);s.myLocation.id=d,s.centerMarkerWithBounds(s.myLocation.marker),s.showDetailMarker(s.myLocation)})()}centerMarkerWithBounds(e){console.log("centerMarkerWithBounds");const i=5e-4;let f=new h.q({southwest:{lat:e.coordinate.lat-i,lng:e.coordinate.lng-i},center:e.coordinate,northeast:{lat:e.coordinate.lat+i,lng:e.coordinate.lng+i}});this.map.fitBounds(f,100)}centerMarker(e){console.log("centerMarker"),this.map.setCamera({coordinate:e.coordinate,zoom:16})}getCurrentPosition(){var e=this;return(0,r.A)(function*(){yield e.interactionService.showLoading("obteniendo tu ubicaci\xf3n...");const i=yield P.checkPermissions();if(console.log("checkPermissions -> ",i),"granted"!=i.location){if("denied"==i.location)return void e.interactionService.dismissLoading();if(c.Ii.isNativePlatform()){const d=yield P.requestPermissions({permissions:["coarseLocation"]});if(console.log("requestPermissions response -> ",d),"granted"!=d.location)return void e.interactionService.dismissLoading()}}console.log("obteniendo posici\xf3n");const s=yield P.getCurrentPosition({enableHighAccuracy:!0});console.log("Current position:",s.coords),e.interactionService.dismissLoading(),e.setMarkerMyPosition(s.coords.latitude,s.coords.longitude)})()}static#e=this.\u0275fac=function(i){return new(i||u)(t.rXU(a._t),t.rXU(a.W3),t.rXU(B.Ix),t.rXU(B.nX))};static#n=this.\u0275cmp=t.VBU({type:u,selectors:[["app-map-direccion-pedido"]],standalone:!0,features:[t.aNF],decls:11,vars:5,consts:[[3,"translucent"],["slot","start"],["defaultHref","/store/carrito"],[3,"fullscreen","ngStyle"],["id","map"],["vertical","top","horizontal","end","slot","fixed"],[3,"click"],["name","locate"]],template:function(i,s){1&i&&(t.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),t.nrm(3,"ion-back-button",2),t.k0s(),t.j41(4,"ion-title"),t.EFF(5,"Mapa"),t.k0s()()(),t.j41(6,"ion-content",3),t.nrm(7,"capacitor-google-map",4),t.j41(8,"ion-fab",5)(9,"ion-fab-button",6),t.bIt("click",function(){return s.getCurrentPosition()}),t.nrm(10,"ion-icon",7),t.k0s()()()),2&i&&(t.Y8G("translucent",!0),t.R7$(6),t.Y8G("fullscreen",!0)("ngStyle",t.eq3(3,W,s.transparency?"transparent":"var(--ion-color-light)")))},dependencies:[a.eU,a.ai,a.el,a.BC,a.W9,a.QW,a.iq,I.MD,I.B3,a.Q8,a.YW],styles:["capacitor-google-map[_ngcontent-%COMP%], google-map[_ngcontent-%COMP%]{display:inline-block;width:100%;height:100%}"]})}return u})();const E=[{name:"Lugar A",description:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui consequuntur eos eveniet sint sit necessitatibus perspiciatis quisquam earum! Officiis rerum pariatur incidunt, asperiores quasi veritatis fugiat ex saepe neque ab?",marker:{title:"Lugar A",snippet:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui consequuntur eos eveniet sint sit necessitatibus perspiciatis quisquam earum! Officiis rerum pariatur incidunt, asperiores quasi veritatis fugiat ex saepe neque ab?",iconUrl:"assets/icons/moto.png",iconSize:{width:35,height:35},coordinate:{lat:-2.90486435760786,lng:-78.98343901973725}}},{name:"Lugar B",description:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui consequuntur eos eveniet sint sit necessitatibus perspiciatis quisquam earum! Officiis rerum pariatur incidunt, asperiores quasi veritatis fugiat ex saepe neque ab?",marker:{title:"Lugar B",snippet:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui consequuntur eos eveniet sint sit necessitatibus perspiciatis quisquam earum! Officiis rerum pariatur incidunt, asperiores quasi veritatis fugiat ex saepe neque ab?",iconUrl:"assets/icons/restaurante.png",iconSize:{width:35,height:35},coordinate:{lat:-2.904086729776945,lng:-78.98409206727841}}}]}}]);