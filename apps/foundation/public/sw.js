if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const f=e=>a(e,n),r={module:{uri:n},exports:t,require:f};s[n]=Promise.all(c.map((e=>r[e]||f(e)))).then((e=>(i(...e),t)))}}define(["./workbox-1051b61c"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/7noP40Kn_KWOehOHQdXvv/_buildManifest.js",revision:"c4d24797367c0e1090cf4e3679aecf97"},{url:"/_next/static/7noP40Kn_KWOehOHQdXvv/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/02935b41-be42c619d2b6fa61.js",revision:"be42c619d2b6fa61"},{url:"/_next/static/chunks/065a3ddb-9a3e19691bae7625.js",revision:"9a3e19691bae7625"},{url:"/_next/static/chunks/1176.d70e910830c0b961.js",revision:"d70e910830c0b961"},{url:"/_next/static/chunks/2272ea81-8c297dd1c09054c2.js",revision:"8c297dd1c09054c2"},{url:"/_next/static/chunks/2899-f5f6f065fe0ac202.js",revision:"f5f6f065fe0ac202"},{url:"/_next/static/chunks/4658.d0238c3c56033686.js",revision:"d0238c3c56033686"},{url:"/_next/static/chunks/4842-5fa735ce74bb8e89.js",revision:"5fa735ce74bb8e89"},{url:"/_next/static/chunks/4874-3045404a8e6e01fb.js",revision:"3045404a8e6e01fb"},{url:"/_next/static/chunks/4a5bdccf-2272413b236b8cdb.js",revision:"2272413b236b8cdb"},{url:"/_next/static/chunks/59b4e022-64ca508092ba6c53.js",revision:"64ca508092ba6c53"},{url:"/_next/static/chunks/5c4819dd-f875ae31ccf68f27.js",revision:"f875ae31ccf68f27"},{url:"/_next/static/chunks/6131.3835382dd5bdab6e.js",revision:"3835382dd5bdab6e"},{url:"/_next/static/chunks/69bd6bf3-ab37b93bdb46521b.js",revision:"ab37b93bdb46521b"},{url:"/_next/static/chunks/72585f70-ee72c0c3ad5b06ef.js",revision:"ee72c0c3ad5b06ef"},{url:"/_next/static/chunks/7384.cd5d765e1a500e90.js",revision:"cd5d765e1a500e90"},{url:"/_next/static/chunks/7442.7ed6978479a7bcf0.js",revision:"7ed6978479a7bcf0"},{url:"/_next/static/chunks/7468.a6d50c36b0e49b14.js",revision:"a6d50c36b0e49b14"},{url:"/_next/static/chunks/80ecdbd0-c5a27f8d8e4e634c.js",revision:"c5a27f8d8e4e634c"},{url:"/_next/static/chunks/839.3a399a96fc14e1d6.js",revision:"3a399a96fc14e1d6"},{url:"/_next/static/chunks/8eec4907-b3fc9f2f34eaaeed.js",revision:"b3fc9f2f34eaaeed"},{url:"/_next/static/chunks/9574-bf5e92d1707ebef2.js",revision:"bf5e92d1707ebef2"},{url:"/_next/static/chunks/960.61de6a9092a25d46.js",revision:"61de6a9092a25d46"},{url:"/_next/static/chunks/9709.ab6849b98dae228e.js",revision:"ab6849b98dae228e"},{url:"/_next/static/chunks/9814d858-bef8e8a7858ccf3b.js",revision:"bef8e8a7858ccf3b"},{url:"/_next/static/chunks/b586706e-26b70be37b0227e0.js",revision:"26b70be37b0227e0"},{url:"/_next/static/chunks/c8eae200-900b2928aae41516.js",revision:"900b2928aae41516"},{url:"/_next/static/chunks/d50d312a-788d1c0768e1464a.js",revision:"788d1c0768e1464a"},{url:"/_next/static/chunks/e893f787-bf609c43df41a308.js",revision:"bf609c43df41a308"},{url:"/_next/static/chunks/f36c6662-43f89ad06b12a02c.js",revision:"43f89ad06b12a02c"},{url:"/_next/static/chunks/framework-bc9e8d1125680491.js",revision:"bc9e8d1125680491"},{url:"/_next/static/chunks/main-556304bf2f2ca5b5.js",revision:"556304bf2f2ca5b5"},{url:"/_next/static/chunks/pages/_app-921ae508c4aab510.js",revision:"921ae508c4aab510"},{url:"/_next/static/chunks/pages/_error-10174e80ad0c0cf2.js",revision:"10174e80ad0c0cf2"},{url:"/_next/static/chunks/pages/about-us-6a68d29c10ad632f.js",revision:"6a68d29c10ad632f"},{url:"/_next/static/chunks/pages/activities-bd093ced5991abfd.js",revision:"bd093ced5991abfd"},{url:"/_next/static/chunks/pages/activities/%5Bslug%5D-0008025d0e1acf17.js",revision:"0008025d0e1acf17"},{url:"/_next/static/chunks/pages/blog-517f7d67bf612e52.js",revision:"517f7d67bf612e52"},{url:"/_next/static/chunks/pages/blog/%5Bslug%5D-f3c47a722481c243.js",revision:"f3c47a722481c243"},{url:"/_next/static/chunks/pages/club-3c708705ce53aa94.js",revision:"3c708705ce53aa94"},{url:"/_next/static/chunks/pages/club/artist/%5Bid%5D-631d47964fc03b59.js",revision:"631d47964fc03b59"},{url:"/_next/static/chunks/pages/club/arts/%5Bslug%5D-a59f8ba7a7725ca5.js",revision:"a59f8ba7a7725ca5"},{url:"/_next/static/chunks/pages/club/collections/%5Bslug%5D-cc9ad52071bc2e6b.js",revision:"cc9ad52071bc2e6b"},{url:"/_next/static/chunks/pages/contact-6d1113843fbdf837.js",revision:"6d1113843fbdf837"},{url:"/_next/static/chunks/pages/courses-c184ae95b3d1106f.js",revision:"c184ae95b3d1106f"},{url:"/_next/static/chunks/pages/courses/%5Bslug%5D-23f19957a23572b9.js",revision:"23f19957a23572b9"},{url:"/_next/static/chunks/pages/donation-d3a0bfd62b0df831.js",revision:"d3a0bfd62b0df831"},{url:"/_next/static/chunks/pages/donation/complete-0c4f9c431f85c286.js",revision:"0c4f9c431f85c286"},{url:"/_next/static/chunks/pages/index-bd1c956ae3e16854.js",revision:"bd1c956ae3e16854"},{url:"/_next/static/chunks/pages/join-31b509c45af3d80d.js",revision:"31b509c45af3d80d"},{url:"/_next/static/chunks/pages/login-69e3c58eff06ed19.js",revision:"69e3c58eff06ed19"},{url:"/_next/static/chunks/pages/platforms-4c0e2aa993f45625.js",revision:"4c0e2aa993f45625"},{url:"/_next/static/chunks/pages/platforms/%5Bslug%5D-c171721e7f0b27f7.js",revision:"c171721e7f0b27f7"},{url:"/_next/static/chunks/pages/platforms/academy/software-7dc0b51c82580589.js",revision:"7dc0b51c82580589"},{url:"/_next/static/chunks/pages/privacy-c33f2b45c42893e5.js",revision:"c33f2b45c42893e5"},{url:"/_next/static/chunks/pages/profile-801227367bf87f45.js",revision:"801227367bf87f45"},{url:"/_next/static/chunks/pages/register-1d9406cc00944644.js",revision:"1d9406cc00944644"},{url:"/_next/static/chunks/pages/terms-96e833c473b60762.js",revision:"96e833c473b60762"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-c1cd151df1570345.js",revision:"c1cd151df1570345"},{url:"/_next/static/css/1f5ee95fffd43a71.css",revision:"1f5ee95fffd43a71"},{url:"/_next/static/css/3aa1367d1e46f5fa.css",revision:"3aa1367d1e46f5fa"},{url:"/_next/static/css/c809dfe5a6f3ef64.css",revision:"c809dfe5a6f3ef64"},{url:"/_next/static/media/0fe63eb24e4119b1-s.p.woff2",revision:"e9e98be76a19778242bc807ffcdd9012"},{url:"/_next/static/media/1d166d1f895c8030-s.p.woff2",revision:"05d4b37d3e4d5205b96e499b70b00abe"},{url:"/_next/static/media/20b8b8f6f47c1e10-s.woff2",revision:"7def222d1a45cb1cb7d8c3ae675dbdcc"},{url:"/_next/static/media/370d1cc320ec5619-s.woff2",revision:"a6ff41d10fa89e7f8fec937c243d7428"},{url:"/_next/static/media/51051a7edfeea436-s.woff2",revision:"f1b74fe764967ea8636858297f750d66"},{url:"/_next/static/media/58b5ff29cb83dc98-s.woff2",revision:"e891db69d4cac7a240f3adaf8fb8e0c6"},{url:"/_next/static/media/591327bf3b62a611-s.woff2",revision:"0ed299a4bb5262e17e2145783b2c18f1"},{url:"/_next/static/media/7777133e901cd5ed-s.p.woff2",revision:"a09f2fccfee35b7247b08a1a266f0328"},{url:"/_next/static/media/839135d04a097cea-s.woff2",revision:"79e6e81d255edac7e8627c7e16baccf5"},{url:"/_next/static/media/87c72f23c47212b9-s.woff2",revision:"790d0c8dbcd491d29d58f1369c199d40"},{url:"/_next/static/media/90c38b6482a4a18d-s.woff2",revision:"b3d5a5e5e3585bedcbcb0b5459306756"},{url:"/_next/static/media/916d3686010a8de2-s.p.woff2",revision:"9212f6f9860f9fc6c69b02fedf6db8c3"},{url:"/_next/static/media/9a881e2ac07d406b-s.p.woff2",revision:"25b0e113ca7cce3770d542736db26368"},{url:"/_next/static/media/9b44cfc48addbfc9-s.woff2",revision:"b8f12782fb372c92a5c8e3380f926e17"},{url:"/_next/static/media/bd427f25ac24d036-s.p.woff2",revision:"5426bf50c8455aab7a3e89d1138eb969"},{url:"/_next/static/media/f93b79c1ea023ab6-s.woff2",revision:"96b6d54684daa94742f7bfd72a981213"},{url:"/android-chrome-192x192.png",revision:"6a5fd1384c3ce12fda273158d1daeb41"},{url:"/android-chrome-512x512.png",revision:"9026784245f99fe45ecd3c4187bbee75"},{url:"/apple-touch-icon.png",revision:"4be94ba2112a4507c7db905ae1562a74"},{url:"/favicon-16x16.png",revision:"26c1f74f1150f34c0abaf7ed6291d5b4"},{url:"/favicon-32x32.png",revision:"7553609d706aa163c12dc57aa22656f6"},{url:"/favicon.ico",revision:"bab42aab11042d97032f0344795e592d"},{url:"/images/academy-logo-svg.svg",revision:"26064bd5a0bf4bc13c63c1ffd6024866"},{url:"/images/announcement.png",revision:"bdb3a4122994baab9c03847e0d978b26"},{url:"/images/blog-bg.jpeg",revision:"3177d12bc3ad30af2d46bc30b5e8c1ae"},{url:"/images/courses.png",revision:"abb58f0eb74596f70fb66e39df9b6c67"},{url:"/images/human_rights.webp",revision:"a686ee579a27e8eb8f2ec1ffc08895f5"},{url:"/images/ideal-logo.svg",revision:"96c53048d6c8367f664db15140b3f6a0"},{url:"/images/kunsthalte-home.jpeg",revision:"ffc4d4687fa4fe65462d2115b2db780c"},{url:"/images/kunsthalte-logo.svg",revision:"6d47e40f4bdbb98488efe66ba49b789d"},{url:"/images/mission.svg",revision:"00d9d8e42d6c844f2859af303e7e8845"},{url:"/images/no-blog.svg",revision:"56535dae8cab6fa4887c061f0e3a91fa"},{url:"/images/samen-logo.svg",revision:"7ef0805f64aae90b2bfc473fa76258f2"},{url:"/images/seminar.jpeg",revision:"8d0c9fd65a1f0eadec5d4e766cf224fe"},{url:"/images/software-card.jpeg",revision:"86d061bf00b96d4810c9c94f50c93d3c"},{url:"/images/visa-master-logo.svg",revision:"76c687a0cbcd1c86bd548bc091c11e9b"},{url:"/images/vision.svg",revision:"87db1445d1674db6ee0bbedcfc0f6ea4"},{url:"/images/who-we-are.svg",revision:"b1eb00f396c1d8699c2babbd689ab886"},{url:"/images/wsvvrijheid-logo.svg",revision:"28055fc09ebc407c0d21bafab9c9a414"},{url:"/locales/en/admin.json",revision:"097f612a7d34902fa79c18623675720f"},{url:"/locales/en/common.json",revision:"b3651068c9609b2c17f0a9e590456e28"},{url:"/locales/nl/admin.json",revision:"70d113185314a78ea7c870991067e832"},{url:"/locales/nl/common.json",revision:"34748b66437fe55dde5906db73b06406"},{url:"/locales/tr/admin.json",revision:"a55285a9ab6087cb4f78e70ff9af4fd9"},{url:"/locales/tr/common.json",revision:"2f5a7b10c4a208fdaf834c90539499c9"},{url:"/site.webmanifest",revision:"69ecf2da91036e36d535e143f56e367d"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
