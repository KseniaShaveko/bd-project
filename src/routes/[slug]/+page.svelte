<script lang="ts">
  export let data;
  const { phone } = data;
  type Characteristic = { name: string; value: string | null | undefined };
  const characteristics: Characteristic[] = [
    { name: 'Цвет', value: phone.characteristics?.color },
    { name: 'Количество сим-карт', value: phone.characteristics?.simCards },
    { name: 'Диагональ дисплея', value: phone.characteristics?.diagonal },
    { name: 'Разрешение дисплея', value: phone.characteristics?.resolution },
    { name: 'Материал корпуса', value: phone.characteristics?.material },
    {
      name: 'Операционная система',
      value: phone.characteristics?.operationSystem,
    },
    { name: 'Процессор', value: phone.characteristics?.cpu },
    { name: 'Графический ускоритель', value: phone.characteristics?.gpu },
    { name: 'Оперативная память', value: phone.characteristics?.ram },
    { name: 'Объем хранилища', value: phone.characteristics?.storage },
    {
      name: 'Разрешение основной камеры',
      value: phone.characteristics?.backCameraQuality,
    },
    {
      name: 'Разрешение фронтальной камеры',
      value: phone.characteristics?.frontCameraQuality,
    },
    { name: 'Разъем для зарядки', value: phone.characteristics?.chargingPort },
    { name: 'Разъем для наушников', value: phone.characteristics?.audioPort },
    { name: 'Емкость батареи', value: phone.characteristics?.batteryCapacity },
  ];
</script>

<a href="/">Главная</a>
<h1>{phone.name}</h1>

<ul>
  {#each phone.photos as photo}
    <li>
      <img src={photo.url} alt="У ВАС НЕТ ФОТОК" />
    </li>
  {/each}
</ul>

<p>Цена: {phone.price}руб.</p>
<p>Производитель: {phone.manufacturer}</p>
<p>Год: {phone.year}</p>
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
        {characteristic.name}
      </td>
      <td>{characteristic.value}</td>
    </tr>
  {/each}
</table>
