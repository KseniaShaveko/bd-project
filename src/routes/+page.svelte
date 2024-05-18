<script lang="ts">
  export let data;
</script>

<form method="get">
  <input name="search" type="text" placeholder="Поиск..." />
  <select name="sortBy" id="sortBy">
    <option value="asc">По возрастанию</option>
    <option value="desc">По убыванию</option>
  </select>
  <button type="submit">Поиск</button>
</form>

<ul>
  {#each data.array as elem}
    <li>
      <a href={`/${elem.id}`}>{elem.name}</a>
    </li>
  {/each}
</ul>
