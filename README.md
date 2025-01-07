# local-storage-ts

```text
                    _________________
                   |# :           : #|
                   |  :           :  |
                   |  :           :  |
                   |  :           :  |
                   |  :___________:  |
                   |     _________   |
                   |    | __      |  |
                   |    ||  |     |  |
                   \____||__|_____|__|

                 ▗▖    ▗▄▖  ▗▄▄▖ ▗▄▖ ▗▖
                 ▐▌   ▐▌ ▐▌▐▌   ▐▌ ▐▌▐▌
                 ▐▌   ▐▌ ▐▌▐▌   ▐▛▀▜▌▐▌
                 ▐▙▄▄▖▝▚▄▞▘▝▚▄▄▖▐▌ ▐▌▐▙▄▄▖
             ▗▄▄▖▗▄▄▄▖▗▄▖ ▗▄▄▖  ▗▄▖  ▗▄▄▖▗▄▄▄▖
            ▐▌     █ ▐▌ ▐▌▐▌ ▐▌▐▌ ▐▌▐▌   ▐▌
             ▝▀▚▖  █ ▐▌ ▐▌▐▛▀▚▖▐▛▀▜▌▐▌▝▜▌▐▛▀▀▘
            ▗▄▄▞▘  █ ▝▚▄▞▘▐▌ ▐▌▐▌ ▐▌▝▚▄▞▘▐▙▄▄▖
                      ▗▄▖ ▗▄▄▖▗▄▄▄▖
                     ▐▌ ▐▌▐▌ ▐▌ █
                     ▐▛▀▜▌▐▛▀▘  █
                     ▐▌ ▐▌▐▌  ▗▄█▄▖
```

`local-storage-ts` is a TypeScript RESTful-API to storage and retriever files, everything from a local directory in the host device.

## Features

- **Type-safe local storage operations**: Ensures that data stored and retrieved from local storage adheres to specified types.
- **Simplified API**: Provides straightforward methods for setting, getting, and removing items from local storage.
- **Error handling**: Gracefully handles errors related to local storage operations.

## Requirements

Before to run the API, it's necessary to set the environment variables. Create a `.env` file in the root of the project and set the next variables:

```env
PORT=3000
STORAGE_PATH=./storage
```

Then we need to install the necessary dependencies:

```bash
pnpm i
```

## Usage

### Development Mode

To run the API in development mode just run

```bash
pnpm start:dev
```

### Production Mode

First, we need to update the environment variables in the `.env` file. Set the `NODE_ENV` variable to `production`:

```env

NODE_ENV=production
```

#### Docker

If you want use the docker compose production version, first substitute the host and the uri db partially:

```env
HOST=host.docker.internal
DB_URI="mongodb://host.docker.internal:27017,host.docker.internal:27018,host.docker.internal:27019/storage?replicaSet=rs-storage&w=majority"
```

Also, update your hosts file to point to the host.docker.internal IP address:

In Linux, you can find the hosts file in `/etc/hosts`.

```bash
sudo echo "127.0.0.1    host.docker.internal" >> /etc/hosts
```

In Windows, you can find the hosts file in `C:\Windows\System32\drivers\etc\hosts`.

```powershell
Add-Content -Path "C:\Windows\System32\drivers\etc\hosts" -Value "127.0.0.1    host.docker.internal"
```

**Note:** You need to run the command as an administrator.

Then, build the docker image (replace `your-tag` with the desired tag):

```bash
docker build -t your-tag .
```

Finally, run the docker compose command (replace `your-project-name` with the desired project name):

```bash
docker compose -p "your-project-name" up -d
```

#### Local

Just build the project:

```bash
pnpm run build
```

Then, run the start command:

```bash
pnpm start
```

## Testing the API

The API has a Postman collection to test the endpoints. You can find the collection in the `postman` directory.

The routes to endpoints are:

/

- GET: Get the welcome message.

/api

- GET: Get the API information.

/api/get/documents/all

- GET: Get the list of files in the storage directory.

/api/get/document/:id

- GET: Get the file with the specified id.

/api/get/document/filter

- POST: Get the file with the specified filter.

/api/get/documents

- POST: Get the list of files with the specified ids.

/api/upload/file/:userId

- POST: Upload a file to the storage directory.

/api/upload/files/:userId

- POST: Upload multiple files to the storage directory.

/api/download/file/:id

- POST: Download the file with the specified id.

/api/download/files

- POST: Download multiple files with the specified ids.

/api/update/document/:id

- PUT: Update the file with the specified id.

/api/delete/file/:id

- DELETE: Delete the file with the specified id.

/api/delete/files

- POST: Delete multiple files with the specified ids.

## LICENSE

This API is licensed under the [MIT License](LICENSE)
