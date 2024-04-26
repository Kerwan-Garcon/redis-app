import { createClient } from "redis";

const client = createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

client.on("error", (error) => {
  console.error(error);
});

if (!client.isOpen) {
  client.connect();
}

const add = (key: string, value: string) => {
  client.set(key, value);
};

const get = (key: string) => {
  return client.get(key);
};

export { add, get };
