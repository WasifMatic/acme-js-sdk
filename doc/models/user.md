
# User

*This model accepts additional fields of type unknown.*

## Structure

`User`

## Fields

| Name | Type | Tags | Description |
|  --- | --- | --- | --- |
| `id` | `bigint \| undefined` | Optional | - |
| `username` | `string \| undefined` | Optional | - |
| `firstName` | `string \| undefined` | Optional | - |
| `lastName` | `string \| undefined` | Optional | - |
| `email` | `string \| undefined` | Optional | - |
| `password` | `string \| undefined` | Optional | - |
| `phone` | `string \| undefined` | Optional | - |
| `userStatus` | `number \| undefined` | Optional | User Status |
| `additionalProperties` | `Record<string, unknown>` | Optional | - |

## Example

```ts
import { User } from 'automated-package-publishing-sdk';

const user: User = {
  id: BigInt(76),
  username: 'username0',
  firstName: 'firstName4',
  lastName: 'lastName4',
  email: 'email6',
  additionalProperties: {
    'exampleAdditionalProperty': { 'key1': 'val1', 'key2': 'val2' }
  },
};
```

