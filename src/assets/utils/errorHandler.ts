function errorHandler(exception: unknown): string {
    const message = (typeof exception === 'string') ? exception.toUpperCase()
        : (exception instanceof Error) ? exception.message : 'Something was wrong';

    return message;
}

export default errorHandler;
