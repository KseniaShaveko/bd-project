<script lang="ts">
  export let data;
  const { phone } = data;
  type Characteristic = { label: string; value: string | null | undefined };
  const characteristics: Characteristic[] = [
    { label: 'Цвет', value: phone.characteristics?.color },
    { label: 'Количество сим-карт', value: phone.characteristics?.simCards },
    { label: 'Диагональ дисплея', value: phone.characteristics?.diagonal },
    { label: 'Разрешение дисплея', value: phone.characteristics?.resolution },
    { label: 'Материал корпуса', value: phone.characteristics?.material },
    {
      label: 'Операционная система',
      value: phone.characteristics?.operationSystem,
    },
    { label: 'Процессор', value: phone.characteristics?.cpu },
    { label: 'Графический ускоритель', value: phone.characteristics?.gpu },
    { label: 'Оперативная память', value: phone.characteristics?.ram },
    { label: 'Объем хранилища', value: phone.characteristics?.storage },
    {
      label: 'Разрешение основной камеры',
      value: phone.characteristics?.backCameraQuality,
    },
    {
      label: 'Разрешение фронтальной камеры',
      value: phone.characteristics?.frontCameraQuality,
    },
    { label: 'Разъем для зарядки', value: phone.characteristics?.chargingPort },
    { label: 'Разъем для наушников', value: phone.characteristics?.audioPort },
    { label: 'Емкость батареи', value: phone.characteristics?.batteryCapacity },
  ];

  let currentImg = phone.photos[0];
  const anchorStyle = 'text-sky-800 font-semibold hover:underline';
</script>

<div class="space-y-8">
  <h1 class="text-2xl font-bold">{phone.name}</h1>
  <div class="flex flex-col gap-4 sm:max-h-[40rem] sm:flex-row">
    <ul class="flex grow overflow-y-auto sm:flex-col">
      {#each phone.photos as photo}
        <li>
          <button
            on:click={() => (currentImg = photo)}
            class="group block overflow-hidden"
          >
            <img
              src={photo.url}
              alt="У ВАС НЕТ ФОТОК"
              class="aspect-square w-32 object-contain transition-transform group-hover:scale-110"
            />
          </button>
        </li>
      {/each}
    </ul>
    <div class="w-full shrink">
      <img src={currentImg.url} alt="" class="h-full w-full object-contain" />
    </div>
    <div class="w-80 grow pt-8">
      <p>Цена:</p>
      <p class="text-2xl font-bold text-sky-800">
        {phone.price.toLocaleString('ru')} руб.
      </p>
      <p>Производитель: {phone.manufacturer}</p>
      <p>Год: {phone.year}</p>
      <p><a href={phone.url} class={anchorStyle}>Страница в магазине</a></p>
    </div>
  </div>

  <section>
    <p>{@html phone.description.replaceAll(/(?:\h*\n){2,}/g, '<br><br>')}</p>
  </section>

  {#if phone.offers.length > 0}
    <section>
      <h3 class="mb-2 text-xl font-semibold">Предложения</h3>
      <table class="w-full">
        <!-- <tr class="flex justify-between">
        <th>Продавец</th>
        <th>Предложение</th>
      </tr> -->
        {#each phone.offers as offer}
          <tr class="flex justify-between">
            <td>
              {offer.vendor}
            </td>
            <div class="grow border-b"></div>
            <td
              ><a href={offer.url} class={anchorStyle}>{offer.description}</a
              ></td
            >
          </tr>
        {/each}
      </table>
    </section>
  {/if}

  <section>
    <h3 class="mb-2 text-2xl font-semibold">Характеристики</h3>
    <table class="w-full">
      {#each characteristics as characteristic}
        <tr class="flex justify-between">
          <td>
            {characteristic.label}
          </td>
          <div class="grow border-b"></div>
          <td>{characteristic.value}</td>
        </tr>
      {/each}
    </table>
  </section>
</div>
