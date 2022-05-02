let handleResponse = response => response;
let handleRequest = data => data;

function transformResponse(fn) {
    if(typeof fn === 'function') {
        return handleResponse = fn;
    }

    throw Error('The response transformer must be a function.');
}

function transformRequest(fn) {
    if(typeof fn === 'function') {
        return handleRequest = fn;
    }

    throw Error('The response transformer must be a function.');
}

export {
    handleResponse,
    handleRequest,
    transformResponse,
    transformRequest
};