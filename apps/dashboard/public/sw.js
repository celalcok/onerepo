if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const d=e=>a(e,n),f={module:{uri:n},exports:t,require:d};s[n]=Promise.all(c.map((e=>f[e]||d(e)))).then((e=>(i(...e),t)))}}define(["./workbox-1051b61c"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Gd-vuJzKClu48F8psqbQU/_buildManifest.js",revision:"450d05502657c17991d231f8e433e605"},{url:"/_next/static/Gd-vuJzKClu48F8psqbQU/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/02935b41-c0104bd192df41c6.js",revision:"c0104bd192df41c6"},{url:"/_next/static/chunks/065a3ddb-9a3e19691bae7625.js",revision:"9a3e19691bae7625"},{url:"/_next/static/chunks/1176.0c09fbe742fef43f.js",revision:"0c09fbe742fef43f"},{url:"/_next/static/chunks/2272ea81-dd489c5c1d8ecdf7.js",revision:"dd489c5c1d8ecdf7"},{url:"/_next/static/chunks/4100.cd519b7806312293.js",revision:"cd519b7806312293"},{url:"/_next/static/chunks/4658.dff06576f373af36.js",revision:"dff06576f373af36"},{url:"/_next/static/chunks/4a5bdccf-78fed05a94cd2e45.js",revision:"78fed05a94cd2e45"},{url:"/_next/static/chunks/5355-394368a018259ae1.js",revision:"394368a018259ae1"},{url:"/_next/static/chunks/59b4e022-86374dd32e8a14b6.js",revision:"86374dd32e8a14b6"},{url:"/_next/static/chunks/69bd6bf3-9f2d4ad232253c92.js",revision:"9f2d4ad232253c92"},{url:"/_next/static/chunks/72585f70-b8ce88d54edd8716.js",revision:"b8ce88d54edd8716"},{url:"/_next/static/chunks/7442.7ed6978479a7bcf0.js",revision:"7ed6978479a7bcf0"},{url:"/_next/static/chunks/7468.a6d50c36b0e49b14.js",revision:"a6d50c36b0e49b14"},{url:"/_next/static/chunks/7786-edd234a50a8471cb.js",revision:"edd234a50a8471cb"},{url:"/_next/static/chunks/80ecdbd0-c5a27f8d8e4e634c.js",revision:"c5a27f8d8e4e634c"},{url:"/_next/static/chunks/81ca6f2a-7c06a2c46b670ece.js",revision:"7c06a2c46b670ece"},{url:"/_next/static/chunks/839.3a399a96fc14e1d6.js",revision:"3a399a96fc14e1d6"},{url:"/_next/static/chunks/8eec4907-996ebe02e113f1ec.js",revision:"996ebe02e113f1ec"},{url:"/_next/static/chunks/9296490e-abfba37bb28b743a.js",revision:"abfba37bb28b743a"},{url:"/_next/static/chunks/9709.e52cb99ce779bcfb.js",revision:"e52cb99ce779bcfb"},{url:"/_next/static/chunks/9814d858-3de5e236a925bba7.js",revision:"3de5e236a925bba7"},{url:"/_next/static/chunks/b586706e-26b70be37b0227e0.js",revision:"26b70be37b0227e0"},{url:"/_next/static/chunks/d50d312a-788d1c0768e1464a.js",revision:"788d1c0768e1464a"},{url:"/_next/static/chunks/e5e635f2-cf8cafb1d08b9338.js",revision:"cf8cafb1d08b9338"},{url:"/_next/static/chunks/e893f787-bf609c43df41a308.js",revision:"bf609c43df41a308"},{url:"/_next/static/chunks/f36c6662-4dd57919cbf4ca43.js",revision:"4dd57919cbf4ca43"},{url:"/_next/static/chunks/framework-bc9e8d1125680491.js",revision:"bc9e8d1125680491"},{url:"/_next/static/chunks/main-6beacef6304a4f97.js",revision:"6beacef6304a4f97"},{url:"/_next/static/chunks/pages/404-a9c95bfb7b1266f8.js",revision:"a9c95bfb7b1266f8"},{url:"/_next/static/chunks/pages/_app-af1d3717fd7abcd8.js",revision:"af1d3717fd7abcd8"},{url:"/_next/static/chunks/pages/_error-10174e80ad0c0cf2.js",revision:"10174e80ad0c0cf2"},{url:"/_next/static/chunks/pages/accounts-19785b9c364d0d50.js",revision:"19785b9c364d0d50"},{url:"/_next/static/chunks/pages/activities-5b218d8235527abb.js",revision:"5b218d8235527abb"},{url:"/_next/static/chunks/pages/arts-837ed81dfce96020.js",revision:"837ed81dfce96020"},{url:"/_next/static/chunks/pages/blogs-b03bbaf54941067b.js",revision:"b03bbaf54941067b"},{url:"/_next/static/chunks/pages/caps-maker-7fe6223de0b6628c.js",revision:"7fe6223de0b6628c"},{url:"/_next/static/chunks/pages/collections-4b229a0fcb99ab58.js",revision:"4b229a0fcb99ab58"},{url:"/_next/static/chunks/pages/competitions-0052acade48e2529.js",revision:"0052acade48e2529"},{url:"/_next/static/chunks/pages/courses-1303490a6576efee.js",revision:"1303490a6576efee"},{url:"/_next/static/chunks/pages/courses/%5Bid%5D-ba6105d1cb58fc66.js",revision:"ba6105d1cb58fc66"},{url:"/_next/static/chunks/pages/donation-585ec75aaf9acd0e.js",revision:"585ec75aaf9acd0e"},{url:"/_next/static/chunks/pages/donation/complete-d15b7064c6a55d9a.js",revision:"d15b7064c6a55d9a"},{url:"/_next/static/chunks/pages/hashtags-e9294e49db7a9cb3.js",revision:"e9294e49db7a9cb3"},{url:"/_next/static/chunks/pages/index-f1aee2967e922d5f.js",revision:"f1aee2967e922d5f"},{url:"/_next/static/chunks/pages/login-c0cb598e9e8c02a9.js",revision:"c0cb598e9e8c02a9"},{url:"/_next/static/chunks/pages/news-7a540e4992426a4e.js",revision:"7a540e4992426a4e"},{url:"/_next/static/chunks/pages/news/bookmarks-d896c6cf4b533135.js",revision:"d896c6cf4b533135"},{url:"/_next/static/chunks/pages/news/recommended-2a5fc57fa980d180.js",revision:"2a5fc57fa980d180"},{url:"/_next/static/chunks/pages/not-allowed-ed117c70936f6f40.js",revision:"ed117c70936f6f40"},{url:"/_next/static/chunks/pages/posts-4efb1ace82b0593d.js",revision:"4efb1ace82b0593d"},{url:"/_next/static/chunks/pages/posts/%5Bid%5D-c998a8d6d6f37d92.js",revision:"c998a8d6d6f37d92"},{url:"/_next/static/chunks/pages/timelines-dfc654bb9c7ade68.js",revision:"dfc654bb9c7ade68"},{url:"/_next/static/chunks/pages/timelines/bookmarks-3ea9fb3e81ce4114.js",revision:"3ea9fb3e81ce4114"},{url:"/_next/static/chunks/pages/timelines/recommended-31f0de4266358cd6.js",revision:"31f0de4266358cd6"},{url:"/_next/static/chunks/pages/translates-3736bf751ba0e385.js",revision:"3736bf751ba0e385"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-8395e29192b60649.js",revision:"8395e29192b60649"},{url:"/_next/static/css/1f5ee95fffd43a71.css",revision:"1f5ee95fffd43a71"},{url:"/_next/static/css/3aa1367d1e46f5fa.css",revision:"3aa1367d1e46f5fa"},{url:"/_next/static/css/c809dfe5a6f3ef64.css",revision:"c809dfe5a6f3ef64"},{url:"/_next/static/media/0fe63eb24e4119b1-s.p.woff2",revision:"e9e98be76a19778242bc807ffcdd9012"},{url:"/_next/static/media/1d166d1f895c8030-s.p.woff2",revision:"05d4b37d3e4d5205b96e499b70b00abe"},{url:"/_next/static/media/20b8b8f6f47c1e10-s.woff2",revision:"7def222d1a45cb1cb7d8c3ae675dbdcc"},{url:"/_next/static/media/370d1cc320ec5619-s.woff2",revision:"a6ff41d10fa89e7f8fec937c243d7428"},{url:"/_next/static/media/51051a7edfeea436-s.woff2",revision:"f1b74fe764967ea8636858297f750d66"},{url:"/_next/static/media/58b5ff29cb83dc98-s.woff2",revision:"e891db69d4cac7a240f3adaf8fb8e0c6"},{url:"/_next/static/media/591327bf3b62a611-s.woff2",revision:"0ed299a4bb5262e17e2145783b2c18f1"},{url:"/_next/static/media/7777133e901cd5ed-s.p.woff2",revision:"a09f2fccfee35b7247b08a1a266f0328"},{url:"/_next/static/media/839135d04a097cea-s.woff2",revision:"79e6e81d255edac7e8627c7e16baccf5"},{url:"/_next/static/media/87c72f23c47212b9-s.woff2",revision:"790d0c8dbcd491d29d58f1369c199d40"},{url:"/_next/static/media/90c38b6482a4a18d-s.woff2",revision:"b3d5a5e5e3585bedcbcb0b5459306756"},{url:"/_next/static/media/916d3686010a8de2-s.p.woff2",revision:"9212f6f9860f9fc6c69b02fedf6db8c3"},{url:"/_next/static/media/9a881e2ac07d406b-s.p.woff2",revision:"25b0e113ca7cce3770d542736db26368"},{url:"/_next/static/media/9b44cfc48addbfc9-s.woff2",revision:"b8f12782fb372c92a5c8e3380f926e17"},{url:"/_next/static/media/bd427f25ac24d036-s.p.woff2",revision:"5426bf50c8455aab7a3e89d1138eb969"},{url:"/_next/static/media/f93b79c1ea023ab6-s.woff2",revision:"96b6d54684daa94742f7bfd72a981213"},{url:"/android-chrome-192x192.png",revision:"6a5fd1384c3ce12fda273158d1daeb41"},{url:"/android-chrome-512x512.png",revision:"9026784245f99fe45ecd3c4187bbee75"},{url:"/apple-touch-icon.png",revision:"4be94ba2112a4507c7db905ae1562a74"},{url:"/favicon-16x16.png",revision:"26c1f74f1150f34c0abaf7ed6291d5b4"},{url:"/favicon-32x32.png",revision:"7553609d706aa163c12dc57aa22656f6"},{url:"/favicon.ico",revision:"bab42aab11042d97032f0344795e592d"},{url:"/images/academy-logo-svg.svg",revision:"26064bd5a0bf4bc13c63c1ffd6024866"},{url:"/images/announcement.png",revision:"bdb3a4122994baab9c03847e0d978b26"},{url:"/images/freedom-bird.jpeg",revision:"1632064279da750f0ce4e5a427ddf2af"},{url:"/images/ideal-logo.svg",revision:"96c53048d6c8367f664db15140b3f6a0"},{url:"/images/mission.svg",revision:"00d9d8e42d6c844f2859af303e7e8845"},{url:"/images/samen-logo.svg",revision:"7ef0805f64aae90b2bfc473fa76258f2"},{url:"/images/visa-master-logo.svg",revision:"76c687a0cbcd1c86bd548bc091c11e9b"},{url:"/images/vision.svg",revision:"87db1445d1674db6ee0bbedcfc0f6ea4"},{url:"/images/who-we-are.svg",revision:"b1eb00f396c1d8699c2babbd689ab886"},{url:"/images/wsvvrijheid-logo.svg",revision:"28055fc09ebc407c0d21bafab9c9a414"},{url:"/locales/en/admin.json",revision:"097f612a7d34902fa79c18623675720f"},{url:"/locales/en/common.json",revision:"8da411b091afd1494e73c0f11bf5e994"},{url:"/locales/nl/admin.json",revision:"70d113185314a78ea7c870991067e832"},{url:"/locales/nl/common.json",revision:"5d5d38b86904500c4bd1ee9168b97591"},{url:"/locales/tr/admin.json",revision:"a55285a9ab6087cb4f78e70ff9af4fd9"},{url:"/locales/tr/common.json",revision:"3a12d8686b5fce70a7318ab08268f9a2"},{url:"/site.webmanifest",revision:"822ea12bcb1e18534efd93b39750fc4d"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
