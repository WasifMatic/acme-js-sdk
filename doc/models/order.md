
# Order

*This model accepts additional fields of type unknown.*

## Structure

`Order`

## Fields

| Name | Type | Tags | Description |
|  --- | --- | --- | --- |
| `id` | `bigint \| undefined` | Optional | - |
| `petId` | `bigint \| undefined` | Optional | - |
| `quantity` | `number \| undefined` | Optional | - |
| `shipDate` | `string \| undefined` | Optional | - |
| `status` | [`OrderStatus \| undefined`](../../doc/models/order-status.md) | Optional | Order Status |
| `complete` | `boolean \| undefined` | Optional | - |
| `additionalProperties` | `Record<string, unknown>` | Optional | - |

## Example

```ts
import { Order, OrderStatus } from 'automated-package-publishing-sdk';

const order: Order = {
  id: BigInt(144),
  petId: BigInt(184),
  quantity: 100,
  shipDate: '2016-03-13T12:52:32.123Z',
  status: OrderStatus.Placed,
  additionalProperties: {
    'exampleAdditionalProperty': { 'key1': 'val1', 'key2': 'val2' }
  },
};
```

