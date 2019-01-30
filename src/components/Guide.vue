<template>
  <div class="guide">
    <article>
<h1>WebSpider使用说明</h1>

<h3>1.爬取深度</h3>

<p>爬取深度指的是从初始网址经过几层到达数据所在网址。最大支持的爬取深度为3，推荐使用的最大爬取深度为2  </p>

<h3>2.网页编码</h3>

<p>目标网页的编码格式，默认为UTF-8</p>

<h3>3.抓取模式</h3>

<p>普通模式与分页模式</p>

<h3>4.页码范围</h3>

<p>在分页模式下，抓取的起止页码</p>

<h3>5.目标网址</h3>

<p>目标网址即要爬取的目标网站的网址。</p>

<p>普通模式下只需填写要抓取的网址即可。</p>

<p>分页模式下:</p>

<p>网址填写时，将网址中的页码改为*即可</p>

<p>例如:</p>

<p>CNode的分页网址</p>

<p><code>https://cnodejs.org/?tab=good&amp;page=10</code></p>

<p>改为</p>

<p><code>https://cnodejs.org/?tab=good&amp;page=*</code></p>

<h3>6.选择器</h3>

<p>选择器用来指出数据所在的位置，配合&quot;输出结果定制&quot;即可获得目标数据。填写需要用户具有基本的前端知识。</p>

<p>这里为了描述方便，将标签选择器分为两种，一种是a标签选择器与数据标签选择器。(当然，如果你想要的数据在a标签中，那么a标签选择器就是数据标签选择器)</p>

<blockquote><p>当抓取深度为1，则一级选择器中填写数据选择器即可。</p><p>当抓取深度为2，则一级选择器中填写到达第二层页面的a标签选择器，二级选择器填写数据标签选择器。</p><p>当抓取深度为3，则一级选择器中填写到达第二层页面的a标签选择器，二级选择器中填写到达第三层页面的a标签选择器，三级选择器填写数据选择器即可。</p></blockquote>

<p>填写示例:</p>

<p>深度为2</p>

<p>一级选择器:<code>$(&quot;.topic_title a&quot;)</code></p>

<p>二级选择器:<code>$(&quot;.topic .content&quot;)</code></p>

<p><code>$(&quot;.topic_title a&quot;)</code>是指目标页面中所有类名为 topic_title 的元素中的a元素</p>

<p><code>$(&quot;.topic .content&quot;)</code>指的是目标页面中类名为 topic 的元素下的类名为 content 的子孙元素</p>

<p>填写了两级选择器，说明目标数据在当前页面(即配置页面&quot;目标网址&quot;填写的网址)的下一层，则一级选择器需要指出到达下一层页面的a标签选择器。二级选择器填写的是下一层页面中的数据标签选择器</p>

<p>更多选择器填写规则，参考<a href="https://www.npmjs.com/package/cheerio">cheerio</a>。</p>

<h3>7.输出结果定制。</h3>

<p>输出结果定制指的是输出哪些结果。</p>

<p>由标签选择器指出数据所在的位置后，还需要进一步使用标签选择器和属性选择器来获得数据。</p>

<p>这里需要写成JSON格式，参考写法如下：</p>

