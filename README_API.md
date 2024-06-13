# Task API

![Node](https://img.shields.io/badge/node-20.11.0-green.svg)
![NPM](https://img.shields.io/badge/yarn-1.22.22-green.svg)

Task API is responsible for management of tasks, with simple way of do CRUD operations. It was built using NodeJS and
MongoDB.

# About settings

The API, has some environment variables that can be configured through an .env file that needs to be created, for that
we have the example in .env.sample. Below is a list of all variables and their descriptions.

| Environment   | Description                         |
|---------------|-------------------------------------|
| `MONGODB_URI` | Mongo db host.                      |
| `PORT`        | Port Used to expose the application |

# Endpoints

In API, we have 6 endpoints, how we can see bellow some examples to use then:

## Examples:

### Creating a task

#### CURL request

```curl
curl --location 'localhost:3000/api/v1/tasks' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Cook today",
    "description": "Cook some different food",
    "dueDate": "2024-06-19",
    "priority":"Normal",
    "completed": false,
    "categories": ["Home"],
    "evaluationPoints": 13
}
'
```

#### Response

```json
{
    "title": "Cook today",
    "description": "Cook some different food",
    "priority": "Normal",
    "dueDate": "2024-06-19T00:00:00.000Z",
    "completed": false,
    "categories": [
        "Home"
    ],
    "evaluationPoints": 13,
    "id": "666a2cd2b5d530a852e0b33a"
}
```

### Get one task

#### CURL request

```curl
curl --request GET \
  --url 'localhost:3000/api/v1/tasks/666a2cd2b5d530a852e0b33a'
```

#### Response

```json
{
    "id": "666a2cd2b5d530a852e0b33a",
    "title": "Cook today",
    "description": "Cook some different food",
    "priority": "Normal",
    "dueDate": "2024-06-19T00:00:00.000Z",
    "completed": false,
    "categories": [
        "Home"
    ],
    "evaluationPoints": 13
}
```

### Updating one task

#### CURL request

```curl
curl --location --request PUT 'localhost:3000/api/v1/tasks/666a2cd2b5d530a852e0b33a' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Cook today",
    "description": "Cook some different food",
    "priority": "High",
    "dueDate": "2024-06-21T00:00:00.000Z",
    "completed": false,
    "categories": [
        "Home"
    ],
    "evaluationPoints": 21
}'
```

#### Response

```json
{
    "id": "666a2cd2b5d530a852e0b33a",
    "title": "Cook today",
    "description": "Cook some different food",
    "priority": "High",
    "dueDate": "2024-06-21T00:00:00.000Z",
    "completed": false,
    "categories": [
        "Home"
    ],
    "evaluationPoints": 21
}
```

### Marking one task as completed

#### CURL request

```curl
curl --location --request PUT 'localhost:3000/api/v1/tasks/6669f87136e28b1763f0a6f9/completed' \
--data ''
```

#### Response

```json
{
    "id": "6669f87136e28b1763f0a6f9",
    "title": "Cook today",
    "description": "Cook some different food",
    "priority": "High",
    "dueDate": "2024-06-21T00:00:00.000Z",
    "completed": true,
    "categories": [
        "Work"
    ],
    "evaluationPoints": 113
}
```

### Deleting some task

#### CURL request

```curl
curl --location --request DELETE 'localhost:3000/api/v1/tasks/666a2cd2b5d530a852e0b33a' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Comprar mantimentos",
    "description": "Comprar itens essenciais para casa",
    "priority": "Low",
    "dueDate": "2024-06-15",
    "completed": false,
    "categories": ["Shopping"],
    "evaluationPoints": 23
}
'
```

#### Response

```json
"No content"
```

### Listing tasks with filters and sorting

#### CURL request

```curl
curl --location 'localhost:3000/api/v1/tasks?priority=Normal&sort=dueDate'
'
```

#### Response

```json
{
    "tasks": [
        {
            "id": "666a12abf5e580c27d5d726f",
            "title": "Something",
            "priority": "Normal",
            "dueDate": "2024-06-19T00:00:00.000Z",
            "completed": true,
            "categories": [
                "Work"
            ],
            "evaluationPoints": 113
        },
        {
            "id": "666a2e2bb5d530a852e0b34b",
            "title": "Planning travel with family",
            "description": "Cook some different food",
            "priority": "Normal",
            "dueDate": "2024-06-21T00:00:00.000Z",
            "completed": false,
            "categories": [
                "Home"
            ],
            "evaluationPoints": 17
        },
        {
            "id": "666a2e81b5d530a852e0b34e",
            "title": "Sleep early",
            "priority": "Normal",
            "dueDate": "2024-06-25T00:00:00.000Z",
            "completed": false,
            "categories": [
                "Home"
            ],
            "evaluationPoints": 15
        }
    ],
    "count": 13
}
```

## Testing

For run the tests just go to root path and run `make tests` or `yarn test`(if use yarn, remember to run `yarn` to
install dependencies). You can access the coverage opening in your browser
the `index.html` file generated inside, `src/__tests__/lcov-report/`at the root of the project, we managed to keep the
coverage above 90. The test setup configuration in `.env.test` file.
