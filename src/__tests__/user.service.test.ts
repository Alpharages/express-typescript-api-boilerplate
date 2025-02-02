import { UserService } from '../services/user.service';
import { db } from '../config/database';

jest.mock('../config/database', () => ({
  db: {
    select: jest.fn(),
    where: jest.fn(),
    first: jest.fn(),
    insert: jest.fn(),
    returning: jest.fn(),
  },
}));

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockUsers = [
        { id: '1', email: 'test@test.com', name: 'Test User' },
      ];
      (db as jest.Mocked<typeof db>).select.mockResolvedValue(mockUsers);

      const result = await userService.findAll();
      expect(result).toEqual(mockUsers);
    });
  });
});