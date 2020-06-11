import { GraphQLClient } from 'graphql-request';

export interface UserCache {
    _id: string,
    name: string,
    rate: number,
    timestamp: string,
}

export interface DBRecord {
    user: UserCache | null,
}

const GRAPHQL_ENDPOINT = 'https://graphql.fauna.com/graphql';
const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: {
        authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
    },
});

const fetchQuery = `\
query FetchUser($name: String!) {
    user: findUserByName(name: $name) {
        _id
        name
        rate
        timestamp
    }
}
`;

export async function getUserCache(name: string) {
    let data: DBRecord = await client.request(fetchQuery, { name });
    return data;
}

const registerQuery = `\
mutation RegisterUser($name: String!, $rate: Int!, $timestamp: Time!) {
    createUser(data: {
      name: $name
      rate: $rate
      timestamp: $timestamp
    }) {
      name
      rate
      timestamp
    }
}
`;

export async function registerUserCache(name: string, rate: number) {
    await client.request(registerQuery, {
        name,
        rate,
        timestamp: new Date().toISOString(),
    });
}

const updateQuery = `\
mutation UpdateUser($id: ID!, $name: String!, $rate: Int!, $timestamp: Time!) {
    updateUser(id: $id, data: {
        name: $name
        rate: $rate
        timestamp: $timestamp
    }) {
        name
        rate
        timestamp
    }
}
`;

export async function updateUserCache(cache: UserCache) {
    await client.request(updateQuery, {
        id: cache._id,
        name: cache.name,
        rate: cache.rate,
        timestamp: new Date().toISOString(),
    });
}

const deleteQuery = `\
mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
        name
        rate
        timestamp
    }
}  
`;

export async function deleteUserCache(id: string) {
    await client.request(deleteQuery, { id });
}
