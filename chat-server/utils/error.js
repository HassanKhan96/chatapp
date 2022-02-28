
class NotFoundError extends Error {
    constructor(message, data) {
        super(message);
        this.messageText = message;
        this.data = data;
        this.status = 404;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.messageText = message;
        this.status = 401;
        this.data = null;
        this.name = this.constructor.name;
    }
}

class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.messageText = message;
        this.status = 403;
        this.name = this.constructor.name;
        this.data = null;
        Error.captureStackTrace(this, this.constructor);
    }
}

class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.messageText = message;
        this.name = this.constructor.name;
        this.status = 409;
        this.data = null;
        Error.captureStackTrace(this, this.constructor);
    }
}

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.messageText = message;
        this.name = this.constructor.name;
        this.status = 400;
        this.data = null;
        Error.captureStackTrace(this, this.constructor);
    }
}

class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.messageText = message;
        this.status = 500;
        this.name = this.constructor.name;
        this.data = null;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = {
    NotFoundError,
    ForbiddenError,
    UnauthorizedError,
    BadRequestError,
    ConflictError,
    InternalServerError
}