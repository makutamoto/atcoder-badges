import { GraphQLClient } from 'graphql-request';

export interface UserCache {
    _id: string,
    name: string,
    atcoderRate: number | null,
    codeforcesRate: number | null,
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
        atcoderRate
        codeforcesRate
        timestamp
    }
}
`;

export async function getUserCache(name: string) {
    let data: DBRecord = await client.request(fetchQuery, { name });
    return data;
}

const registerQuery = `\
mutation RegisterUser($name: String!, $atcoderRate: Int, $codeforcesRate: Int, $timestamp: Time!) {
    createUser(data: {
      name: $name
      atcoderRate: $atcoderRate
      codeforcesRate: $codeforcesRate
      timestamp: $timestamp
    }) {
      name
      atcoderRate
      codeforcesRate
      timestamp
    }
}
`;

export async function registerUserCache(name: string, atcoderRate: number | null, codeforcesRate: number | null) {
    await client.request(registerQuery, {
        name,
        atcoderRate,
        codeforcesRate,
        timestamp: new Date().toISOString(),
    });
}

const updateQuery = `\
mutation UpdateUser($id: ID!, $name: String!, $atcoderRate: Int, $codeforcesRate: Int, $timestamp: Time!) {
    updateUser(id: $id, data: {
        name: $name
        atocerRate: $atcoderRate
        codeforcesRate: $codeforcesRate
        timestamp: $timestamp
    }) {
        name
        atcoderRate
        codeforcesRate
        timestamp
    }
}
`;

export async function updateUserCache(cache: UserCache) {
    await client.request(updateQuery, {
        id: cache._id,
        name: cache.name,
        atcoderRate: cache.atcoderRate,
        codeforcesRate: cache.codeforcesRate,
        timestamp: new Date().toISOString(),
    });
}
