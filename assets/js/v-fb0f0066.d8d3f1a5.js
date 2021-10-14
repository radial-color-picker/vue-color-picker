"use strict";(self.webpackChunk_radial_color_picker_vue_color_picker=self.webpackChunk_radial_color_picker_vue_color_picker||[]).push([[170],{4:(n,a,s)=>{s.r(a),s.d(a,{data:()=>t});const t={key:"v-fb0f0066",path:"/guide/getting-started.html",title:"Getting Started",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"Using NPM",slug:"using-npm",children:[]},{level:2,title:"Using the component globally",slug:"using-the-component-globally",children:[]},{level:2,title:"Using CDN",slug:"using-cdn",children:[]}],filePathRelative:"guide/getting-started.md",git:{updatedTime:1634198505e3,contributors:[{name:"Rosen Kanev",email:"rkunev@gmail.com",commits:5}]}}},135:(n,a,s)=>{s.r(a),s.d(a,{default:()=>m});var t=s(252);const p=(0,t.Wm)("h1",{id:"getting-started",tabindex:"-1"},[(0,t.Wm)("a",{class:"header-anchor",href:"#getting-started","aria-hidden":"true"},"#"),(0,t.Uk)(" Getting Started")],-1),o=(0,t.Wm)("h2",{id:"using-npm",tabindex:"-1"},[(0,t.Wm)("a",{class:"header-anchor",href:"#using-npm","aria-hidden":"true"},"#"),(0,t.Uk)(" Using NPM")],-1),e=(0,t.Uk)("Color Picker on "),c={href:"https://www.npmjs.com/package/@radial-color-picker/vue-color-picker",target:"_blank",rel:"noopener noreferrer"},l=(0,t.Uk)("npm"),u=(0,t.uE)('<div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> @radial-color-picker/vue-color-picker\n</code></pre></div><p>And in your app:</p><div class="language-vue ext-vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>color-picker</span> <span class="token attr-name">v-bind</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>color<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@input</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>onInput<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>color-picker</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n    <span class="token keyword">import</span> ColorPicker <span class="token keyword">from</span> <span class="token string">&#39;@radial-color-picker/vue-color-picker&#39;</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n        components<span class="token operator">:</span> <span class="token punctuation">{</span> ColorPicker <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">const</span> color <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n                hue<span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span>\n                saturation<span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>\n                luminosity<span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span>\n                alpha<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n            <span class="token keyword">return</span> <span class="token punctuation">{</span>\n                color<span class="token punctuation">,</span>\n                <span class="token function">onInput</span><span class="token punctuation">(</span><span class="token parameter">hue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                    color<span class="token punctuation">.</span>hue <span class="token operator">=</span> hue<span class="token punctuation">;</span>\n                <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">\n    <span class="token atrule"><span class="token rule">@import</span> <span class="token string">&#39;@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css&#39;</span><span class="token punctuation">;</span></span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>',3),k=(0,t.Uk)("Depending on your build tool of choice you may have to setup the appropriate loaders or plugins. Checkout the "),i={href:"https://github.com/radial-color-picker/vue-color-picker/tree/master/examples",target:"_blank",rel:"noopener noreferrer"},r=(0,t.Uk)("examples"),g=(0,t.Uk)(" folder. There's an example with Vite and CSS. If you're using tools such as Vite, Vue CLI, or Poi you don't have to do anything else - these tools come preconfigured and support CSS import out of the box."),d=(0,t.uE)('<h2 id="using-the-component-globally" tabindex="-1"><a class="header-anchor" href="#using-the-component-globally" aria-hidden="true">#</a> Using the component globally</h2><p>If you don&#39;t want to register the component everywhere it&#39;s used you can instead register it globally:</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token comment">// in your main.js file</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> ColorPicker <span class="token keyword">from</span> <span class="token string">&#39;@radial-color-picker/vue-color-picker&#39;</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token string">&#39;@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css&#39;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\napp<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ColorPicker<span class="token punctuation">)</span><span class="token punctuation">;</span>\napp<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre></div><h2 id="using-cdn" tabindex="-1"><a class="header-anchor" href="#using-cdn" aria-hidden="true">#</a> Using CDN</h2><p>You can also use the minified sources directly:</p><div class="language-html ext-html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://unpkg.com/vue@3.2.20/dist/vue.global.prod.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://unpkg.com/@radial-color-picker/vue-color-picker/dist/vue-color-picker.umd.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://unpkg.com/@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css<span class="token punctuation">&quot;</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stylesheet<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>color-picker</span> <span class="token attr-name">v-bind</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>color<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@input</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>onInput<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>color-picker</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n        <span class="token keyword">var</span> ColorPicker <span class="token operator">=</span> window<span class="token punctuation">.</span>VueColorPicker<span class="token punctuation">;</span>\n\n        Vue<span class="token punctuation">.</span><span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n            components<span class="token operator">:</span> <span class="token punctuation">{</span>\n                ColorPicker<span class="token operator">:</span> ColorPicker<span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token keyword">const</span> color <span class="token operator">=</span> Vue<span class="token punctuation">.</span><span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n                    hue<span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span>\n                    saturation<span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>\n                    luminosity<span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span>\n                    alpha<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n                <span class="token keyword">return</span> <span class="token punctuation">{</span>\n                    color<span class="token punctuation">,</span>\n                    <span class="token function">onInput</span><span class="token punctuation">(</span><span class="token parameter">hue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                        color<span class="token punctuation">.</span>hue <span class="token operator">=</span> hue<span class="token punctuation">;</span>\n                    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n                <span class="token punctuation">}</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>',6);var m={render:function(n,a){const s=(0,t.up)("OutboundLink");return(0,t.wg)(),(0,t.j4)(t.HY,null,[p,o,(0,t.Wm)("p",null,[e,(0,t.Wm)("a",c,[l,(0,t.Wm)(s)])]),u,(0,t.Wm)("p",null,[k,(0,t.Wm)("a",i,[r,(0,t.Wm)(s)]),g]),d],64)}}}}]);