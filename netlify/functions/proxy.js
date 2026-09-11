import fetch from 'node-fetch';

export async function handler(event, context) {
  try {
    const destination = event.queryStringParameters?.destination;

    if (!destination) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/plain'
        },
        body: 'Missing destination parameter'
      };
    }

    const response = await fetch(destination, {
      method: event.httpMethod || 'GET',
      headers: {
        'User-Agent':
          event.headers?.['user-agent'] ||
          'Mozilla/5.0'
      }
    });

    const body = await response.text();

    return {
      statusCode: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Content-Type':
          response.headers.get('content-type') || 'text/plain'
      },
      body
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
      },
      body: 'Proxy error: ' + error.message
    };
  }
}