# ESE2020 Scaffolding Backend
## Start
- clone this repository
- navigate to the backend folder ` cd ese2020-project-scaffolding/backend`
- run `npm install`
- run `npm start`
- open your browser with the url `http://localhost:3000/`

## Endpoints
<details>
	<summary>#### POST</summary>

<details>
	<summary>Request</summary>

```json
	{
		"name": "string",
		"done": "boolean",
		"todoListId":"number"
	}
```

</details>


<details>
	<summary>Response</summary>

	Code: 200
	Body:

```json
{
	"todoItemId": "number",
	"name": "string",
	"done": "boolean",
	"todoListId":"number"
}
```
</details>
</details>
### `/todoitem`


#### DELETE `/:id`
Status: 200

### `/todolist`
#### POST
<details>
	<summary>Request</summary>

	Code: 200
	Body:
```json
{
	"name":"string"
}

```
</details>
<details>
	<summary>Response</summary>

	Code: 200
	Body:
```json
{
	"todoListId": "number",
	"name":"string"
}

```
</details>

#### DELETE `/:id`
Status: 200

#### GET
<details>
	<summary>Response</summary>

	Code: 200
	Body:
```json
{
	"todoListId": "number",
	"name":"string",
	"todoItems":"TodoItem[]"
}
```
</details>

### `/user`
#### POST `/register`
<details>
	<summary>Request</summary>

	Code: 200
	Body:
```json
{
	"userName":"string",
	"password":"stiring"
}

```
</details>
<details>
	<summary>Response</summary>

	Code: 200
	Body:
```json
{
	"userId": "number",
	"userName":"string",
	"password":"string(hashed)"
}

```
</details>

#### POST `/login`
<details>
	<summary>Request</summary>

	Code: 200
	Body:
```json
{
	"userName":"string",
	"password":"string"
}

```
</details>
<details>
	<summary>Response</summary>

	Code: 200 || 403
	Body:
```json
{
	"user": {
		"userId":"string",
		"userName":"string",
		"password":"stirng(hashed)"
	},
	"token":"string"
}

```
</details>

#### GET
<details>
	<summary>Response</summary>

	Code: 200
	Body:
```json
[
	{
		"userId":"string",
		"userName":"string",
		"password":"stirng(hashed)"
	},
	{
		"userId":"string",
		"userName":"string",
		"password":"stirng(hashed)"
	},
	...
]

```
</details>

### `/secured`
#### GET
	
	Request

	Header: Authorization: Bearer  + <token>

<details>
	<summary>Response</summary>

	Code: 200 | 403
	Body:
```json
{
	"message":"string"
}

```
</details>

### `/`
<details>
	<summary>Response</summary>

	Code: 200
	Body:
```text
<h1>Welcome to the ESE-2020 Course</h1><span style=\"font-size:100px;\">&#127881;</span>
```
</details>

