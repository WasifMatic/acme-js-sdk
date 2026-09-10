
# Getting Started with APIMATIC Calculator

## Introduction

Simple calculator API hosted on APIMATIC

## Install the Package

Run the following command from your project directory to install the package from npm:

```bash
npm install automated-package-publishing-sdk@10.0.3
```

For additional package details, see the [Npm page for the automated-package-publishing-sdk@10.0.3 npm](https://www.npmjs.com/package/automated-package-publishing-sdk/v/10.0.3).

## Initialize the API Client

**_Note:_** Documentation for the client can be found [here.](https://www.github.com/WasifMatic/acme-js-sdk/tree/10.0.3/doc/client.md)

The following parameters are configurable for the API Client:

| Parameter | Type | Description |
|  --- | --- | --- |
| timeout | `number` | Timeout for API calls.<br>*Default*: `0` |
| httpClientOptions | [`Partial<HttpClientOptions>`](https://www.github.com/WasifMatic/acme-js-sdk/tree/10.0.3/doc/http-client-options.md) | Stable configurable http client options. |
| unstableHttpClientOptions | `any` | Unstable configurable http client options. |

The API client can be initialized as follows:

### Code-Based Client Initialization

```ts
import { Client } from 'automated-package-publishing-sdk';

const client = new Client({
  timeout: 0,
});
```

### Configuration-Based Client Initialization

```ts
import * as path from 'path';
import * as fs from 'fs';
import { Client } from 'automated-package-publishing-sdk';

// Provide absolute path for the configuration file
const absolutePath = path.resolve('./config.json');

// Read the configuration file content
const fileContent = fs.readFileSync(absolutePath, 'utf-8');

// Initialize client from JSON configuration content
const client = Client.fromJsonConfig(fileContent);
```

See the [Configuration-Based Client Initialization](https://www.github.com/WasifMatic/acme-js-sdk/tree/10.0.3/doc/configuration-based-client-initialization.md) section for details.

### Environment-Based Client Initialization

```ts
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { Client } from 'automated-package-publishing-sdk';

// Optional - Provide absolute path for the .env file
const absolutePath = path.resolve('./.env');

if (fs.existsSync(absolutePath)) {
  // Load environment variables from .env file
  dotenv.config({ path: absolutePath, override: true });
}

// Initialize client using environment variables
const client = Client.fromEnvironment(process.env);
```

See the [Environment-Based Client Initialization](https://www.github.com/WasifMatic/acme-js-sdk/tree/10.0.3/doc/environment-based-client-initialization.md) section for details.

## List of APIs

* [Simple Calculator](https://www.github.com/WasifMatic/acme-js-sdk/tree/10.0.3/doc/controllers/simple-calculator.md)

## SDK Infrastructure

### Configuration

* [HttpClientOptions](https://www.github.com/WasifMatic/acme-js-sdk/tree/10.0.3/doc/http-client-options.md)
* [RetryConfiguration](https://www.github.com/WasifMatic/acme-js-sdk/tree/10.0.3/doc/retry-configuration.md)
* [ProxySettings](https://www.github.com/WasifMatic/acme-js-sdk/tree/10.0.3/doc/proxy-settings.md)
* [Configuration-Based Client Initialization](https://www.github.com/WasifMatic/acme-js-sdk/tree/10.0.3/doc/configuration-based-client-initialization.md)
* [Environment-Based Client Initialization](https://www.github.com/WasifMatic/acme-js-sdk/tree/10.0.3/doc/environment-based-client-initialization.md)

### HTTP

* [HttpRequest](https://www.github.com/WasifMatic/acme-js-sdk/tree/10.0.3/doc/http-request.md)

### Utilities

* [ApiResponse](https://www.github.com/WasifMatic/acme-js-sdk/tree/10.0.3/doc/api-response.md)
* [ApiError](https://www.github.com/WasifMatic/acme-js-sdk/tree/10.0.3/doc/api-error.md)

