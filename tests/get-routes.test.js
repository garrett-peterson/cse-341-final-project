const request = require("supertest");

// --- Mocked MongoDB driver -------------------------------------------------
// The controllers use the native driver as:
//   mongodb.getDatabase().db().collection(name).find(query) -> { toArray() }
// so we stub that chain and let each test choose what toArray() resolves to.
const mockState = { documents: [] };

const mockCursor = { toArray: async () => mockState.documents };
const mockCollection = { find: jest.fn(() => mockCursor) };
const mockDb = { collection: jest.fn(() => mockCollection) };
const mockClient = { db: jest.fn(() => mockDb) };

jest.mock("../data/database", () => ({
  getDatabase: jest.fn(() => mockClient),
  initDB: jest.fn(),
}));

const app = require("./helpers/testApp");

// A 24-character hex string is a valid ObjectId; anything else should be
// rejected by the route-level idMiddleware.
const VALID_ID = "507f1f77bcf86cd799439011";
const MALFORMED_ID = "not-a-valid-id";

beforeEach(() => {
  mockState.documents = [];
  jest.clearAllMocks();
});

describe("GET /", () => {
  test("returns 200 and the API is working message", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.text).toBe("API is working!");
  });
});

// Shared suite for a collection endpoint. Each call below produces its own
// describe block so failures point at the right collection.
const describeCollection = ({ label, path, notFoundMessage }) => {
  describe(`GET ${path} (${label})`, () => {
    test(`GET ${path} returns 200 and the list of documents`, async () => {
      const documents = [
        { _id: "507f1f77bcf86cd799439011", name: `${label} one` },
        { _id: "507f1f77bcf86cd799439012", name: `${label} two` },
      ];
      mockState.documents = documents;

      const res = await request(app).get(path);

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch(/application\/json/);
      expect(res.body).toEqual(documents);
      expect(mockCollection.find).toHaveBeenCalledTimes(1);
    });

    test(`GET ${path}/:id returns 200 and the matching document`, async () => {
      const document = { _id: VALID_ID, name: `${label} single` };
      mockState.documents = [document];

      const res = await request(app).get(`${path}/${VALID_ID}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(document);
    });

    test(`GET ${path}/:id returns 400 for a malformed id`, async () => {
      const res = await request(app).get(`${path}/${MALFORMED_ID}`);

      expect(res.status).toBe(400);
      expect(Array.isArray(res.body.errors)).toBe(true);
      expect(res.body.errors[0].msg).toBe("Not valid ID");
    });

    test(`GET ${path}/:id returns 404 when nothing matches`, async () => {
      mockState.documents = [];

      const res = await request(app).get(`${path}/${VALID_ID}`);

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: notFoundMessage });
    });
  });
};

describeCollection({
  label: "clothings",
  path: "/clothings",
  notFoundMessage: "clothing not found",
});

describeCollection({
  label: "food",
  path: "/food",
  notFoundMessage: "clothing not found",
});

describeCollection({
  label: "furniture",
  path: "/furniture",
  notFoundMessage: "clothing not found",
});

describeCollection({
  label: "users",
  path: "/users",
  notFoundMessage: "clothing not found",
});
