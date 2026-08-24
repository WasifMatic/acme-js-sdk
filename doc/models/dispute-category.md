
# Dispute Category

The condition that is covered for the transaction.

## Enumeration

`DisputeCategory`

## Fields

| Name | Description |
|  --- | --- |
| `ItemNotReceived` | The payer paid for an item that they did not receive. |
| `UnauthorizedTransaction` | The payer did not authorize the payment. |

## Example

```ts
import { DisputeCategory } from 'automated-package-publishing-sdk';

const disputeCategory = DisputeCategory.ItemNotReceived;
```

