class UserService {
  async getUser(id: string) {
    return { id, name: "John Doe" };
  }
}

export default UserService;
