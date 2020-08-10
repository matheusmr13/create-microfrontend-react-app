(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{52:function(e,n,r){"use strict";r.r(n),r.d(n,"frontMatter",(function(){return c})),r.d(n,"metadata",(function(){return i})),r.d(n,"rightToc",(function(){return p})),r.d(n,"default",(function(){return u}));var t=r(2),a=r(6),o=(r(0),r(83)),c={id:"setup-environment",title:"Setup environment"},i={unversionedId:"backoffice/setup-environment",id:"backoffice/setup-environment",isDocsHomePage:!1,title:"Setup environment",description:"To setup a backoffice instance inside your infrastructure, just create a npm project and install our server + webapp.",source:"@site/docs/backoffice/setup-environment.md",permalink:"/create-micro-react-app/docs/backoffice/setup-environment",editUrl:"https://github.com/matheusmr13/create-micro-react-app/tree/master/packages/docs/docs/backoffice/setup-environment.md",sidebar:"someSidebar",previous:{title:"Overview",permalink:"/create-micro-react-app/docs/backoffice"},next:{title:"Setup application",permalink:"/create-micro-react-app/docs/backoffice/setup-application"}},p=[],s={rightToc:p};function u(e){var n=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(t.a)({},s,r,{components:n,mdxType:"MDXLayout"}),Object(o.b)("p",null,"To setup a backoffice instance inside your infrastructure, just create a npm project and install our server + webapp."),Object(o.b)("pre",null,Object(o.b)("code",Object(t.a)({parentName:"pre"},{className:"language-bash"}),"  npm init -y\n  npm i @cmra/server\n  npm i @cmra/webapp\n")),Object(o.b)("p",null,"and then define your index.js"),Object(o.b)("pre",null,Object(o.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const NodeApp = require('@cmra/server');\nconst Webapp = require('@cmra/webapp');\n\nconst configJson = {\n  firebase: {\n    /* your firebase client configs */\n  },\n  firebaseAdmin: {\n    /* your firebase admin configs from google cloud services */\n  },\n  database: {\n    /* your database config */\n  },\n};\n\nconst run = async () => {\n  const destFolder = `${__dirname}/node_modules/@cmra/webapp/build`;\n\n  await Webapp.build({\n    env: {\n      FIREBASE_CONFIG: JSON.stringify(firebaseConfig),\n      BASE_URL: '',\n    },\n  });\n\n  NodeApp.withDatabase(configJson.database)\n    .withFirebaseConfig({\n      ...configJson.firebaseAdmin,\n      private_key: JSON.parse(`\"${configJson.firebaseAdmin.private_key}\"`),\n    })\n    .withStaticFiles(destFolder)\n    .run(8080);\n};\n\nrun();\n")))}u.isMDXComponent=!0},83:function(e,n,r){"use strict";r.d(n,"a",(function(){return f})),r.d(n,"b",(function(){return m}));var t=r(0),a=r.n(t);function o(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function c(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function i(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?c(Object(r),!0).forEach((function(n){o(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function p(e,n){if(null==e)return{};var r,t,a=function(e,n){if(null==e)return{};var r,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||(a[r]=e[r]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=a.a.createContext({}),u=function(e){var n=a.a.useContext(s),r=n;return e&&(r="function"==typeof e?e(n):i(i({},n),e)),r},f=function(e){var n=u(e.components);return a.a.createElement(s.Provider,{value:n},e.children)},l={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},b=a.a.forwardRef((function(e,n){var r=e.components,t=e.mdxType,o=e.originalType,c=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),f=u(r),b=t,m=f["".concat(c,".").concat(b)]||f[b]||l[b]||o;return r?a.a.createElement(m,i(i({ref:n},s),{},{components:r})):a.a.createElement(m,i({ref:n},s))}));function m(e,n){var r=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var o=r.length,c=new Array(o);c[0]=b;var i={};for(var p in n)hasOwnProperty.call(n,p)&&(i[p]=n[p]);i.originalType=e,i.mdxType="string"==typeof e?e:t,c[1]=i;for(var s=2;s<o;s++)c[s]=r[s];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"}}]);