<p><code>
{
    &quot;name&quot;:&quot;$element.find(&#39;.c-9 .ml-20 a&#39;).text()&quot;,
    &quot;age&quot;:&quot;$element.children(&#39;.c-9&#39;).next().text()&quot;
}
</code></p>

<p>键部分可以随意指定，值部分填写需要一定的规则。</p>

<p><strong>$element</strong>是指&quot;选择器&quot;中填写的数据标签选择器。(结合&quot;选择器&quot;给出的示例，$element指的是$(&quot;.topic .content&quot;)）</p>

<p>键为name的值指 &quot;选择器&quot;筛选出的元素下的类名为c-9的元素下的类名ml-20下的a元素中的文本</p>

<p>键为age的值指 &quot;选择器&quot;筛选出的元素下的类名为c-9的元素下一个元素的文本内容</p>

<hr/>

<p>值得注意的是，当你需要的数据种类只有1种，你完全可以在&quot;选择器&quot;中填写标签选择器时，直接将标签定位到目标元素，在&quot;输出结果定制&quot;中，填写属性选择器即可。</p>

<p>但往往我们需要的数据种类不止一种，所以在填写&quot;选择器&quot;部分时，需要填写的数据标签选择器要将所有需要的数据包裹在内，所以甚至可以填写$(&quot;body&quot;)这样的数据选择器。在填写&quot;输出结果定制&quot;的值部分，需要填写一些选择器指明数据详细位置，最后使用属性选择器即可获得数据。</p>

<p>同样结合上文给出的示例，</p>

<p>如果我要想获得 &#39;name&#39; 值这一类数据，</p>

<p>那么&quot;选择器&quot;可以这样写</p>

<p>一级选择器:<code>$(&quot;.topic_title a&quot;)</code></p>

<p>二级选择器:<code>$(&quot;.topic .content .c-9 .ml-20 a&quot;)</code></p>

<p>&#39;输出结果定制&#39;可以这样写
<code>
{
    &quot;name&quot;:&quot;$element.text()&quot;
}
</code></p>

<p>或者</p>

<p>&#39;选择器&#39;:</p>

<p>一级选择器:<code>$(&quot;.topic_title a&quot;)</code></p>

<p>二级选择器:<code>$(&quot;.topic&quot;).find(&#39;.content .c-9 .ml-20 a&#39;)</code></p>

<p>&#39;输出结果定制&#39;:
<code>
{
    &quot;name&quot;:&quot;$element.text()&quot;
}
</code></p>

<p>或者</p>

<p>&#39;选择器&#39;:</p>

<p>一级选择器:<code>$(&quot;.topic_title a&quot;)</code></p>

<p>二级选择器:<code>$(&quot;.topic&quot;)</code></p>

<p>&#39;输出结果定制&#39;:
<code>
{
    &quot;name&quot;:&quot;$element.find(&#39;.content .c-9 .ml-20 a&#39;).text()&quot;,
}
</code></p>

<p>或者</p>

<p>&#39;选择器&#39;:</p>

<p>一级选择器:<code>$(&quot;.topic_title a&quot;)</code></p>

<p>二级选择器:<code>$(&quot;body&quot;)</code></p>

<p>&#39;输出结果定制&#39;:
<code>
{
    &quot;name&quot;:&quot;$element.find(&#39;.topic .content .c-9 .ml-20 a&#39;).text()&quot;
}
</code></p>

<p>常用的属性选择器有text(),html(),attr()这三种</p>

<p>text()选择的是目标元素中的文本内容</p>

<p>html()选择的是目标元素的HTML代码</p>

<p>attr()选择的是目标元素标签中的某个属性值。需要填写参数，比如$element.attr(&#39;url&#39;)指的是获取目标元素标签中的url属性值</p>

<h3>8.代理模式</h3>

<p>即抓取数据是否需要使用HTTP代理。有3种模式，内置代理,无代理与自定义代理。</p>

<p>内置代理使用<a href="https://free-proxy-list.net/">FreeProxyList</a>可用的代理地址发出请求。</p>

<p>自定义代理模式需要用户自己填写可用代理。</p>

<p>注:</p>

<p>(1)自定义代理地址填写不符合正常IP地址的话，系统默认使用无代理模式。</p>

<p>(2)代理质量参差不齐，所以可能响应失败。所以当响应失败时，请重新提交。</p>

<p>(3)<a href="http://httpproxy.docmobile.cn">HttpProxy</a>提供API支持</p>

<h3>9.结果预览</h3>

<p>返回结果中</p>

<p>state表示抓取状态，值为 true 或者 false </p>

<p>time值为数据的更新时间。</p>

<p>data值为抓取结果，格式为数组。</p>

<p>msg备注</p>

<h3>10.生成API</h3>

<p>数据接口只在用户登录情况下生成。</p>
    </article>
  </div>
</template>

<script>

</script>

<style lang="stylus">
.webspider{
  width 80%
  height 100%
  margin 0 auto
}
</style>