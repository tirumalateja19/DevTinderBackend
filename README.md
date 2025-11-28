# API Endpoints

---

## _authRouter_

### `POST /login`

### `POST /signup`

### `POST /logout`

## _profileRouter_

### `GET/profile`

### `PATCH/profile/edit`

### `PATCH/profile/password`

## _connectionRequestRouter_

### `POST /request/send/:status/:userId`

(`POST /request/send/interested/:userId`)
(`POST /request/send/ignored/:userId`)

### `POST /request/review/:status/:requestId`

(`POST /request/review/accepted/:requestId`)
(`POST /request/review/rejected/:requestId`)

## _userRouter_

### `GET/user/requests/received`

### `GET/user/connections`

### `GET/user/feed`
