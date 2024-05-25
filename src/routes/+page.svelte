<script lang="ts">
  import type { Phone } from '$lib/db/schema.js';

  export let data;
  $: pagination = data.pagination;
  const sortBy: { value: keyof Phone; label: string }[] = [
    { label: 'Название', value: 'name' },
    { label: 'Цена', value: 'price' },
    { label: 'Год', value: 'year' },
  ];
</script>

<form method="get">
  <input name="search" type="text" placeholder="Поиск..." />
  <select name="sortBy" id="sortBy">
    {#each sortBy as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
  <select name="sortOrder" id="sortOrder">
    <option value="asc">По возрастанию</option>
    <option value="desc">По убыванию</option>
  </select>
  <select name="manufacturer" id="manufacturer">
    <option value="">Любой производитель</option>
    {#each data.manufacturers as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
  <button type="submit">Поиск</button>
</form>

<ul>
  {#each data.phones as phone}
    <li>
      <a href={`/${phone.id}`}>{phone.name}</a>
    </li>
  {/each}
</ul>

<div>
  {#if pagination.page > 1}
    <a href={pagination.firstPage}>{1}&lt;&lt;</a>
  {/if}
  {#if pagination.page > 2}
    <a href={pagination.prevPage}>{pagination.page - 1}&lt;</a>
  {/if}
  {#if pagination.page < pagination.pagesTotal}
    <a href={pagination.nextPage}>&gt;{pagination.page + 1}</a>
  {/if}
  {#if pagination.page < pagination.pagesTotal - 1}
    <a href={pagination.lastPage}>&gt;&gt;{pagination.pagesTotal}</a>
  {/if}
</div>
