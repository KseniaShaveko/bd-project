<script lang="ts">
  import type { Phone } from '$lib/db/schema.js';

  export let data;
  $: pagination = data.pagination;
  const sortBy: { value: keyof Phone; label: string }[] = [
    { label: 'Название', value: 'name' },
    { label: 'Цена', value: 'price' },
    { label: 'Год', value: 'year' },
  ];
  const commonInputStyles = 'border p-1';
  const buttonStyles = commonInputStyles + ' hover:text-sky-800 hover:bg-slate-200'
</script>

<form method="get" class="flex flex-wrap justify-between gap-1 p-2">
  <input
    name="search"
    type="text"
    placeholder="Поиск..."
    class={commonInputStyles}
  />
  <select name="sortBy" id="sortBy" class={commonInputStyles}>
    {#each sortBy as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
  <select name="sortOrder" id="sortOrder" class={commonInputStyles}>
    <option value="asc">По возрастанию</option>
    <option value="desc">По убыванию</option>
  </select>
  <select name="manufacturer" id="manufacturer" class={commonInputStyles}>
    <option value="">Любой производитель</option>
    {#each data.manufacturers as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
  <button type="submit" class={buttonStyles}
    >Поиск</button
  >
</form>

<ul class="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
  {#each data.phones as phone}
    <li>
      <a href={`/${phone.id}`} class="group block h-full rounded border p-4">
        <img
          src={phone.photos[0].url}
          alt=""
          class="aspect-square w-full object-contain transition-transform group-hover:scale-105"
        />
        <p class=" group-hover:text-sky-800">{phone.name}</p>
        <p class="text-right text-lg font-semibold">
          {phone.price.toLocaleString('ru')} руб.
        </p>
      </a>
    </li>
  {/each}
</ul>

<div class="flex justify-around">
  {#if pagination.page > 1}
    <a href={pagination.firstPage} class={buttonStyles}>{1}«</a>
  {:else}
    <div></div>
  {/if}
  {#if pagination.page > 2}
    <a href={pagination.prevPage} class={buttonStyles}
      >{pagination.page - 1}&lt;</a
    >
  {:else}
    <div></div>
  {/if}
  {#if pagination.page < pagination.pagesTotal}
    <a href={pagination.nextPage} class={buttonStyles}
      >&gt;{pagination.page + 1}</a
    >
  {:else}
    <div></div>
  {/if}
  {#if pagination.page < pagination.pagesTotal - 1}
    <a href={pagination.lastPage} class={buttonStyles}
      >»{pagination.pagesTotal}</a
    >
  {:else}
    <div></div>
  {/if}
</div>
