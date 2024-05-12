<script lang='ts'>
  export let data; 
  const {article} = data
</script>

<a href="/">Главная</a>
<h1>{article.title}</h1>
<p>{article.body}</p>