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
</script>

<a href="/">Главная</a>
<h1>{phone.name}</h1>

<ul>
  {#each phone.photos as photo}
    <li>
      <img src={photo.url} alt="У ВАС НЕТ ФОТОК" width="300" />
    </li>
  {/each}
</ul>

<p>Цена: {phone.price} руб.</p>
<p>Производитель: {phone.manufacturer}</p>
<p>Год: {phone.year}</p>
<p><a href={phone.url}>Страница в магазине</a></p>
<p>{phone.description}</p>

<h3>Предложения</h3>
<table>
  <tr>
    <th>Продавец</th>
    <th>Предложение</th>
  </tr>
  {#each phone.offers as offer}
    <tr>
      <td>
        {offer.vendor}
      </td>
      <td><a href={offer.url}>{offer.description}</a></td>
    </tr>
  {/each}
</table>

<h3>Характеристики</h3>
<table>
  {#each characteristics as characteristic}
    <tr>
      <td>
        {characteristic.label}
      </td>
      <td>{characteristic.value}</td>
    </tr>
  {/each}
</table>