
# Pet

*This model accepts additional fields of type unknown.*

## Structure

`Pet`

## Fields

| Name | Type | Tags | Description |
|  --- | --- | --- | --- |
| `id` | `bigint \| undefined` | Optional | - |
| `name` | `string` | Required | - |
| `category` | [`Category \| undefined`](../../doc/models/category.md) | Optional | - |
| `photoUrls` | `string[]` | Required | - |
| `tags` | [`Tag[] \| undefined`](../../doc/models/tag.md) | Optional | - |
| `status` | [`PetStatus \| undefined`](../../doc/models/pet-status.md) | Optional | pet status in the store |
| `additionalProperties` | `Record<string, unknown>` | Optional | - |

## Example

```ts
import { Pet, PetStatus } from 'automated-package-publishing-sdk';

const pet: Pet = {
  name: 'name0',
  photoUrls: [
    'photoUrls5',
    'photoUrls6'
  ],
  id: BigInt(72),
  category: {
    id: BigInt(232),
    name: 'name2',
    additionalProperties: {
      'exampleAdditionalProperty': { 'key1': 'val1', 'key2': 'val2' }
    },
  },
  tags: [
    {
      id: BigInt(26),
      name: 'name0',
      additionalProperties: {
        'exampleAdditionalProperty': { 'key1': 'val1', 'key2': 'val2' }
      },
    }
  ],
  status: PetStatus.Available,
  additionalProperties: {
    'exampleAdditionalProperty': { 'key1': 'val1', 'key2': 'val2' }
  },
};
```

