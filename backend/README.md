# ESE2020 Scaffolding Backend

## TODO

- Link to postman collection	
- links to readinglist?
- readinglist
	- tslint
	- typescript tutorial
	- express docs
	- sequelize docs
	- jwt
	- best practices (e.g. structure of a project, commits, envoirenment variables, )

This part of the repository serves as a template for common problems you will face as a backend developer during your project. It is by no means complete but should give you a broad overview over the frameworks, libraries and technologies used, which are:

- typescript (javascript)
- express
- sequelize
- jwt
- bcrypt

We tried to show you different approaches how your backend may be structured, however you are free to follow your own principles.
Notice the differences between the [UserController](./src/controllers/user.controller.ts) and e.g. [TodoItemController](./src/controllers/todoitem.controller.ts). 

1. The logic is split up:
	- authorizing a request is done via middleware
	- logic e.g. creating/authentication is done via [UserService](./src/services/user.service.ts)
2. The controller itself is structured as a class.

Note that the `UserController`-approach is more suited for bigger architectures and for typescript applications. You may choose any aproach you wish, but make sure the code is well structured.

## Jump straight to

- middleware
- login
- registration
- crud
- how the code will be compiled
- routers
- root of the website
- 

## Start
- clone this repository
- navigate to the backend folder ` cd ese2020-project-scaffolding/backend`
- run `npm install`
- run `npm start`
- open your browser with the url [http://localhost:3000](http://localhost:3000/)
- to run the server with nodemon you can run `npm run dev` in your console (in the backend folder)

## Notes


## Endpoints
### `/todoitem`
#### POST

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

## Feedback and Contribute

Any feedback is appreciated.
If you find anything important missing from this scaffolding, you may fork this repository and create a pull request. 